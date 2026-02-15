import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
export default function ContactPage() {
  
  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-serif mb-4 text-gray-900">Contact</h2>
        <p className="text-gray-600 mb-10">ご用件に合わせたフォームをお選びください。</p>

        <div className="flex flex-col gap-4">
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSdM2iLp5URmlIkspdgsASSB45JZs21USdeWCQppG94IIfm4ZA/viewform?usp=dialog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-contact"          
            >
            レッスンに関するお問い合わせ
          </a>
          
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSf_C5dXgzj0Ch-cW5Ph82klCyaIID4lcDY8jAveb8TcnLGNAQ/viewform?usp=dialog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-contact"  
            >
            演奏依頼に関するお問い合わせ
          </a>
          
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSc8agkgYK4UFXfwFklsx5X7cyz8e3bkK6lEjflm67Py5TMNoQ/viewform?usp=dialog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-contact"  
            >
            その他のお問い合わせ
          </a>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-gray-500 hover:text-gray-800 transition-colors inline-flex items-center">
            <span className="mr-2">←</span> ホームに戻る
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}