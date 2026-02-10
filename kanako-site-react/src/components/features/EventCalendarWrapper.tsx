"use client";

import { useState, useEffect } from "react";
import Image from "next/image";


type Event = {
    id: string;
    url: string;
    date: string;
    event_name: string;
  };

  export default function EventCalendarWrapper() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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
          })
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


    return (
      <div className="flex flex-col md:flex-row gap-8 items-start max-w-5xl mx-auto">
        {/* 左側：予定リスト */}
        <div className="w-full md:w-1/3 bg-white shadow-lg rounded-xl overflow-hidden border">
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
    
          <div className="w-full md:w-1/2 min-h-[300px] border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50">
            {selectedEvent ? (
              <div className="text-center w-full">
                <p className="mb-4 font-bold text-lg">{selectedEvent.date} の公演</p>
                <div className="relative aspect-[3/4] w-full max-w-[300px] mx-auto">
                  <Image 
                    src={selectedEvent.url} 
                    alt="Event Detail" 
                    fill 
                    className="object-contain shadow-md rounded"
                  />
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-center">カレンダーの印がついた日付を選択すると<br/>詳細画像が表示されます</p>
            )}
          </div>
        </div>
      );
    }