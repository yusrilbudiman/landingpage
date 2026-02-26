document.addEventListener("DOMContentLoaded", function () {

  const track = document.querySelector(".carousel-track");
  const items = document.querySelectorAll(".carousel-item");
  const dotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;
  const totalSlides = items.length;

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".carousel-dots span");

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  function autoSlide() {
    currentIndex++;
    if (currentIndex >= totalSlides) {
      currentIndex = 0;
    }
    updateCarousel();
  }

  setInterval(autoSlide, 4000);

});


const cards = document.querySelectorAll('.paket-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));

const venueTrack = document.querySelector('.venue-track');
const venueSlides = document.querySelectorAll('.venue-slide');

let venueIndex = 0;
let venueInterval;
let startX = 0;
let isDragging = false;

function venueWidth() {
  return venueSlides[0].offsetWidth;
}

function moveVenue() {
  venueTrack.style.transform = `translateX(-${venueIndex * venueWidth()}px)`;
}

function startAutoSlide() {
  venueInterval = setInterval(() => {
    venueIndex = (venueIndex + 1) % venueSlides.length;
    moveVenue();
  }, 3500);
}

function stopAutoSlide() {
  clearInterval(venueInterval);
}

/* AUTO START */
startAutoSlide();

/* PAUSE WHEN TAB NOT ACTIVE */
document.addEventListener('visibilitychange', () => {
  document.hidden ? stopAutoSlide() : startAutoSlide();
});

/* TOUCH / SWIPE SUPPORT */
venueTrack.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isDragging = true;
  stopAutoSlide();
});

venueTrack.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const diff = startX - e.touches[0].clientX;

  if (diff > 60) {
    venueIndex = (venueIndex + 1) % venueSlides.length;
    moveVenue();
    isDragging = false;
  }

  if (diff < -60) {
    venueIndex = (venueIndex - 1 + venueSlides.length) % venueSlides.length;
    moveVenue();
    isDragging = false;
  }
});

venueTrack.addEventListener('touchend', () => {
  isDragging = false;
  startAutoSlide();
});

window.addEventListener('resize', moveVenue);

