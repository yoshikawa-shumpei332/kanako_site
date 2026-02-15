import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
export default function FaqPage() {
  return (
  
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-800">
      <Header />

      {/* --- メインコンテンツ --- */}
      <main className="flex-grow container mx-auto px-4 py-16 max-w-3xl">
        <h2 className="text-3xl font-serif mb-12 text-center border-b pb-4">よくある質問 (FAQ)</h2>

        <div className="space-y-4">
          {/* FAQ 1 */}
          <details className="group border rounded-lg p-4 bg-gray-50 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex justify-between items-center cursor-pointer list-none font-bold text-lg">
              <span>Q. レッスンの料金はいくらですか？</span>
              <span className="transition group-open:rotate-180 text-gray-500">▼</span>
            </summary>
            <div className="mt-4 text-gray-700 leading-relaxed border-t pt-4">
              <p>A. レッスンは月謝制と1レッスン制となっています。詳細については、教室依頼のフォームに記載しております。より詳しい内容を知りたい方は、お問い合わせフォームよりお気軽にご連絡ください。</p>
            </div>
          </details>

          {/* FAQ 2 */}
          <details className="group border rounded-lg p-4 bg-gray-50 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex justify-between items-center cursor-pointer list-none font-bold text-lg">
              <span>Q. 演奏依頼はどのようなジャンルに対応していますか？</span>
              <span className="transition group-open:rotate-180 text-gray-500">▼</span>
            </summary>
            <div className="mt-4 text-gray-700 leading-relaxed border-t pt-4">
              <p>A. クラシック音楽をはじめ、映画音楽などさまざまなジャンルを演奏させていただきます。</p>
            </div>
          </details>

          {/* FAQ 3 */}
          <details className="group border rounded-lg p-4 bg-gray-50 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex justify-between items-center cursor-pointer list-none font-bold text-lg">
              <span>Q. オンラインでのレッスンは可能ですか？</span>
              <span className="transition group-open:rotate-180 text-gray-500">▼</span>
            </summary>
            <div className="mt-4 text-gray-700 leading-relaxed border-t pt-4">
              <p>A. はい、Google Meetを利用したオンラインレッスンにも対応しております。遠方にお住まいの方はこちらをご利用ください。</p>
            </div>
          </details>
        </div>

        <div className="mt-16 text-center">
          <Link href="/contact" className="text-blue-600 hover:underline">
            解決しない場合はこちらからお問い合わせください →
          </Link>
        </div>
      </main>
      <Footer />
      </div>
      
    
  );
}