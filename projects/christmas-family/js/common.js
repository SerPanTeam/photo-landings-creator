// Common JavaScript functionality for all landings

document.addEventListener('DOMContentLoaded', function() {

  // Gallery Slider Functionality
  const galleryTrack = document.querySelector('.gallery-track');
  const galleryArrows = document.querySelectorAll('.gallery-arrow');

  if (galleryTrack && galleryArrows.length > 0) {
    const slides = galleryTrack.querySelectorAll('.gallery-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let slidesPerView = 3;

    // Determine slides per view based on screen size
    function getSlidesPerView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 991) return 2;
      return 3;
    }

    function updateSlider() {
      slidesPerView = getSlidesPerView();
      const maxIndex = Math.max(0, totalSlides - slidesPerView);

      // Clamp currentIndex
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      // Calculate offset - each slide is (100 / slidesPerView)% wide + gap
      const slideWidthPercent = 100 / slidesPerView;
      const gapPx = 20;
      const containerWidth = galleryTrack.parentElement.offsetWidth;
      const slideWidthPx = containerWidth / slidesPerView;
      const offsetPx = currentIndex * (slideWidthPx + gapPx);

      galleryTrack.style.transform = `translateX(-${offsetPx}px)`;

      // Update arrow visibility
      const leftArrow = document.querySelector('.gallery-arrow-left');
      const rightArrow = document.querySelector('.gallery-arrow-right');
      if (leftArrow) leftArrow.style.opacity = currentIndex === 0 ? '0.3' : '0.8';
      if (rightArrow) rightArrow.style.opacity = currentIndex >= maxIndex ? '0.3' : '0.8';
    }

    galleryArrows.forEach(arrow => {
      arrow.addEventListener('click', () => {
        const direction = arrow.dataset.direction;
        slidesPerView = getSlidesPerView();
        const maxIndex = Math.max(0, totalSlides - slidesPerView);

        if (direction === 'next' && currentIndex < maxIndex) {
          currentIndex++;
        } else if (direction === 'prev' && currentIndex > 0) {
          currentIndex--;
        }

        updateSlider();
      });
    });

    // Update on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateSlider, 100);
    });

    // Initialize
    updateSlider();
  }

  // FAQ Toggle Functionality (original faq section)
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');

    if (question && answer && toggle) {
      question.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('d-none');

        if (isOpen) {
          answer.classList.add('d-none');
          toggle.textContent = '+';
          question.setAttribute('aria-expanded', 'false');
        } else {
          answer.classList.remove('d-none');
          toggle.textContent = '−';
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // FAQ Cards Toggle Functionality (faq-cards section)
  const faqCardItems = document.querySelectorAll('.faq-cards-item');

  faqCardItems.forEach(item => {
    const question = item.querySelector('.faq-card-question');
    const answer = item.querySelector('.faq-card-answer');
    const toggleIcon = item.querySelector('.faq-card-toggle-icon');

    if (question && answer && toggleIcon) {
      question.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('d-none');

        if (isOpen) {
          answer.classList.add('d-none');
          toggleIcon.textContent = '+';
          question.setAttribute('aria-expanded', 'false');
        } else {
          answer.classList.remove('d-none');
          toggleIcon.textContent = '−';
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Lazy loading for images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    imageObserver.observe(img);
  });
});
