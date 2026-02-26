document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.paket-track');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');

  let index = 0;
  let startX = 0;
  let isDragging = false;

  function getCardWidth() {
    const card = document.querySelector('.paket-card');
    return card ? card.offsetWidth : 0;
  }

  function moveCarousel() {
    track.style.transform = `translateX(-${index * getCardWidth()}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if (index < track.children.length - 1) {
      index++;
      moveCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      moveCarousel();
    }
  });

  /* ===== Swipe Mobile ===== */
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener('touchmove', e => {
    if (!isDragging) return;

    const diff = startX - e.touches[0].clientX;

    if (diff > 60 && index < track.children.length - 1) {
      index++;
      moveCarousel();
      isDragging = false;
    }

    if (diff < -60 && index > 0) {
      index--;
      moveCarousel();
      isDragging = false;
    }
  });

  track.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('resize', moveCarousel);
});
