// Stacking Slider Gallery

// List of all photos (in order) - compressed WebP format
const photos = [
    'photos/compressed/1_hawaii.webp',
    'photos/compressed/2_engagement.webp',
    'photos/compressed/3_dipsea.webp',
    'photos/compressed/4_Port.webp',
    'photos/compressed/5_tam.webp',
    'photos/compressed/6_lp.webp',
    'photos/compressed/7_tahoe.webp',
    'photos/compressed/8_dc.webp',
    'photos/compressed/9_chicago.webp',
    'photos/compressed/10_waterfall.webp',
    'photos/compressed/11_china.webp',
    'photos/compressed/12_spruce.webp',
    'photos/compressed/13_views.webp',
    'photos/compressed/14_bryce.webp',
    'photos/compressed/15_bluff.webp',
    'photos/compressed/16_lost.webp',
    'photos/compressed/17_ocean.webp',
    'photos/compressed/18_taos.webp',
    'photos/compressed/19_westpoint.webp'
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

// Update slide states - stacking effect with slivers on both sides
function updateSlideStates() {
    const slides = document.querySelectorAll('.slide');

    slides.forEach((slide, index) => {
        // Remove all state classes
        slide.classList.remove('active', 'stack-1', 'stack-2', 'stack-3', 'prev-1', 'prev-2', 'prev-3', 'hidden', 'exiting', 'entering');

        const diff = index - currentIndex;

        if (diff === 0) {
            // Current slide - front
            slide.classList.add('active');
        } else if (diff === 1) {
            // Next slide - peeking on right
            slide.classList.add('stack-1');
        } else if (diff === 2) {
            slide.classList.add('stack-2');
        } else if (diff === 3) {
            slide.classList.add('stack-3');
        } else if (diff === -1) {
            // Previous slide - peeking on left
            slide.classList.add('prev-1');
        } else if (diff === -2) {
            slide.classList.add('prev-2');
        } else if (diff === -3) {
            slide.classList.add('prev-3');
        } else {
            // Far away - hidden
            slide.classList.add('hidden');
        }
    });

    currentPhotoSpan.textContent = currentIndex + 1;
}

// Show previous photo (loops infinitely)
function showPrevious() {
    if (isTransitioning) return;

    isTransitioning = true;
    // Loop back to end if at start
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;

    updateSlideStates();
    updateButtonStates();

    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

// Show next photo (loops infinitely)
function showNext() {
    if (isTransitioning) return;

    isTransitioning = true;

    const slides = document.querySelectorAll('.slide');
    const currentSlide = slides[currentIndex];

    // Animate current slide out to the left
    currentSlide.classList.add('exiting');

    setTimeout(() => {
        currentSlide.classList.remove('exiting');
        // Loop back to start if at end
        currentIndex = (currentIndex + 1) % photos.length;
        updateSlideStates();
        updateButtonStates();
        isTransitioning = false;
    }, 500);
}

// Update button states (buttons always enabled for infinite loop)
function updateButtonStates() {
    prevButton.disabled = false;
    nextButton.disabled = false;
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
