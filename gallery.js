// Vintage Slide Projector Gallery

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
    // Set total photos
    totalPhotosSpan.textContent = photos.length;

    // Generate all slides
    generateSlides();

    // Set initial state
    updateSlideStates();

    // Add event listeners
    prevButton.addEventListener('click', showPrevious);
    nextButton.addEventListener('click', showNext);

    // Click on slide stack to advance
    slideStack.addEventListener('click', showNext);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slideStack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slideStack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next photo
            showNext();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous photo
            showPrevious();
        }
    }

    // Update button states
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

// Update slide states based on current index
function updateSlideStates() {
    const slides = document.querySelectorAll('.slide');

    slides.forEach((slide, index) => {
        // Remove all state classes
        slide.classList.remove('active', 'prev', 'behind', 'exiting', 'entering');

        if (index === currentIndex) {
            slide.classList.add('active');
        } else if (index === currentIndex - 1) {
            slide.classList.add('prev');
        } else if (index < currentIndex) {
            slide.classList.add('prev');
            slide.style.opacity = '0';
        } else {
            slide.classList.add('behind');
        }
    });

    // Update counter
    currentPhotoSpan.textContent = currentIndex + 1;
}

// Show previous photo with projector animation
function showPrevious() {
    if (currentIndex <= 0 || isTransitioning) return;

    isTransitioning = true;
    addClickEffect();

    const slides = document.querySelectorAll('.slide');
    const currentSlide = slides[currentIndex];
    const prevSlide = slides[currentIndex - 1];

    // Current slide moves back into the stack
    currentSlide.classList.remove('active');
    currentSlide.classList.add('behind');

    // Previous slide comes back
    prevSlide.style.opacity = '';
    prevSlide.classList.remove('prev');
    prevSlide.classList.add('entering');

    currentIndex--;

    setTimeout(() => {
        prevSlide.classList.remove('entering');
        prevSlide.classList.add('active');
        updateSlideStates();
        updateButtonStates();
        isTransitioning = false;
    }, 600);
}

// Show next photo with projector animation
function showNext() {
    if (currentIndex >= photos.length - 1 || isTransitioning) return;

    isTransitioning = true;
    addClickEffect();

    const slides = document.querySelectorAll('.slide');
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[currentIndex + 1];

    // Current slide exits to the left (like being pushed off)
    currentSlide.classList.remove('active');
    currentSlide.classList.add('exiting');

    // Next slide comes in
    nextSlide.classList.remove('behind');
    nextSlide.classList.add('entering');

    currentIndex++;

    setTimeout(() => {
        currentSlide.classList.remove('exiting');
        currentSlide.classList.add('prev');
        nextSlide.classList.remove('entering');
        nextSlide.classList.add('active');
        updateSlideStates();
        updateButtonStates();
        isTransitioning = false;
    }, 600);
}

// Add visual click effect
function addClickEffect() {
    slideStack.classList.add('clicking');
    setTimeout(() => {
        slideStack.classList.remove('clicking');
    }, 300);
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
