"use client"; // ← 接客役なので "use client" が必要！

import { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";

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

// ★ 親（サーバー）から完成済みのデータ(initialEvents)を受け取ります！
export default function EventCalendarClient({ initialEvents }: { initialEvents: Event[] }) {
  
  // 🌟 ここでブラウザを開いた瞬間の「今日」を取得し、過去の予定を弾く
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return initialEvents.filter((e) => {
      if (!e.date) return false;
      return new Date(e.date) >= today;
    });
  }, [initialEvents]);

  // 🌟 初期値は、絞り込み終わった upcomingEvents からセットする
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(upcomingEvents[0] || null);
  const [isZoomed, setIsZoomed] = useState(false);

  // 🌟 handlePrev / handleNext も initialEvents ではなく upcomingEvents を基準にする
  const handlePrev = () => {
    if (!selectedEvent || upcomingEvents.length === 0) return;
    const currentIndex = upcomingEvents.findIndex(e => e.id === selectedEvent.id);
    const prevIndex = (currentIndex - 1 + upcomingEvents.length) % upcomingEvents.length;
    setSelectedEvent(upcomingEvents[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedEvent || upcomingEvents.length === 0) return;
    const currentIndex = upcomingEvents.findIndex(e => e.id === selectedEvent.id);
    const nextIndex = (currentIndex + 1) % upcomingEvents.length;
    setSelectedEvent(upcomingEvents[nextIndex]);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-start max-w-6xl mx-auto px-4">
        {/* --- 左側：予定リスト --- */}
        <div className="md:col-span-4 w-full bg-white shadow-lg rounded-xl overflow-hidden border">
          <div className="bg-gray-800 text-white p-4 font-bold text-center">
            Upcoming Events
          </div>
          <div className="max-h-[380px] overflow-y-auto">
            {/* 🌟 マップ処理も upcomingEvents に変更 */}
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
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
                    </div>
                    <span className="block font-medium text-gray-900 italic font-serif text-lg leading-tight">
                      {event.title}
                    </span>
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
    
        {/* --- 右側：詳細表示エリア --- */}
        <div className="md:col-span-6 w-full flex flex-col items-center justify-center bg-white">
          {selectedEvent ? (
            <div className="w-full text-center group"> 
              <p className="mb-4 font-bold text-lg font-serif">
                {selectedEvent.date} の公演
              </p>
              <div className="relative h-[500px] w-full rounded-xl overflow-hidden border border-gray-100 shadow-md flex items-center justify-center">
                
                {selectedEvent.type === "image" && selectedEvent.url ? (
                  <Image 
                    src={selectedEvent.url} 
                    alt="Event Detail" 
                    fill 
                    className="object-contain cursor-zoom-in"
                    onClick={() => setIsZoomed(true)}
                  />
                ) : (
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

                {/* 🌟 矢印の表示条件も upcomingEvents に変更 */}
                {upcomingEvents.length > 1 && (
                  <>
                    <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-500/80 hover:bg-gray-700 p-3 rounded-full shadow-lg z-20 transition-all opacity-100">
                      <ChevronLeft size={24} className="text-white" /> 
                    </button>
                    <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-500/80 hover:bg-gray-700 p-3 rounded-full shadow-lg z-20 transition-all opacity-100">
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

      {/* --- 拡大モーダル --- */}
      {isZoomed && selectedEvent && selectedEvent.type === "image" && selectedEvent.url && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative w-full h-full max-w-4xl max-h-[90vh]">
            <Image src={selectedEvent.url} alt="Zoomed Event" fill className="object-contain" />
            <button className="absolute top-0 right-0 p-4 text-white hover:text-gray-300 text-4xl z-50">×</button>
          </div>
        </div>
      )}
    </>
  );
}