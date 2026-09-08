# 🎵 Portfolio Event Calendar

Next.js (App Router) と Tailwind CSS を使用して構築された、ハイブリッドな演奏会・イベントカレンダー機能を持った音楽家の紹介サイトです。

## 実際のサイト
[https://kanakopianoforte.com/](https://kanakopianoforte.com/)

## 🌟 概要
このコンポーネントは、**「画像があるメインの演奏会（Cloudinary）」**と**「文字情報だけの細かな予定（Google スプレッドシート）」**という2つの異なるデータソースから情報を自動的に取得・統合し、一つの美しいカレンダーリストとして表示します。

## ✨ 主な機能
- **ハイブリッドデータ統合**: Cloudinaryの画像データとGoogleスプレッドシートのCSVデータを結合し、日付順（昇順）に自動ソートします。
- **動的UIの切り替え**: 
  - 画像データ（チラシあり）の場合は、画像を大きく表示。
  - テキストデータ（チラシなし）の場合は、招待状風の美しいデザインカードを表示。
- **インタラクティブな操作性**:
  - 画像の拡大表示（モーダル/ライトボックス機能）。背景タップでスムーズに閉じます。
  - 左右の矢印ボタン（次へ / 前へ）によるシームレスな予定の切り替え。
- **パフォーマンスとUXの最適化**:
  - 読み込み中のスケルトン（ローディング）表示と、高さの固定化（`min-h`）による **CLS (Cumulative Layout Shift) の完全防止**。
  - 開発環境（ローカル）と本番環境での、Next.jsのキャッシュの最適化。

## 🛠 技術スタック
- **Framework**: Next.js (App Router) / React
- **Styling**: Tailwind CSS
- **Icons**: Lucide React (`npm install lucide-react`)
- **Backend/Storage**: 
  - Cloudinary (画像ホスティング & API)
  - Google Spreadsheet (CSV公開機能)
- **Server**: CloudFlare

---

## 📝 運用・更新マニュアル

サイトを更新・管理するための手順です。エンジニアリングの知識がなくても、以下の手順でサイトが自動更新されます！

### 1. チラシ画像があるイベントの追加（Cloudinary）
1. Cloudinary のメディアライブラリにチラシ画像をアップロードします。
2. 画像のメタデータに以下を設定します：
   - `Context` -> `custom` -> `event-date` に日付（例: `2026-05-20`）を入力。
   - `Context` -> `custom` -> `title` に公演名を入力。
3. `live` のタグをつけて他画像と差別化します。
4. **👉 サイトをリロードすると自動的に画像付きで表示されます。(現状は1日おき)**

### 2. 文字だけのイベントの追加（Google スプレッドシート）
1. 指定のGoogleスプレッドシートを開きます。
2. 以下のフォーマット（列）に従って新しい行に予定を追記します。
   - `Date`: 日付 (例: `2026/06/15`) **※必須**
   - `Venue`: 会場名 (例: `サントリーホール`)
   - `Title`: イベント名 (例: `ヴァイオリン協奏曲 客演`)
   - `URL`: 詳細リンク (例: `https://...`)
   - `Time`: 開始時間 (例: `14:00`)
3. **👉 スプレッドシートを編集するだけで、サイトに自動反映されます。(現状は1日おき)**

---


## 💻 開発者向けセットアップ

### 環境変数 (`.env.local`)
プロジェクトをローカルで動かすには、以下の環境変数が必要です。

```env
# Cloudinary API
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google Spreadsheet CSV URL (任意)
NEXT_PUBLIC_GOOGLE_SHEET_URL=[https://docs.google.com/spreadsheets/d/e/.../pub?output=csv](https://docs.google.com/spreadsheets/d/e/.../pub?output=csv)
```


updateがうまくされないので今後修正が必要