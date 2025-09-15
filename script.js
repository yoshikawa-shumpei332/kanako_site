// ページが読み込まれたら実行する
document.addEventListener('DOMContentLoaded', function() {

    // スライドとドットの要素を取得
    const slides = document.querySelectorAll('.slide-item');
    const dotsContainer = document.querySelector('.slider-dots');
    
    // スライドが1枚以上ある場合のみ実行
    if (slides.length > 0) {
        // スライドの枚数分だけドットを生成
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
        let slideInterval; // 自動再生のタイマーを管理する変数

        // スライドを切り替える関数
        function showSlide(n) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            // スライド番号を計算（ループさせるため）
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        // ✨ここから追加：ドットがクリックされた時の処理
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index); // クリックされたドットに対応するスライドを表示
                
                // ✨追加：自動再生のタイマーをリセット
                clearInterval(slideInterval); // 今のタイマーを停止
                startAutoPlay(); // 新しくタイマーを開始
            });
        });
        
        // ✨ここから変更：自動再生を開始する関数
        function startAutoPlay() {
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1); // 次のスライドへ
            }, 5000); // 5000ミリ秒 = 5秒
        }

        // 最初の自動再生を開始
        startAutoPlay();
    }
});