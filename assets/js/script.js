/**
 * スクロール位置に基づいて要素の背景色を変更する
 */
const changeBackgroundColorOnScroll = () => {
    const contentElement = document.getElementById("content__white");
    const mainElement = document.getElementById("content__black");
    const mainBottom = mainElement.offsetTop + mainElement.offsetHeight;

    // 白背景にしたいコンテンツが画面の3/4を覆ったら
    if (window.scrollY > mainBottom - window.innerHeight / 4) {
        // 時間経過で徐々にcontent__whiteのの背景色を白くする
        contentElement.style.backgroundColor = 'white';
        contentElement.style.transition = 'background-color 1s';

    } else {
        contentElement.style.backgroundColor = 'black';
    }
}

/**
 * 要素が画面に入ったタイミングでフェードインさせる
 */
const animateSectionheaderOnIntersection = () => {
    const headerContainers = document.querySelectorAll('.section__header-container');
    const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
            const headerText = entry.target.querySelector('.section-header__text');
            if (entry.isIntersecting) {
                headerText.classList.add('animate__animated', 'animate__fadeInLeft');
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback);
    headerContainers.forEach(container => {
        observer.observe(container);
    });
}


/**
 * 画面に入った要素に対して一度だけアニメーションを適用する
 * @param {string} triggerSelector - IntersectionObserver で監視する要素のセレクタ
 * @param {string} targetSelector - アニメーションを適用する対象要素のセレクタ
 * @param {string} animationClasses - 適用するアニメーションのクラス名
 */
const animateOnIntersection = (triggerSelector, targetSelector, animationClasses) => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll(targetSelector).forEach(target => {
                    // classesを空白で分割する
                    const classes = animationClasses.split(' ');
                    classes.forEach(className => {
                        target.classList.add(className);
                    });
                });
                // アニメーションを適用後、監視を解除する
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.6 // 要素が10%見えたらトリガー
    });

    document.querySelectorAll(triggerSelector).forEach(trigger => {
        observer.observe(trigger);
    });
};

window.addEventListener("scroll", changeBackgroundColorOnScroll);
window.addEventListener("DOMContentLoaded", () => {
    // セクションヘッダーのアニメーション
    animateSectionheaderOnIntersection();

    // ラーメンの画像のアニメーション
    animateOnIntersection('.favorite__images-container--interactive', '.favorite__image--interactive:nth-child(even)', 'animate__animated animate__fadeInUp');
    animateOnIntersection('.favorite__images-container--interactive', '.favorite__image--interactive:nth-child(odd)', 'animate__animated animate__fadeInDown');

    // ゆるふわの画像のアニメーション
    animateOnIntersection('.favorite__image', '.favorite__image:first-child', 'animate__animated animate__fadeInLeft');
    animateOnIntersection('.favorite__image', '.favorite__image:last-child', 'animate__animated animate__fadeInRight');

    // 性格の画像のアニメーション
    animateOnIntersection('.personality__image-container', '.personality__image-container', 'animate__animated animate__fadeInUp');

    // プロダクトセクションのアニメーション
    animateOnIntersection('.products__row-container:first-child', '.products__row-container:first-child', 'animate__animated animate__fadeInLeft');
    animateOnIntersection('.products__row-container:last-child', '.products__row-container:last-child', 'animate__animated animate__fadeInRight');

    // ターゲットセクションのアニメーション
    animateOnIntersection('.products__row-container:first-child', '.products__row-container:first-child', 'animate__animated animate__fadeInLeft');
    animateOnIntersection('.target__text-container', '.target__image-container', 'animate__animated animate__pulse');
});
