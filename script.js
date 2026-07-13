document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Scroll Reveal Animation ──
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ── 2. Hero Slider (index.html only) ──
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroDots');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length > 0 && dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = index;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
      resetInterval();
    }

    function nextSlide() {
      goToSlide((currentSlide + 1) % slides.length);
    }

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 6000);
    }

    resetInterval();
  }

  // ── 3. Gallery Filter Logic ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryTiles = document.querySelectorAll('.gallery-tile');

  if (filterBtns.length > 0 && galleryTiles.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Reset all buttons
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.removeAttribute('style');
        });

        // Activate clicked
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryTiles.forEach(tile => {
          if (filterValue === 'all' || tile.getAttribute('data-category') === filterValue) {
            tile.style.display = 'block';
          } else {
            tile.style.display = 'none';
          }
        });
      });
    });
  }

  // ── 4. Universal Lightbox (Press & Gallery) ──
  const lightboxTriggers = document.querySelectorAll('.press-card, .gallery-tile');
  if (lightboxTriggers.length > 0) {
    // Build lightbox DOM
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <div class="lightbox-content">
        <img src="" alt="Enlarged View">
      </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-content img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    lightboxTriggers.forEach(card => {
      card.addEventListener('click', () => {
        if (card.querySelector('iframe')) return; // Ignore video/iframe cards
        
        const img = card.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Enlarged View';
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
});
