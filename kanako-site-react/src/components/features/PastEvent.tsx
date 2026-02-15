"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PastEvent() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        "S__268574749_0.jpg",
        "S__268574750_0.jpg",
        "S__268574751_0.jpg",
        "S__268574752_0.jpg",
        "S__268574755_0.jpg",
        "S__268574756_0.jpg"
      ];
    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 8000);
        return () => clearInterval(timer);
      }, [images.length]);

    return (
        <section id="past-events" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif mb-8 text-center">Past Events</h2>
            <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl aspect-video md:h-[500px]">
              <Image
                src={`/images/${images[currentIndex]}`}
                alt="Event"
                fill
                className="object-contain bg-black/10"
              />
              <button
                onClick={() => setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </section>
    )
}