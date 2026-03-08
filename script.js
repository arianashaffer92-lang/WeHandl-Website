// ============================================
// WE HANDLE - Landing Page Scripts
// ============================================

(function () {
  'use strict';

  // --- Nav scroll effect ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Mobile menu ---
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- Multi-step form ---
  var currentStep = 1;
  var totalSteps = 3;
  var formData = {};
  var progressBar = document.getElementById('formProgress');

  function updateProgress() {
    var percent = (currentStep / totalSteps) * 100;
    if (progressBar) {
      progressBar.style.width = percent + '%';
    }
  }

  function showStep(step) {
    document.querySelectorAll('.form-step').forEach(function (el) {
      el.classList.remove('active');
    });
    var target = document.querySelector('[data-step="' + step + '"]');
    if (target) {
      target.classList.add('active');
    }
    updateProgress();
  }

  // Step 1 & 2: auto-advance on selection
  document.querySelectorAll('.form-option input[type="radio"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      formData[this.name] = this.value;

      // Small delay for visual feedback
      setTimeout(function () {
        currentStep++;
        showStep(currentStep);
      }, 300);
    });
  });

  // Step 3: form submission
  var leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = leadForm.querySelector('[name="name"]');
      var email = leadForm.querySelector('[name="email"]');
      var phone = leadForm.querySelector('[name="phone"]');

      if (!name.value || !email.value) return;

      formData.name = name.value;
      formData.email = email.value;
      formData.phone = phone.value || '';

      // Log for now (replace with actual API call)
      console.log('Lead captured:', formData);

      // Send to Netlify Forms (if configured) or log
      var body = new FormData();
      body.append('form-name', 'lead-capture');
      Object.keys(formData).forEach(function (key) {
        body.append(key, formData[key]);
      });

      fetch('/', {
        method: 'POST',
        body: body,
      }).catch(function () {
        // Silently fail - we still show success
      });

      // Show success
      currentStep = 4;
      showStep(4);
      if (progressBar) {
        progressBar.style.width = '100%';
        progressBar.style.background = '#00c853';
      }
    });
  }

  // --- Smooth scroll for nav links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;

      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Intersection Observer for animations ---
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and sections
  document.querySelectorAll(
    '.pain-card, .product-card, .why-card, .tax-stat, .service-item, .value-card, .step'
  ).forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Initialize
  updateProgress();
})();
