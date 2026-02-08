"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";


type Event = {
    id: string;
    url: string;
    date: string;
  };

  export default function EventCalendarWrapper() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    useEffect(() => {
        fetch("/api/cloudinary-events")
          .then((res) => res.json())
          .then((data) => setEvents(data))
          .catch((err) => console.error(err));
      }, []);


    const handleDateChange = (date: any) => {
        setSelectedDate(date);
        const dateString = date.toLocaleDateString('sv-SE'); // YYYY-MM-DD形式
        const event = events.find((e) => e.date === dateString);
        setSelectedEvent(event || null);
      };


    const tileClassName = ({ date, view }: any) => {
        if (view === 'month') {
          const dateString = date.toLocaleDateString('sv-SE');
          return events.some((e) => e.date === dateString) ? "bg-red-100 text-red-600 font-bold rounded-full" : null;
        }
      };

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-xl">
            <Calendar 
              onChange={handleDateChange} 
              value={selectedDate} 
              tileClassName={tileClassName}
              locale="ja-JP"
            />
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