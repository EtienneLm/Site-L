let currentIndex = 0;
const images = document.querySelectorAll('.carousel_images img');
const totalImages = images.length;
const dots = document.querySelectorAll('.dot');

function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex >= totalImages) {
        currentIndex = 0;
    }
    if (currentIndex < 0) {
        currentIndex = totalImages - 1;
    }

    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetAutoSlide();
}

function updateCarousel() {
    const offset = -currentIndex * 100;
    document.querySelector('.carousel_images').style.transform = `translateX(${offset}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function autoSlide() {
    changeImage(1);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 3000);
}

document.getElementById('previous').addEventListener('click', () => {
    changeImage(1); 
    resetAutoSlide();
});

document.getElementById('next').addEventListener('click', () => {
    changeImage(-1); 
    resetAutoSlide();
});

updateCarousel();
