/* ============================================================
   GARIBALDINO — MENU JS
   Full filterable menu · Cocktail cards · Cucina · Vini
   ============================================================ */

'use strict';

/* ═══════════════════════════════════════════
   FULL MENU SECTION
   Renders all items and handles filter + search
   ═══════════════════════════════════════════ */
function buildFullMenu() {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  const allItems = [];

  // ── Cocktails ──
  if (typeof cocktailsData !== 'undefined') {
    cocktailsData.forEach(c => {
      allItems.push({
        name: c.name,
        desc: c.desc,
        price: c.price,
        // Analcolici nel tab dedicato, tutti gli altri sotto 'cocktail'
        cat: c.style === 'analcolici' ? 'analcolici' : 'cocktail',
        subCat: c.style,
        tag: c.tag || 'Cocktail'
      });
    });
  }

  // ── Aperitivi in bottiglia (analcolici) ──
  if (typeof aperitiviBottigliaData !== 'undefined') {
    aperitiviBottigliaData.forEach(a => {
      allItems.push({ name: a.name, desc: a.desc, price: a.price, cat: 'analcolici', subCat: 'aperitivi', tag: 'Aperitivo' });
    });
  }

  // ── Gin ──
  if (typeof ginData !== 'undefined') {
    ginData.forEach(g => {
      allItems.push({ name: g.name, desc: g.desc, price: g.price, cat: 'gin', subCat: 'gin', tag: 'Gin' });
    });
  }

  // ── Birre ──
  if (typeof birreData !== 'undefined') {
    birreData.forEach(b => {
      allItems.push({ name: b.name, desc: b.desc, price: b.price, cat: 'birre', subCat: 'birre', tag: 'Birra' });
    });
  }

  // ── Analcolici ──
  if (typeof bibiteData !== 'undefined') {
    bibiteData.forEach(b => {
      allItems.push({ name: b.name, desc: b.desc, price: b.price, cat: 'bibite', subCat: 'bibite', tag: 'Bibita' });
    });
  }

  // ── Food ──
  if (typeof foodData !== 'undefined') {
    const catMap = {
      bruschette: 'Bruschette',
      taglieri:   'Tagliere',
      piadine:    'Piadina',
      hotdog:     'Hot Dog',
      burger:     'Smash Burger',
      sandwich:   'Sandwich',
      fritti:     'Fritto',
      dolci:      'Dolce'
    };
    Object.entries(foodData).forEach(([key, items]) => {
      items.forEach(item => {
        allItems.push({
          name: item.name,
          desc: item.desc,
          price: item.price,
          cat: key,
          subCat: key,
          tag: catMap[key] || key
        });
      });
    });
  }

  // ── Vini ──
  if (typeof wineData !== 'undefined') {
    const wineMap = { bianchi: 'Vino Bianco', rossi: 'Vino Rosso', bollicine: 'Bollicine', rosati: 'Rosato', dessert: 'Dessert' };
    Object.entries(wineData).forEach(([key, items]) => {
      items.forEach(item => {
        const price = item.price_bottle || item.price_glass || null;
        if (price) {
          allItems.push({
            name: item.name + (item.region ? ' — ' + item.region : ''),
            desc: item.note || '',
            price: price,
            cat: 'vini',
            subCat: key,
            tag: wineMap[key] || 'Vino'
          });
        }
      });
    });
  }

  // Render items
  const renderItems = (items) => {
    grid.innerHTML = '';
    if (!items.length) {
      grid.innerHTML = '<p class="menu-no-results" style="display:block">Nessun risultato per questa ricerca.</p>';
      return;
    }
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'menu-item filter-item';
      el.dataset.cat = item.cat;

      const priceStr = item.price != null
        ? `<span class="menu-item-price">${item.price.toLocaleString('it-IT', { minimumFractionDigits: 0 })} <span>€</span></span>`
        : '';

      el.innerHTML = `
        <div class="menu-item-info">
          <div class="menu-item-name">${escapeHtml(item.name)}</div>
          ${item.desc ? `<div class="menu-item-desc">${escapeHtml(item.desc)}</div>` : ''}
          ${item.tag ? `<span class="menu-item-tag">${escapeHtml(item.tag)}</span>` : ''}
        </div>
        ${priceStr}
      `;
      grid.appendChild(el);
    });
  };

  renderItems(allItems);

  // ── Tab filtering ──
  const tabs = document.querySelectorAll('.menu-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter  = tab.dataset.filter;
      const search  = document.getElementById('menu-search')?.value.toLowerCase() || '';
      const visible = allItems.filter(item => {
        const matchCat    = filter === 'all' || item.cat === filter;
        const matchSearch = !search || item.name.toLowerCase().includes(search) || item.desc.toLowerCase().includes(search);
        return matchCat && matchSearch;
      });
      renderItems(visible);
    });
  });

  // ── Live search ──
  const searchInput = document.getElementById('menu-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const search    = searchInput.value.toLowerCase();
      const activeTab = document.querySelector('.menu-tab.active');
      const filter    = activeTab ? activeTab.dataset.filter : 'all';
      const visible   = allItems.filter(item => {
        const matchCat    = filter === 'all' || item.cat === filter;
        const matchSearch = !search || item.name.toLowerCase().includes(search) || item.desc.toLowerCase().includes(search);
        return matchCat && matchSearch;
      });
      renderItems(visible);
    });
  }
}

