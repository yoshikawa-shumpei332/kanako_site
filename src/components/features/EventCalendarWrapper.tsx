import EventCalendarClient from "./EventCalendarClient";

async function fetchAllEvents() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const reloadTime = 86400


  let cloudinaryEvents: any[] = [];
  if (cloudName && apiKey && apiSecret) {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?context=true`;
    const res = await fetch(url, {
      headers: { Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}` },
      next: { revalidate: reloadTime }
    });
    if (res.ok) {
      const data = await res.json();
      cloudinaryEvents = data.resources.map((item: any) => {
        const customDate = item.context?.custom?.["event-date"];
        const customTitle = item.context?.custom?.title;
        return {
          id: item.asset_id,
          url: item.secure_url,
          date: customDate ? customDate : item.created_at.split("T")[0], 
          title: customTitle ? customTitle : "演奏予定",
          type: "image" as const,
        };
      });
    } else {
      console.error("❌ Cloudinary API エラー:", res.status, await res.text());
    }
  }

  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_tunqBSN0hqHBEu9z8kRyjda6ik3Ksz9cxuPnbtEM4GcNf4RpWYXY4khPEMcffhwPcg8F_k19SvCB/pub?gid=0&single=true&output=csv';
  const sheetRes = await fetch(sheetUrl, { next: { revalidate: reloadTime } }); 
  const csvText = await sheetRes.text();
  const sheetRows = csvText.split("\n").slice(1);
  const sheetEvents = sheetRows.map((row, index) => {
    const [date, venue, title, url, time] = row.split(",");
    return {
      id: `sheet-${index}`,
      date: date?.trim(),
      venue: venue?.trim(),
      title: title?.trim(),
      link: url?.trim(),
      time: time?.trim(),
      type: "text" as const,
    };
  }).filter(e => e.date);

  const allEvents = [...cloudinaryEvents, ...sheetEvents]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return allEvents;
}

export default async function EventCalendarWrapper() {
  const events = await fetchAllEvents();
  return <EventCalendarClient initialEvents={events} />;
}