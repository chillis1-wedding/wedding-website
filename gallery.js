// Stacking Slider Gallery

// List of all photos (in order)
const photos = [
    'photos/49.jpg',
    'photos/IMG_0410.jpg',
    'photos/IMG_0724.jpg',
    'photos/IMG_1502.jpg',
    'photos/IMG_2871.jpg',
    'photos/IMG_3047.jpg',
    'photos/IMG_3129.jpg',
    'photos/IMG_3900.jpg',
    'photos/IMG_4443.jpg',
    'photos/IMG_4746.jpg',
    'photos/IMG_5897.jpg',
    'photos/IMG_7462.jpg',
    'photos/IMG_8099.jpg',
    'photos/IMG_9584.jpg',
    'photos/IMG_9918.jpg'
];

let currentIndex = 0;
let isTransitioning = false;

// DOM elements
const slideStack = document.getElementById('slide-stack');
const currentPhotoSpan = document.getElementById('current-photo');
const totalPhotosSpan = document.getElementById('total-photos');
const prevButton = document.querySelector('.projector-btn.prev');
const nextButton = document.querySelector('.projector-btn.next');

// Initialize gallery
function initGallery() {
    totalPhotosSpan.textContent = photos.length;
    generateSlides();
    updateSlideStates();

    prevButton.addEventListener('click', showPrevious);
    nextButton.addEventListener('click', showNext);
    slideStack.addEventListener('click', showNext);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);

    // Touch/swipe support
    let touchStartX = 0;
    slideStack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    slideStack.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) showNext();
        if (touchEndX > touchStartX + 50) showPrevious();
    });

    updateButtonStates();
}

// Generate all slide elements
function generateSlides() {
    photos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.dataset.index = index;

        const img = document.createElement('img');
        img.src = photo;
        img.alt = `Photo ${index + 1}`;

        slide.appendChild(img);
        slideStack.appendChild(slide);
    });
}

// Update slide states - stacking effect
function updateSlideStates() {
    const slides = document.querySelectorAll('.slide');

    slides.forEach((slide, index) => {
        // Remove all state classes
        slide.classList.remove('active', 'stack-1', 'stack-2', 'stack-3', 'hidden', 'exiting', 'entering');

        const diff = index - currentIndex;

        if (diff === 0) {
            // Current slide - front
            slide.classList.add('active');
        } else if (diff === 1) {
            // Next slide - slightly behind
            slide.classList.add('stack-1');
        } else if (diff === 2) {
            // Two behind
            slide.classList.add('stack-2');
        } else if (diff === 3) {
            // Three behind
            slide.classList.add('stack-3');
        } else if (diff > 3) {
            // Far behind - hidden
            slide.classList.add('hidden');
        } else {
            // Already viewed - hidden to left
            slide.classList.add('hidden');
        }
    });

    currentPhotoSpan.textContent = currentIndex + 1;
}

// Show previous photo
function showPrevious() {
    if (currentIndex <= 0 || isTransitioning) return;

    isTransitioning = true;
    currentIndex--;

    updateSlideStates();
    updateButtonStates();

    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

// Show next photo
function showNext() {
    if (currentIndex >= photos.length - 1 || isTransitioning) return;

    isTransitioning = true;

    const slides = document.querySelectorAll('.slide');
    const currentSlide = slides[currentIndex];

    // Animate current slide out to the left
    currentSlide.classList.add('exiting');

    setTimeout(() => {
        currentSlide.classList.remove('exiting');
        currentIndex++;
        updateSlideStates();
        updateButtonStates();
        isTransitioning = false;
    }, 500);
}

// Update button states
function updateButtonStates() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === photos.length - 1;
}

// Handle keyboard navigation
function handleKeyPress(e) {
    if (e.key === 'ArrowLeft') {
        showPrevious();
    } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        showNext();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);
