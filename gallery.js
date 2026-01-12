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
    // Removed slideStack click to advance - now handled by lightbox

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

// Update slide states - stacking effect with slivers on both sides (circular)
function updateSlideStates() {
    const slides = document.querySelectorAll('.slide');
    const total = photos.length;

    slides.forEach((slide, index) => {
        // Remove all state classes
        slide.classList.remove('active', 'stack-1', 'stack-2', 'stack-3', 'prev-1', 'prev-2', 'prev-3', 'hidden', 'exiting', 'entering');

        // Calculate circular distance
        let diff = index - currentIndex;

        // Wrap around for circular effect
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;

        if (diff === 0) {
            // Current slide - front
            slide.classList.add('active');
        } else if (diff === 1 || (currentIndex === total - 1 && index === 0)) {
            // Next slide - peeking on right
            slide.classList.add('stack-1');
        } else if (diff === 2 || (currentIndex === total - 1 && index === 1) || (currentIndex === total - 2 && index === 0)) {
            slide.classList.add('stack-2');
        } else if (diff === 3 || (currentIndex === total - 1 && index === 2) || (currentIndex === total - 2 && index === 1) || (currentIndex === total - 3 && index === 0)) {
            slide.classList.add('stack-3');
        } else if (diff === -1 || (currentIndex === 0 && index === total - 1)) {
            // Previous slide - peeking on left
            slide.classList.add('prev-1');
        } else if (diff === -2 || (currentIndex === 0 && index === total - 2) || (currentIndex === 1 && index === total - 1)) {
            slide.classList.add('prev-2');
        } else if (diff === -3 || (currentIndex === 0 && index === total - 3) || (currentIndex === 1 && index === total - 2) || (currentIndex === 2 && index === total - 1)) {
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

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCurrentSpan = document.getElementById('lightbox-current');
const lightboxTotalSpan = document.getElementById('lightbox-total');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let lightboxIndex = 0;

function openLightbox(index) {
    lightboxIndex = index;
    lightboxImg.src = photos[lightboxIndex];
    lightboxCurrentSpan.textContent = lightboxIndex + 1;
    lightboxTotalSpan.textContent = photos.length;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function lightboxShowNext() {
    lightboxIndex = (lightboxIndex + 1) % photos.length;
    lightboxImg.src = photos[lightboxIndex];
    lightboxCurrentSpan.textContent = lightboxIndex + 1;
}

function lightboxShowPrev() {
    lightboxIndex = (lightboxIndex - 1 + photos.length) % photos.length;
    lightboxImg.src = photos[lightboxIndex];
    lightboxCurrentSpan.textContent = lightboxIndex + 1;
}

// Lightbox event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', lightboxShowNext);
lightboxPrev.addEventListener('click', lightboxShowPrev);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Lightbox keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowRight') {
        lightboxShowNext();
    } else if (e.key === 'ArrowLeft') {
        lightboxShowPrev();
    }
});

// Open lightbox on slide click (modify existing click behavior)
function initLightboxClick() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.addEventListener('click', (e) => {
            // Only open lightbox if clicking on active slide
            if (slide.classList.contains('active')) {
                e.stopPropagation();
                openLightbox(index);
            }
        });
    });
}

// Lightbox touch/swipe support
let lightboxTouchStartX = 0;
let lightboxTouchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    lightboxTouchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    lightboxTouchEndX = e.changedTouches[0].screenX;
    handleLightboxSwipe();
}, { passive: true });

function handleLightboxSwipe() {
    const swipeThreshold = 50;
    const diff = lightboxTouchEndX - lightboxTouchStartX;

    if (diff < -swipeThreshold) {
        // Swiped left - show next
        lightboxShowNext();
    } else if (diff > swipeThreshold) {
        // Swiped right - show previous
        lightboxShowPrev();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initLightboxClick();
});
