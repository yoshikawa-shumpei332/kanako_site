
"use client";
import Link from "next/link";
import { Menu, X} from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const closeMenu = () => setIsOpen(false);
    return (
        <>
        <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md shadow-sm text-black">
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
      </>
    );
}