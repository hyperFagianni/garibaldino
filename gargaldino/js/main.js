/* ============================================================
   GARIBALDINO — MAIN JAVASCRIPT
   Preloader · Navbar · Scroll · Animations · Parallax
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────
   PRELOADER
   ───────────────────────────────────────────── */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const hide = () => preloader.classList.add('hidden');

  // Minimum display time: 1400ms, then wait for window load
  const minTimer = new Promise(res => setTimeout(res, 1400));
  const loaded   = new Promise(res => {
    if (document.readyState === 'complete') res();
    else window.addEventListener('load', res);
  });

  Promise.all([minTimer, loaded]).then(() => {
    hide();
    document.getElementById('home')?.classList.add('loaded');
  });
}

/* ─────────────────────────────────────────────
   SCROLL PROGRESS BAR
   ───────────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  const update = () => {
    const scrolled  = document.documentElement.scrollTop;
    const total     = document.documentElement.scrollHeight - window.innerHeight;
    const pct       = total > 0 ? (scrolled / total) * 100 : 0;
    bar.style.width = pct + '%';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ─────────────────────────────────────────────
   NAVBAR
   ───────────────────────────────────────────── */
function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const burger  = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');
  if (!navbar) return;

  // Scroll behavior
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('active');
      burger.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on mobile link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on overlay click
    mobileMenu.addEventListener('click', e => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Highlight active nav link based on scroll
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const observeSection = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(s => observeSection.observe(s));
}

/* ─────────────────────────────────────────────
   SMOOTH SCROLL (anchor links)
   ───────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
      const offset = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
}

/* ─────────────────────────────────────────────
   BACK TO TOP
   ───────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL (IntersectionObserver)
   ───────────────────────────────────────────── */
function initScrollReveal() {
  const selectors = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale', '.stagger'];
  const elements  = document.querySelectorAll(selectors.join(','));

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────
   HERO PARALLAX
   ───────────────────────────────────────────── */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ─────────────────────────────────────────────
   MAGNETIC BUTTONS
   ───────────────────────────────────────────── */
function initMagneticButtons() {
  if (window.innerWidth < 1024) return; // Skip on mobile

  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect   = btn.getBoundingClientRect();
      const x      = e.clientX - rect.left - rect.width  / 2;
      const y      = e.clientY - rect.top  - rect.height / 2;
      const factor = 0.25;
      btn.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTERS
   ───────────────────────────────────────────── */
function animateCounter(el, target, duration = 1800) {
  const start     = performance.now();
  const startVal  = 0;
  const easeOut   = t => 1 - Math.pow(1 - t, 3);

  const step = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const current  = Math.round(startVal + (target - startVal) * easeOut(progress));
    el.textContent = current.toLocaleString('it-IT');

    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('it-IT');
  };

  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const target = parseFloat(entry.target.dataset.counter);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────
   HERO SCROLL INDICATOR
   ───────────────────────────────────────────── */
function initHeroScroll() {
  const scrollEl = document.querySelector('.hero-scroll');
  if (!scrollEl) return;

  scrollEl.addEventListener('click', () => {
    const next = document.getElementById('experience');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────────
   HIGHLIGHT CURRENT DAY IN ORARI
   ───────────────────────────────────────────── */
function initCurrentDay() {
  const dayNames  = ['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
  const today     = dayNames[new Date().getDay()];
  const orariRows = document.querySelectorAll('.orari-item');

  orariRows.forEach(row => {
    const dayEl = row.querySelector('.orari-day');
    if (dayEl && dayEl.textContent.toLowerCase().trim() === today) {
      row.classList.add('orari-today');
    }
  });
}

/* ─────────────────────────────────────────────
   INIT ALL
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initScrollProgress();
  initNavbar();
  initSmoothScroll();
  initBackToTop();
  initScrollReveal();
  initParallax();
  initMagneticButtons();
  initCounters();
  initHeroScroll();
  initCurrentDay();
});