/* ═══════════════════════════════════════════
   COCKTAIL PREMIUM SECTION
   Glass cards · Radial gradient hover · SVG icon
   ═══════════════════════════════════════════ */

const MARTINI_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
  fill="none" stroke="currentColor" stroke-width="1.5"
  stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 22h8M12 11v11M3 3l9 9 9-9H3z"/>
</svg>`;

function buildCocktailSection() {
  const grid = document.getElementById('cocktail-cards-grid');
  if (!grid || typeof cocktailsData === 'undefined') return;

  // Exclude analcolici from premium section
  const premiumCocktails = cocktailsData.filter(c => c.style !== 'analcolici');

  const renderCocktails = (items) => {
    grid.innerHTML = '';
    items.forEach(c => {
      const card = document.createElement('div');
      card.className = 'cocktail-card reveal';
      card.dataset.style = c.style;
      card.innerHTML = `
        <div class="cocktail-card-glow"></div>
        <div class="cocktail-card-header">
          <span class="cocktail-card-tag">${escapeHtml(c.tag)}</span>
          <span class="cocktail-icon">${MARTINI_ICON}</span>
        </div>
        <div class="cocktail-card-name">${escapeHtml(c.name)}</div>
        <div class="cocktail-card-desc">${escapeHtml(c.desc)}</div>
        <div class="cocktail-card-footer">
          <div class="cocktail-card-price">${c.price}<span> €</span></div>
        </div>
      `;

      // Mouse tracking for radial gradient
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top)  / rect.height) * 100;
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
      });

      grid.appendChild(card);
    });
    triggerReveal(grid.querySelectorAll('.reveal'));
  };

  renderCocktails(premiumCocktails);

  // Filter buttons
  const filterBtns = document.querySelectorAll('.cocktail-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter  = btn.dataset.style;
      const visible = filter === 'all'
        ? premiumCocktails
        : premiumCocktails.filter(c => c.style === filter);
      renderCocktails(visible);
    });
  });
}

/* ═══════════════════════════════════════════
   CUCINA SECTION
   Split layout: sticky image left · list right
   ═══════════════════════════════════════════ */

const CUCINA_META = {
  bruschette: {
    label: 'Warm-Up Bites', subtitle: "Bruschette di pane casereccio — L'opening perfetto!",
    img: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&q=85&auto=format&fit=crop'
  },
  taglieri: {
    label: 'Vinyl Bites', subtitle: 'Taglieri da gustare in loop!',
    img: 'https://images.unsplash.com/photo-1544025162-d76cedef895c?w=600&q=85&auto=format&fit=crop'
  },
  piadine: {
    label: 'Street Beats', subtitle: 'Piadine del Direttore',
    img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=85&auto=format&fit=crop'
  },
  hotdog: {
    label: 'Rolling Beats', subtitle: 'Hot Dogs del Direttore',
    img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=85&auto=format&fit=crop'
  },
  burger: {
    label: 'Smash Burger Drop', subtitle: 'Con Bun artigianale — Bassi potenti, sapori esplosivi!',
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&q=85&auto=format&fit=crop'
  },
  sandwich: {
    label: 'Naked Sandwich', subtitle: 'Con pane ai cereali — Mix di sapori in perfetta armonia!',
    img: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=600&q=85&auto=format&fit=crop'
  },
  fritti: {
    label: 'Fritto Groove', subtitle: 'Crunchy vibes per veri clubber!',
    img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=85&auto=format&fit=crop'
  },
  dolci: {
    label: 'Corner Sweet Vinyl', subtitle: 'Dolci note per il gran finale!',
    img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=85&auto=format&fit=crop'
  },
};

const UTENSILS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
  fill="none" stroke="currentColor" stroke-width="1.5"
  stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
</svg>`;

