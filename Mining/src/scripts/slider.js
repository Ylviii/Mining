const slider = document.getElementById('slider');
const images = slider.querySelectorAll('img');

// Клонируем все слайды и добавляем их в начало и конец слайдера
images.forEach((image, index) => {
    const cloneFirst = image.cloneNode(true);
    const cloneLast = image.cloneNode(true);
    cloneFirst.id = `first-clone-${index}`;
    cloneLast.id = `last-clone-${index}`;
    
    slider.appendChild(cloneFirst);
    slider.insertBefore(cloneLast, slider.firstChild);
});

const slideWidth = images[0].clientWidth;
let currentIndex = images.length; // Начинаем с первого реального слайда

slider.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

function moveToNextSlide() {
    if (currentIndex >= images.length * 2 - 1) return; // Не разрешаем выйти за границы

    currentIndex++;
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
}

function moveToPrevSlide() {
    if (currentIndex <= 0) return; // Не разрешаем выйти за границы

    currentIndex--;
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
}

slider.addEventListener('transitionend', () => {
    if (currentIndex >= images.length * 2 - 1) {
        slider.style.transition = 'none';
        currentIndex = images.length - 1;
        slider.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
    } else if (currentIndex <= 0) {
        slider.style.transition = 'none';
        currentIndex = images.length;
        slider.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
    }
});

setInterval(moveToNextSlide, 2000); // Смена изображения каждые 5 секунд
