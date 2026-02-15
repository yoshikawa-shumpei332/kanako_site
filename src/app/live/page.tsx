import EventCalendarWrapper from "@/components/features/EventCalendarWrapper";

export default function LivePage() {
  return (
    <main className="py-10 container mx-auto">
      <h2 className="text-3xl font-serif text-center mb-10">Schedule</h2>
      {/* 複雑な処理はすべてこのコンポーネントの中に隠す */}
      <EventCalendarWrapper />
    </main>
  );
}