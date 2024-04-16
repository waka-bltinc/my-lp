/**
 * スクロール位置に基づいて要素の背景色を変更する
 */
const changeBackgroundColorOnScroll = () => {
    const contentElement = document.getElementById("content__white");
    const mainElement = document.getElementById("content__black");
    const mainBottom = mainElement.offsetTop + mainElement.offsetHeight;

    // スクロール位置がmain要素の真ん中あたりに来たら背景色を変更
    if (window.scrollY > mainBottom - window.innerHeight / 2) {
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

const photoZoomOnHover = () => {
    const photoElements = document.querySelectorAll('.favorite__image--interactive');

    photoElements.forEach((photoElement) => {
        photoElement.addEventListener('mouseover', () => {
            photoElements.forEach((element) => {
                if (element !== photoElement) {
                    element.classList.add('favorite__image--out');
                }
            });
            photoElement.classList.add('favorite__image--zoom');
        });
        photoElement.addEventListener('mouseout', () => {
            photoElements.forEach((element) => {
                if (element !== photoElement) {
                    element.classList.remove('favorite__image--out');
                }
            });
            photoElement.classList.remove('favorite__image--zoom');
        });
    });
}

window.addEventListener("scroll", changeBackgroundColorOnScroll);
window.addEventListener("DOMContentLoaded", animateTextOnIntersection);
window.addEventListener("DOMContentLoaded", photoZoomOnHover);