function buildCucinaSection() {
  const container = document.getElementById('cucina-container');
  if (!container || typeof foodData === 'undefined') return;

  // Default active category
  let activeKey = 'burger';

  // Build container structure (split layout)
  container.innerHTML = `
    <div class="cucina-split">
      <div class="cucina-sticky-col">
        <div class="cucina-sticky-img" id="cucina-img-wrap">
          <img id="cucina-cat-img" src="" alt="" loading="lazy" />
          <div class="cucina-sticky-label">
            <span class="cucina-sticky-icon">${UTENSILS_ICON}</span>
            <span class="cucina-sticky-cat" id="cucina-cat-title"></span>
          </div>
        </div>
      </div>
      <div class="cucina-list-col" id="cucina-list-area">
        <div class="cucina-list" id="cucina-items-list"></div>
      </div>
    </div>
  `;

  const imgEl    = document.getElementById('cucina-cat-img');
  const titleEl  = document.getElementById('cucina-cat-title');
  const listEl   = document.getElementById('cucina-items-list');

  const renderCategory = (key) => {
    const meta  = CUCINA_META[key];
    const items = foodData[key];
    if (!meta || !items) return;
    activeKey = key;

    // Update image + title
    imgEl.src = meta.img;
    imgEl.alt = meta.label;
    titleEl.textContent = meta.label;

    // Update items list
    listEl.innerHTML = items.map(item => `
      <div class="cucina-item">
        <div class="cucina-item-info">
          <div class="cucina-item-name">${escapeHtml(item.name)}</div>
          <div class="cucina-item-desc">${escapeHtml(item.desc)}</div>
          ${item.note ? `<div class="cucina-item-note">${escapeHtml(item.note)}</div>` : ''}
        </div>
        <div class="cucina-item-price">${item.price != null ? item.price + ' €' : ''}</div>
      </div>
    `).join('');
  };

  renderCategory(activeKey);

  // Category buttons
  const catBtns = document.querySelectorAll('.cucina-cat-btn');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCategory(btn.dataset.cat);
    });
  });

  // Activate default button
  const defaultBtn = document.querySelector(`.cucina-cat-btn[data-cat="${activeKey}"]`);
  if (defaultBtn) defaultBtn.classList.add('active');
}

/* ═══════════════════════════════════════════
   VINI (WINE) SECTION
   Horizontal glass cards · Wine SVG icon
   ═══════════════════════════════════════════ */

const WINE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
  fill="none" stroke="currentColor" stroke-width="1.5"
  stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 22h8M7 10h10M12 15v7M5 3h14l-1 7a7 7 0 01-14 0L5 3z"/>
</svg>`;

function buildWineSection() {
  const tabs   = document.querySelectorAll('.vini-tab');
  const panels = document.querySelectorAll('.vini-panel');
  if (!tabs.length || typeof wineData === 'undefined') return;

  const renderPanel = (panelEl, key) => {
    const items = wineData[key];
    if (!items) return;

    panelEl.innerHTML = `
      <div class="vini-grid">
        ${items.map(w => {
          const mainPrice = w.price_bottle != null
            ? `<div class="wine-card-price-main">€ ${w.price_bottle}</div>`
            : '';
          const glassStr = w.price_glass != null
            ? `<div class="wine-card-price-glass">Calice € ${w.price_glass}</div>`
            : (w.note ? `<div class="wine-card-note">${escapeHtml(w.note)}</div>` : '');
          return `
            <div class="wine-card">
              <span class="wine-card-icon">${WINE_ICON}</span>
              <div class="wine-card-info">
                <div class="wine-card-name">${escapeHtml(w.name)}</div>
                ${w.region ? `<div class="wine-card-region">${escapeHtml(w.region)}</div>` : ''}
              </div>
              <div class="wine-card-prices">
                ${mainPrice}
                ${glassStr}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  };

  // Render all panels on init
  panels.forEach(panel => {
    renderPanel(panel, panel.dataset.wine);
  });

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('vini-' + tab.dataset.wine);
      if (target) target.classList.add('active');
    });
  });
}

/* ═══════════════════════════════════════════
   HELPER: Re-trigger IntersectionObserver
   ═══════════════════════════════════════════ */
function triggerReveal(elements) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

  elements.forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });
}

/* ═══════════════════════════════════════════
   HELPER: Escape HTML
   ═══════════════════════════════════════════ */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ─────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildFullMenu();
  buildCocktailSection();
  buildCucinaSection();
  buildWineSection();
});
