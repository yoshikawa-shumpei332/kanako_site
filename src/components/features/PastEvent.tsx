"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PastEvent() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
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
        <>
        <section id="past-events" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif mb-8 text-center">Past Events</h2>
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden border border-gray-100 shadow-md flex items-center justify-center">
              <Image
                src={`/images/${images[currentIndex]}`}
                alt="Event"
                fill
                className="object-contain"
                onClick = {() => setIsZoomed(true)}
              />
              <button
                onClick={() => setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-500/80 hover:bg-gray-700 p-3 rounded-full shadow-lg z-20 transition-all opacity-100"
              >
                <ChevronLeft size={24} className="text-white"/>
              </button>
              <button
                onClick={() => setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-500/80 hover:bg-gray-700 p-3 rounded-full shadow-lg z-20 transition-all opacity-100"
              >
                <ChevronRight size={24} className="text-white"/>
              </button>
            </div>
          </div>
        </section>
        {isZoomed && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
                <div 
                    className="absolute inset-0 bg-black/90 cursor-zoom-out pointer-events-auto" 
                    onClick={() => setIsZoomed(false)} 
                />
                
                <div className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center pointer-events-none">
                    <Image
                        src={`/images/${images[currentIndex]}`}
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