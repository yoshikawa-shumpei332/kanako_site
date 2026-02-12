"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

          const sheetUrl = "https://docs.google.com/spreadsheets/d/1TJUWvwA8jjFPqc6vsOK2iRp_OjZ4KcbckmU_q_OHB6U/edit?usp=sharing";
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
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-start max-w-6xl mx-auto">
          {/* 左側：予定リスト */}
          <div className="md:col-span-4 w-full p-4 bg-white shadow-lg rounded-xl overflow-hidden border">
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
                    <div>
                      <span className="block text-sm text-gray-500">
                        {event.date.replace(/-/g, "/")}
                      </span>
                      <span className="font-medium text-gray-900 italic font-serif">
                        {event.title}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <p className="p-10 text-center text-gray-400">予定はありません</p>
              )}
            </div>
          </div>
      
          {/* 右側：画像詳細 */}
          <div className="md:col-span-6 w-full max-w-[500px] rounded-xl p-4 flex flex-col items-center justify-center bg-white">
            {selectedEvent ? (
              <div className="text-center w-full group"> 
                <p className="mb-4 font-bold text-lg">{selectedEvent.date} の公演</p>
                <div className="relative h-[500px] w-full rounded-xl overflow-hidden ">
                  <Image 
                    src={selectedEvent.url} 
                    alt="Event Detail" 
                    fill 
                    className="object-contain shadow-md rounded cursor-zoom-in"
                    onClick={() => setIsZoomed(true)}
                  />
                  {events.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-500/80 hover:bg-gray-900 p-3 rounded-full shadow-lg z-10 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      >
                        <ChevronLeft size={24} className="text-white" /> 
                      </button>

                      <button 
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-500/80 hover:bg-gray-900 p-3 rounded-full shadow-lg z-10 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      >
                        <ChevronRight size={24} className="text-white" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-center">予定を選択すると<br/>詳細画像が表示されます</p>
            )}
          </div> 
        </div> 

        {isZoomed && selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div 
              className="absolute inset-0 bg-black/90 cursor-zoom-out" 
              onClick={() => setIsZoomed(false)} 
            />
            <div className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center pointer-events-none">
              <Image
                src={selectedEvent.url}
                alt="Zoomed Event"
                fill
                className="object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                className="absolute top-0 right-0 p-4 text-white hover:text-gray-300 text-2xl"
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