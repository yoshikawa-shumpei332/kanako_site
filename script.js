// ページが読み込まれたら、中の処理をすべて実行する
document.addEventListener('DOMContentLoaded', function () {

    // --- ライブスケジュールの処理 ---
    const scheduleTableBody = document.getElementById('live-schedule-body');
    if (scheduleTableBody) {
        loadLiveSchedule(scheduleTableBody);
    }

    // ▼▼▼ 以前追加したスライドショーのJSをこの内容に置き換えてください ▼▼▼
    // --- Past Events スライドショーの処理 ---
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        initializeSlideshow();
    }

    const sideMenu = document.getElementById('side-menu');
    const nav = document.querySelector('.nav');
    const hamb = document.querySelector('.hamb');

    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            sideMenu.checked = false;
        });
    });

    document.addEventListener('mousedown', function (event) {
        if (!sideMenu.checked) return;

        const isClickInsideNav = nav.contains(event.target);
        const isClickOnHamb = hamb.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamb) {
            sideMenu.checked = false;
        }
    });
});


let slideIndex = 1;
let slideshowTimeout; // 自動再生用のタイマー変数を宣言

function initializeSlideshow() {
    const slides = document.querySelectorAll(".slides");
    const thumbnailContainer = document.querySelector(".thumbnail-container");

    // スライドがなければ処理を終了
    if (slides.length === 0) return;

    // サムネイルを動的に生成
    slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        const thumb = document.createElement('img');
        thumb.src = img.src;
        thumb.alt = img.alt;
        thumb.classList.add('thumbnail-item');
        thumb.addEventListener('click', () => currentSlide(index + 1));
        thumbnailContainer.appendChild(thumb);
    });

    // イベントリスナーを設定
    document.querySelector('.prev').addEventListener('click', () => plusSlides(-1));
    document.querySelector('.next').addEventListener('click', () => plusSlides(1));

    // タッチイベント（スワイプ）の設定
    let touchStartX = 0;
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slideshowContainer.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) { // 左スワイプ
            plusSlides(1);
        } else if (touchEndX - touchStartX > 50) { // 右スワイプ
            plusSlides(-1);
        }
    });

    showSlides(slideIndex);
}

// 次/前のスライドへ
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// サムネイルクリックで指定のスライドへ
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// メインのスライド表示関数
function showSlides(n) {
    const slides = document.querySelectorAll(".slides");
    const thumbnails = document.querySelectorAll(".thumbnail-item");

    // インデックスの範囲チェック
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // 全てのスライドとサムネイルを非アクティブに
    slides.forEach(slide => slide.style.display = "none");
    thumbnails.forEach(thumb => thumb.classList.remove("active"));

    // 対象のスライドとサムネイルをアクティブに
    slides[slideIndex - 1].style.display = "block";
    thumbnails[slideIndex - 1].classList.add("active");

    // 自動再生タイマーをリセットして再開
    clearTimeout(slideshowTimeout);
    slideshowTimeout = setTimeout(() => plusSlides(1), 8000); // 4秒後に次のスライドへ
}


/**
 * Googleスプレッドシートからライブスケジュールを読み込み、テーブルに表示する関数
 * @param {HTMLElement} tableBody - スケジュールを挿入するtbody要素
 */
function loadLiveSchedule(tableBody) {
    // ↓↓↓ 必ずあなたのGoogleスプレッドシートの公開URLに書き換えてください ↓↓↓
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_tunqBSN0hqHBEu9z8kRyjda6ik3Ksz9cxuPnbtEM4GcNf4RpWYXY4khPEMcffhwPcg8F_k19SvCB/pub?gid=0&single=true&output=csv';

    fetch(sheetUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            tableBody.innerHTML = ''; // 古いデータをクリア
            const rows = text.split('\n').slice(1);

            if (rows.length === 0 || (rows.length === 1 && rows[0].trim() === '')) {
                tableBody.innerHTML = '<tr><td colspan="3">現在、予定されているライブはありません。</td></tr>';
                return;
            }

            rows.forEach(rowText => {
                // BOMや改行コードをトリム
                const cleanRowText = rowText.trim();
                if (cleanRowText === '') return;

                const columns = cleanRowText.split(',');

                if (columns.length >= 3) {
                    const newRow = document.createElement('tr');

                    // 日付セル
                    const dateCell = document.createElement('td');
                    dateCell.textContent = columns[0].trim();
                    newRow.appendChild(dateCell);

                    // 会場セル
                    const venueCell = document.createElement('td');
                    venueCell.textContent = columns[1].trim();
                    newRow.appendChild(venueCell);

                    // タイトルセル (リンク付き)
                    const titleCell = document.createElement('td');
                    const titleText = columns[2].trim();
                    const linkUrl = columns[3] ? columns[3].trim() : '';

                    if (linkUrl) {
                        const link = document.createElement('a');
                        link.href = linkUrl;
                        link.textContent = titleText;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        titleCell.appendChild(link);
                    } else {
                        titleCell.textContent = titleText;
                    }
                    newRow.appendChild(titleCell);

                    tableBody.appendChild(newRow);
                }
            });
        })
        .catch(error => {
            console.error('スケジュールの読み込みに失敗しました:', error);
            tableBody.innerHTML = '<tr><td colspan="3">スケジュールの読み込みに失敗しました。</td></tr>';
        });
}

const menuLinks = document.querySelectorAll('.menu a');
const sideMenu = document.getElementById('side-menu');

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Uncheck the checkbox to close the menu
        sideMenu.checked = false;
    });
});
