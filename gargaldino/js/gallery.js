/* ============================================================
   GARIBALDINO — GALLERY JS
   Masonry layout · Lightbox · Keyboard navigation
   ============================================================ */

'use strict';

const galleryImages = [
  {
    src:    'https://images.unsplash.com/photo-1655917080896-95458e753f03?w=800&q=85&auto=format&fit=crop',
    thumb:  'https://images.unsplash.com/photo-1655917080896-95458e753f03?w=400&q=80&auto=format&fit=crop',
    alt:    'Bar Interior',
    aspect: '3/4'
  },
  {
    src:    'https://images.unsplash.com/photo-1586338211598-e2d64cf97e28?w=800&q=85&auto=format&fit=crop',
    thumb:  'https://images.unsplash.com/photo-1586338211598-e2d64cf97e28?w=400&q=80&auto=format&fit=crop',
    alt:    'Cocktail Premium',
    aspect: '1/1'
  },
  {
    src:    'https://images.unsplash.com/photo-1615887023520-e20970765ef8?w=800&q=85&auto=format&fit=crop',
    thumb:  'https://images.unsplash.com/photo-1615887023520-e20970765ef8?w=400&q=80&auto=format&fit=crop',
    alt:    'Bartender',
    aspect: '4/5'
  },
  {
    src:    'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=85&auto=format&fit=crop',
    thumb:  'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&q=80&auto=format&fit=crop',
    alt:    'Smash Burger Gourmet',
    aspect: '3/4'
  },
  {
    src:    'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?w=800&q=85&auto=format&fit=crop',
    thumb:  'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?w=400&q=80&auto=format&fit=crop',
    alt:    'Craft Cocktail',
    aspect: '1/1'
  },
  {
    src:    'https://images.unsplash.com/photo-1529060532150-a0c935a6d6e5?w=800&q=85&auto=format&fit=crop',
    thumb:  'https://images.unsplash.com/photo-1529060532150-a0c935a6d6e5?w=400&q=80&auto=format&fit=crop',
    alt:    'Cantina Vini',
    aspect: '4/5'
  },
  {
    src:    'https://images.pexels.com/photos/1327393/pexels-photo-1327393.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumb:  'https://images.pexels.com/photos/1327393/pexels-photo-1327393.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt:    'Atmosfera Serale',
    aspect: '3/4'
  },
  {
    src:    'https://images.unsplash.com/photo-1613577813834-5dbb5fd8ada6?w=800&q=85&auto=format&fit=crop',
    thumb:  'https://images.unsplash.com/photo-1613577813834-5dbb5fd8ada6?w=400&q=80&auto=format&fit=crop',
    alt:    'Dark Bar Interior',
    aspect: '1/1'
  },
];

let currentIndex = 0;

/* ─────────────────────────────────────────────
   BUILD GALLERY
   ───────────────────────────────────────────── */
function buildGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  galleryImages.forEach((img, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item reveal';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `Apri immagine: ${img.alt}`);
    item.dataset.index = i;

    // Set aspect ratio from data
    const aspectClass = img.aspect === '3/4' ? 'aspect-3-4' :
                        img.aspect === '1/1' ? 'aspect-1-1' :
                        img.aspect === '4/5' ? 'aspect-4-5' : 'aspect-3-4';

    item.innerHTML = `
      <img
        class="gallery-item-img ${aspectClass}"
        src="${img.thumb}"
        alt="${img.alt}"
        loading="lazy"
        decoding="async"
        style="width:100%;object-fit:cover;"
      />
      <div class="gallery-item-hover">
        <span class="gallery-open-label">Apri</span>
      </div>
    `;

    item.addEventListener('click', () => openLightbox(i));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(i);
    });

    grid.appendChild(item);
  });
}

/* ─────────────────────────────────────────────
   LIGHTBOX
   ───────────────────────────────────────────── */
function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const img      = document.getElementById('lightbox-img');
  if (!lightbox || !img) return;

  currentIndex = index;
  const entry  = galleryImages[index];
  img.src      = entry.src;
  img.alt      = entry.alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  lightbox.focus();
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  const total = galleryImages.length;
  currentIndex = (currentIndex + direction + total) % total;
  const img   = document.getElementById('lightbox-img');
  if (!img) return;

  img.style.opacity = '0';
  img.style.transform = `translateX(${direction > 0 ? '-20px' : '20px'})`;

  setTimeout(() => {
    const entry = galleryImages[currentIndex];
    img.src     = entry.src;
    img.alt     = entry.alt;
    img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    img.style.opacity = '1';
    img.style.transform = 'translateX(0)';
  }, 200);
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn  = document.querySelector('.lightbox-prev');
  const nextBtn  = document.querySelector('.lightbox-next');
  if (!lightbox) return;

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn)  prevBtn.addEventListener('click', () => navigateLightbox(-1));
  if (nextBtn)  nextBtn.addEventListener('click', () => navigateLightbox( 1));

  // Close on background click
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox( 1);
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigateLightbox(diff > 0 ? 1 : -1);
  }, { passive: true });
}

/* ─────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildGallery();
  initLightbox();
});
