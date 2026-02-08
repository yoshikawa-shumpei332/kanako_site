"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoLogoInstagram } from "react-icons/io5";
import EventCalendarWrapper from "../components/features/EventCalendarWrapper";

export default function Home() {

  const images = [
    "S__268574749_0.jpg",
    "S__268574750_0.jpg",
    "S__268574751_0.jpg",
    "S__268574752_0.jpg",
    "S__268574755_0.jpg",
    "S__268574756_0.jpg"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
  const timer = setInterval(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, 8000);

  return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="min-h-screen font-sans text-gray-800">
      {/* --- ヘッダー --- */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-widest">越智可奈子</h1>
          <nav>
            <ul className="flex gap-6 text-sm font-medium">
              <li><a href="#bio" className="hover:text-gray-500">Biography</a></li>
              <li><a href="#live" className="hover:text-gray-500">Live</a></li>
              <li><a href="#past-events" className="hover:text-gray-500">Past Events</a></li>
              <li><Link href="/contact" className="hover:text-gray-500">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-gray-500">FAQ</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* --- Biography --- */}
        <section id="bio" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[3/4] w-full max-w-sm mx-auto">
                <Image
                  src="/images/2D2D2D16-F4A9-46D5-B0C6-86242639F9A9.jpg"
                  alt="越智可奈子 アーティスト写真"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-serif mb-6 border-b pb-2">Biography</h2>
              <p className="leading-relaxed">
                北九州市出身。３歳からピアノを始める。<br />
                大分県立芸術文化短期大学音楽科ピアノ専攻卒業及び、同大学専攻科修了。<br />
                第16回九州・山口ジュニアピアノコンクール審査委員長賞受賞。<br />
                第12回別府アルゲリッチ音楽祭大分県出身若手演奏家コンサート出演。<br />
                第12回アジア国際音楽コンクールピアノ部門第3位。<br />
                これまでに市川馨子、片山順子、故 若松啓子、田中星治、黒川浩の各氏に師事。<br />
                現在、室内楽、伴奏など幅広く活動する。
              </p>
            </div>
          </div>
        </section>

        {/* --- Live Schedule --- */}
        <section id="live-calendar" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif mb-10 text-center">Live Calendar</h2>
          <EventCalendarWrapper />
          
        </div>
      </section>
        
        {/* --- Past Events  --- */}
        <section id="past-events" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif mb-8 text-center">Past Events</h2>
            <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-black/5">

              <div className="relative h-[500px] w-full">
                <Image 
                  src={`/images/${images[currentIndex]}`} 
                  alt="Event" 
                  fill 
                  className="object-contain" 
                />
              </div>
              <button 
                onClick={() => setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full z-10"
              >
                <ChevronLeft />
              </button>
              <button 
                onClick={() => setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full z-10"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </section>

        {/* --- Contact --- */}
        <section id="contact" className="py-20 text-center bg-white border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif mb-4">Contact</h2>
            <p className="mb-8 text-gray-600">教室、出演依頼、その他お問い合わせはこちらから。</p>
            <Link 
              href="/contact" 
              className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition shadow-md"
            >
              Contact Form
            </Link>
            <div className="mt-8">
              <a 
                href="https://www.instagram.com/kanakoochi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center hover:opacity-70 transition-opacity"
              >
                {/* 2. アイコンを表示。colorに直接色を指定できます */}
                <IoLogoInstagram 
                  size={40} 
                  className="text-[#E1306C]" // インスタの代表的なピンク色を指定
                />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center bg-gray-900 text-white text-sm">
        <div className="container mx-auto">
          <p>&copy; 2026 ochi kanako. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}