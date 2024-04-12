document.addEventListener("scroll", function () {
    const contentElement = document.getElementById("content__white");
    const mainElement = document.getElementById("content__black");
    const mainBottom = mainElement.offsetTop + mainElement.offsetHeight;

    if (window.scrollY > mainBottom) {
        // main要素を超えたスクロール量
        const scrollAmount = window.scrollY - mainBottom;

        // 色の変化を制限（最大242とする）
        let colorValue = Math.min(242, scrollAmount); // 0.1は変化速度を調整する係数
        colorValue = Math.floor(colorValue); // 整数に丸める

        // 背景色を設定
        contentElement.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    } else {
        // main要素より上にいる場合は背景色をリセット
        contentElement.style.backgroundColor = 'black';
    }
});

window.addEventListener("DOMContentLoaded", function () {
    // すべての.section__header-container要素を選択
    const headerContainers = document.querySelectorAll('.section__header-container');

    // Intersection Observerのコールバック
    const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
            // 対応する.section-header__text要素を取得
            const headerText = entry.target.querySelector('.section-header__text');

            if (entry.isIntersecting) {
                headerText.classList.add('animate__animated', 'animate__fadeInLeft');
            }
        });
    };

    // Intersection Observerの設定
    const observer = new IntersectionObserver(observerCallback);

    // それぞれの.section__header-container要素に対してオブザーバーを設定
    headerContainers.forEach(container => {
        observer.observe(container);
    });
});
