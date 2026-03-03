document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     NAVBAR MOBILE TOGGLE
  ========================= */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => navLinks.classList.remove("show"));
    });
  }

  /* =========================
     EVENT CAROUSEL
     (Tidak create dot lagi karena HTML sudah ada dot)
  ========================= */
  const track = document.querySelector(".carousel-track");
  const items = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".carousel-dots .dot");

  let currentIndex = 0;
  const totalSlides = items.length;

  function updateCarousel() {
    if (!track) return;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentIndex]) dots[currentIndex].classList.add("active");
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });
  });

  function autoSlide() {
    currentIndex++;
    if (currentIndex >= totalSlides) currentIndex = 0;
    updateCarousel();
  }

  setInterval(autoSlide, 4000);

});


/* =====================================================
   Observer Paket Card (tetap ada seperti JS kamu)
   tapi aman walau tidak ada .paket-card di landing
===================================================== */
const cards = document.querySelectorAll('.paket-card');

if (cards.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
}


/* =====================================================
   VENUE SLIDER (tetap seperti JS kamu)
===================================================== */
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
  if (!venueTrack || !venueSlides.length) return;
  venueTrack.style.transform = `translateX(-${venueIndex * venueWidth()}px)`;
}

function startAutoSlide() {
  if (!venueSlides.length) return;
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
if (venueTrack) {
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
}

window.addEventListener('resize', moveVenue);