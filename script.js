// ページが読み込まれたら、中の処理をすべて実行する
document.addEventListener('DOMContentLoaded', function() {

    // --- スライドショーの処理 ---
    const slider = document.querySelector('#hero-slider');
    // もしスライダーがこのページに存在したら、関連する処理を実行
    if (slider) {
        const slides = document.querySelectorAll('.slide-item');
        const dotsContainer = document.querySelector('.slider-dots');
        
        if (slides.length > 0) {
            slides.forEach((slide, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) {
                    dot.classList.add('active');
                }
                dotsContainer.appendChild(dot);
            });

            const dots = document.querySelectorAll('.dot');
            let currentSlide = 0;
            let slideInterval;

            function showSlide(n) {
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                currentSlide = (n + slides.length) % slides.length;
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                    clearInterval(slideInterval);
                    startAutoPlay();
                });
            });
            
            function startAutoPlay() {
                clearInterval(slideInterval);
                slideInterval = setInterval(() => {
                    showSlide(currentSlide + 1);
                }, 5000);
            }

            startAutoPlay();
        }
    }

    // --- ライブスケジュールの処理 ---
    const scheduleTableBody = document.getElementById('live-schedule-body');
    // もしライブ予定表がこのページに存在したら、読み込み関数を実行
    if (scheduleTableBody) {
        loadLiveSchedule(scheduleTableBody);
    }
});


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