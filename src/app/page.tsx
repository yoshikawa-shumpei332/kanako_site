import Image from "next/image";
import EventCalendarWrapper from "../components/features/EventCalendarWrapper";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PastEvent from "../components/features/PastEvent";
import Contact from "../components/features/Contact";
export default function Home() {

  return (
    <div className="min-h-screen font-sans text-gray-800 relative">
      <Header />
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
              <h2 className="text-3xl md:text-4xl font-serif mb-8 text-center pl-4">Biography</h2>
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
        <PastEvent />
        {/* --- Contact --- */}
        <Contact />
      </main>

      <Footer />    
      </div>
  );
}
