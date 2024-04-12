/**
 * スクロール位置に基づいて要素の背景色を変更する
 */
const changeBackgroundColorOnScroll = () => {
    const contentElement = document.getElementById("content__white");
    const mainElement = document.getElementById("content__black");
    const mainBottom = mainElement.offsetTop + mainElement.offsetHeight;

    if (window.scrollY > mainBottom) {
        const scrollAmount = window.scrollY - mainBottom;
        let colorValue = Math.min(242, scrollAmount);
        colorValue = Math.floor(colorValue);
        contentElement.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    } else {
        contentElement.style.backgroundColor = 'black';
    }
}

/**
 * 要素が画面に入ったタイミングでフェードインさせる
 */
const animateTextOnIntersection = () => {
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

document.addEventListener("scroll", changeBackgroundColorOnScroll);
window.addEventListener("DOMContentLoaded", animateTextOnIntersection);
