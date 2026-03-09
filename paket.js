document.addEventListener('DOMContentLoaded', () => {

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

  const track = document.querySelector('.paket-track');
  const nextBtns = document.querySelectorAll('.carousel-btn.next');
  const prevBtns = document.querySelectorAll('.carousel-btn.prev');

  let index = 0;
  let startX = 0;
  let isDragging = false;

  if (!track) return;

  function getCardWidth() {
    const card = document.querySelector('.paket-card');
    return card ? card.offsetWidth : 0;
  }

  function clampIndex() {
    const maxIndex = track.children.length - 1;
    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;
  }

  function moveCarousel() {
    clampIndex();
    track.style.transform = `translateX(-${index * getCardWidth()}px)`;
  }

  function goNext() {
    if (index < track.children.length - 1) {
      index++;
      moveCarousel();
    }
  }

  function goPrev() {
    if (index > 0) {
      index--;
      moveCarousel();
    }
  }

  nextBtns.forEach(btn => btn.addEventListener('click', goNext));
  prevBtns.forEach(btn => btn.addEventListener('click', goPrev));

  /* ===== Swipe Mobile ===== */
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    const diff = startX - e.touches[0].clientX;

    if (diff > 60) {
      goNext();
      isDragging = false;
    }

    if (diff < -60) {
      goPrev();
      isDragging = false;
    }
  }, { passive: true });

  track.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('resize', moveCarousel);

  // posisi awal
  moveCarousel();
});