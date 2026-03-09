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
  ========================= */
  const carouselTrack = document.querySelector(".carousel-track");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const carouselDots = document.querySelectorAll(".carousel-dots .dot");

  let currentIndex = 0;
  const totalSlides = carouselItems.length;

  function updateCarousel() {
    if (!carouselTrack) return;

    carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    carouselDots.forEach(dot => dot.classList.remove("active"));
    if (carouselDots[currentIndex]) {
      carouselDots[currentIndex].classList.add("active");
    }
  }

  carouselDots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });
  });

  function autoSlide() {
    if (!carouselItems.length) return;
    currentIndex++;
    if (currentIndex >= totalSlides) currentIndex = 0;
    updateCarousel();
  }

  if (carouselItems.length) {
    setInterval(autoSlide, 4000);
  }

  /* =====================================================
     OBSERVER PAKET CARD
  ===================================================== */
  const cards = document.querySelectorAll(".paket-card");

  if (cards.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
  }

  /* =====================================================
     VENUE SLIDER MANUAL BUTTON
     (tanpa auto-slide)
  ===================================================== */
  const venueTrack = document.querySelector(".venue-track");
  const venueSlides = document.querySelectorAll(".venue-slide");
  const venueNextBtn = document.querySelector(".venue-btn.next");
  const venuePrevBtn = document.querySelector(".venue-btn.prev");

  let venueIndex = 0;
  const totalVenueSlides = venueSlides.length;

  function updateVenueSlider() {
    if (!venueTrack || !venueSlides.length) return;
    venueTrack.style.transform = `translateX(-${venueIndex * 100}%)`;
  }

  if (venueNextBtn && venueTrack && venueSlides.length) {
    venueNextBtn.addEventListener("click", () => {
      venueIndex = (venueIndex + 1) % totalVenueSlides;
      updateVenueSlider();
    });
  }

  if (venuePrevBtn && venueTrack && venueSlides.length) {
    venuePrevBtn.addEventListener("click", () => {
      venueIndex = (venueIndex - 1 + totalVenueSlides) % totalVenueSlides;
      updateVenueSlider();
    });
  }

});