"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { IoLogoInstagram } from "react-icons/io5";
import EventCalendarWrapper from "../components/features/EventCalendarWrapper";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "S__268574749_0.jpg",
    "S__268574750_0.jpg",
    "S__268574751_0.jpg",
    "S__268574752_0.jpg",
    "S__268574755_0.jpg",
    "S__268574756_0.jpg"
  ];

  // Auto-slide for events
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Helper to close menu
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="min-h-screen font-sans text-gray-800 relative">
      {/* --- ヘッダー --- */}
      <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-widest z-[110]">
            越智可奈子
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-8 text-sm font-medium">
              <li><a href="#bio" className="hover:text-pink-600 transition">Biography</a></li>
              <li><a href="#live" className="hover:text-pink-600 transition">Live</a></li>
              <li><a href="#past-events" className="hover:text-pink-600 transition">Past Events</a></li>
              <li><Link href="/contact" className="hover:text-pink-600 transition">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-pink-600 transition">FAQ</Link></li>
            </ul>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden p-2 z-[110]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* --- MOVED MOBILE MENU OUTSIDE HEADER --- */}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 transition-opacity duration-300 md:hidden z-[115] ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        onClick={closeMenu}
      />

      {/* Mobile Menu Panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-[120] w-[280px] bg-white transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full w-full">
          {/* Header inside menu to push items down */}
          <div className="p-6 flex justify-end">
            <button onClick={closeMenu} className="p-2 text-gray-900">
              <X size={28} />
            </button>
          </div>

          <nav className="px-8">
            <ul className="flex flex-col gap-8 text-lg font-bold text-gray-900">
              <li>
                <a href="#bio" onClick={closeMenu} className="block border-b border-gray-100 pb-2">Biography</a>
              </li>
              <li>
                <a href="#live" onClick={closeMenu} className="block border-b border-gray-100 pb-2">Live</a>
              </li>
              <li>
                <a href="#past-events" onClick={closeMenu} className="block border-b border-gray-100 pb-2">Past Events</a>
              </li>
              <li>
                <Link href="/contact" onClick={closeMenu} className="block border-b border-gray-100 pb-2">Contact</Link>
              </li>
              <li>
                <Link href="/faq" onClick={closeMenu} className="block">FAQ</Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <main>
        {/* --- Biography --- */}
        <section id="bio" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative aspect-[3/4] w-full max-w-[320px] md:max-w-sm">
                <Image
                  src="/images/2D2D2D16-F4A9-46D5-B0C6-86242639F9A9.jpg"
                  alt="越智可奈子 アーティスト写真"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif mb-8 border-l-4 border-pink-500 pl-4">Biography</h2>
              <p className="leading-relaxed text-gray-700 text-sm md:text-base space-y-4">
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
        <section id="live" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif mb-10 text-center">Live Calendar</h2>
            <div className="overflow-x-auto">
              <EventCalendarWrapper />
            </div>
          </div>
        </section>

        {/* --- Past Events  --- */}
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

        {/* --- Contact --- */}
        <section id="contact" className="py-24 text-center bg-white border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif mb-4">Contact</h2>
            <p className="mb-8 text-gray-600 max-w-md mx-auto">教室、出演依頼、その他お問い合わせはこちらから。</p>
            <Link
              href="/contact"
              className="inline-block bg-pink-600 text-white px-10 py-4 rounded-full hover:bg-pink-700 transition transform hover:scale-105 shadow-lg font-bold"
            >
              Contact Form
            </Link>
            <div className="mt-12">
              <a
                href="https://www.instagram.com/kanakoochi"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-col items-center gap-2"
              >
                <IoLogoInstagram
                  size={48}
                  className="text-[#E1306C] group-hover:scale-110 transition-transform"
                />
                <span className="text-xs text-gray-400 font-medium tracking-widest">INSTAGRAM</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 text-center bg-gray-900 text-gray-400 text-xs">
        <div className="container mx-auto px-4">
          <p className="tracking-widest">&copy; 2026 OCHI KANAKO. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
