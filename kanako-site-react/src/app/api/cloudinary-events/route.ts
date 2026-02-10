import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  export async function GET() {
    try {
      // tags: "live" が付いている画像を検索
      const result = await cloudinary.search
        .expression('tags:live')
        .with_field('context') // 日付が入っているメタデータを取得
        .execute();
  
      // フロントエンドが使いやすい形にデータを加工
      const events = result.resources.map((resource: any) => ({
        id: resource.public_id,
        url: resource.secure_url,
        // Cloudinaryの「Context」欄に event_date: 2026-02-15 のように入れている想定
        date: resource.context?.["event-date"] || resource.context?.event_date || "",
        event_name: resource.context?.["title"] || "演奏予定",
            }));

      return NextResponse.json(events);
    } catch (error) {
      console.error("Cloudinary API Error:", error);
      return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
  }