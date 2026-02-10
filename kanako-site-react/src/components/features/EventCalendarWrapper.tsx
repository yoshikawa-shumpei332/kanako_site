"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Event = {
    id: string;
    url: string;
    date: string;
    event_name: string;
  };

  export default function EventCalendarWrapper() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    useEffect(() => {
      fetch("/api/cloudinary-events")
        .then((res) => res.json())
        .then((data) => {
          const today = new Date();
          today.setHours(0,0,0,0);

          const upcomingEvents = data.filter((event: Event) => {
            const eventDate = new Date(event.date);
            return eventDate >= today;
          });
          // 日付順（昇順）に並び替える
          const sorted = upcomingEvents.sort((a: Event, b: Event) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          setEvents(sorted);
          
          // 最初から一番近い予定を表示しておく
          if (sorted.length > 0) setSelectedEvent(sorted[0]);
        })
        .catch((err) => console.error(err));
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
                      {event.event_name}
                    </span>
                  </div>
                  <span className="text-gray-400 text-xl"></span>
                </button>
              ))
            ) : (
              <p className="p-10 text-center text-gray-400">予定はありません</p>
            )}
          </div>
        </div>
    
          <div className="md:col-span-6 w-full max-w-[500px] rounded-xl p-4 flex flex-col items-center justify-center bg-white">
            {selectedEvent ? (
              <div className="text-center w-full">
                <p className="mb-4 font-bold text-lg">{selectedEvent.date} の公演</p>
                <div className="relative h-[500px] w-full rounded-xl overflow-hidden ">
                  <Image 
                    src={selectedEvent.url} 
                    alt="Event Detail" 
                    fill 
                    className="object-contain shadow-md rounded"
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
              <p className="text-gray-400 text-center">カレンダーの印がついた日付を選択すると<br/>詳細画像が表示されます</p>
            )}
          </div>
        </div>
      );
    }