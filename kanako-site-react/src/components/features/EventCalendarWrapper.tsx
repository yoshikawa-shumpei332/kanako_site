"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, ExternalLink ,Clock} from "lucide-react";

type Event = {
    id: string;
    url?: string;
    date: string;
    title: string;
    venue?: string;
    time?: string;
    link?: string;
    type: "image" | "text";
  };

  export default function EventCalendarWrapper() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const cloudinaryRes = await fetch("/api/cloudinary-events");
          const cloudinaryData = await cloudinaryRes.json();
          const cloudinaryEvents: Event[] = cloudinaryData.map((d: any) => ({
            id: d.id,
            url: d.url,
            date: d.date,
            title: d.event_name || "演奏予定",
            type:"image",
          }));

          const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_tunqBSN0hqHBEu9z8kRyjda6ik3Ksz9cxuPnbtEM4GcNf4RpWYXY4khPEMcffhwPcg8F_k19SvCB/pub?gid=0&single=true&output=csv';
          const sheetRes = await fetch(sheetUrl);
          const csvText = await sheetRes.text();

          const sheetRows = csvText.split("\n").slice(1);
          const sheetEvents: Event[] = sheetRows.map((row, index) => {
          const [date, venue, title, url, time] = row.split(",");
          return {
            id: `sheet-${index}`,
            date: date?.trim(),
            venue: venue?.trim(),
            title: title?.trim(),
            link: url?.trim(),
            time: time?.trim(),
            type: "text",
          };
          }).filter(e => e.date);

          const today = new Date();
          today.setHours(0,0,0,0);

          const allEvents = [...cloudinaryEvents, ...sheetEvents]
          .filter(e => new Date(e.date) >= today)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setEvents(allEvents);
        if (allEvents.length > 0) setSelectedEvent(allEvents[0]);
      } catch (err) {
        console.error("Data fetch error:", err);
      }
    };

    fetchData();
  }, []);

    const handlePrev = () => {
      if (!selectedEvent || events.length === 0) return;
      const currentIndex = events.findIndex(e => e.id === selectedEvent.id);
      const prevIndex = (currentIndex -1 + events.length) % events.length;
      setSelectedEvent(events[prevIndex]);
    };

    const handleNext = () => {
      if (!selectedEvent || events.length === 0) return;
      const currentIndex = events.findIndex(e => e.id === selectedEvent.id);
      const nextIndex = (currentIndex + 1) % events.length;
      setSelectedEvent(events[nextIndex])
    }


    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-start max-w-6xl mx-auto px-4">
          
          {/* --- 左側：予定リスト --- */}
          <div className="md:col-span-4 w-full bg-white shadow-lg rounded-xl overflow-hidden border">
            <div className="bg-gray-800 text-white p-4 font-bold text-center">
              Upcoming Events
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {events.length > 0 ? (
                events.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`w-full text-left p-4 border-b last:border-0 transition-colors flex justify-between items-center ${
                      selectedEvent?.id === event.id ? "bg-red-50 border-l-4 border-l-red-500" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-full">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-sm text-gray-500 font-mono">
                          {event.date.replace(/-/g, "/")}
                        </span>
                        {/* テキストタイプならアイコンを表示しても良い */}
                        {event.type === "text" && <span className="text-xs bg-gray-100 px-2 rounded text-gray-500">Info</span>}
                      </div>
                      <span className="block font-medium text-gray-900 italic font-serif text-lg leading-tight">
                        {event.title}
                      </span>
                      {/* 会場名があれば表示 */}
                      {event.venue && (
                        <span className="block text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <MapPin size={12} /> {event.venue}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <p className="p-10 text-center text-gray-400">予定はありません</p>
              )}
            </div>
          </div>
      
          {/* --- 右側：詳細表示エリア（画像 or テキストカード） --- */}
          <div className="md:col-span-6 w-full flex flex-col items-center justify-center bg-white">
            {selectedEvent ? (
              <div className="w-full text-center group"> 
                <p className="mb-4 font-bold text-lg font-serif">
                  {selectedEvent.date.replace(/-/g, "/")} の公演
                </p>
                
                {/* 表示エリア：ここが画像かテキストかで切り替わる */}
                <div className="relative h-[500px] w-full rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-md flex items-center justify-center">
                  
                  {selectedEvent.type === "image" && selectedEvent.url ? (
                    // --- A. 画像パターンの表示 ---
                    <Image 
                      src={selectedEvent.url} 
                      alt="Event Detail" 
                      fill 
                      className="object-contain cursor-zoom-in"
                      onClick={() => setIsZoomed(true)}
                    />
                  ) : (
                    // --- B. テキストパターンの表示（招待状のようなデザイン） ---
                    <div className="p-8 w-full h-full flex flex-col items-center justify-center gap-6 bg-white">
                      <div className="border-y-4 border-double border-gray-200 py-8 w-full">
                        <h3 className="text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed px-4">
                          {selectedEvent.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-4 text-gray-600 font-serif text-lg">
                        {selectedEvent.venue && (
                          <div className="flex items-center justify-center gap-2">
                            <MapPin className="text-red-400" size={20} />
                            <span>{selectedEvent.venue}</span>
                          </div>
                        )}
                        {selectedEvent.time && (
                          <div className="flex items-center justify-center gap-2">
                            <Clock className="text-red-400" size={20} />
                            <span>開始時間:{selectedEvent.time}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
  
                  {/* --- 共通の矢印ボタン（画像・テキストどちらでも表示） --- */}
                  {events.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-500/80 hover:bg-gray-700 p-3 rounded-full shadow-lg z-20 transition-all opacity-100"
                      >
                        <ChevronLeft size={24} className="text-white" /> 
                      </button>
  
                      <button 
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-500/80 hover:bg-gray-700 p-3 rounded-full shadow-lg z-20 transition-all opacity-100"
                      >
                        <ChevronRight size={24} className="text-white" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-[500px] flex items-center justify-center text-gray-400 italic">
                Loading events...
              </div>
            )}
          </div> 
        </div> 
  
        {/* --- 拡大モーダル (画像タイプのみ表示) --- */}
        {isZoomed && selectedEvent && selectedEvent.type === "image" && selectedEvent.url && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div 
              className="absolute inset-0 bg-black/90 cursor-zoom-out pointer-events-auto" 
              onClick={() => setIsZoomed(false)} 
            />
            <div className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center pointer-events-none">
              <Image
                src={selectedEvent.url}
                alt="Zoomed Event"
                fill
                className="object-contain pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                className="absolute top-0 right-0 p-4 text-white hover:text-gray-300 text-4xl pointer-events-auto z-50"
                onClick={() => setIsZoomed(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </>
    );
  }