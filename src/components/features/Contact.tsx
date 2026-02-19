import Link from "next/link";
import { IoLogoInstagram } from "react-icons/io5";
export default function Contact() {
    return (
        <section id="contact" className="pt-12 text-center bg-white border-t">
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
              </a>
            </div>
          </div>
        </section>
    )
}