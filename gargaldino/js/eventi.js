/* ============================================================
   GARIBALDINO — EVENTI REMOTE MEDIA
   Upload immagine/video · Titolo · Descrizione · Popup
   Persistence: Netlify Blobs via Netlify Function
   ============================================================ */

'use strict';

const EVENTI_REMOTE_URL = '/api/eventi';
const EVENTI_LOCAL_CACHE_KEY = 'garibaldino_eventi_cache_v2';
const EVENTI_PIN_KEY = 'garibaldino_eventi_admin_pin_v1';
const EVENTI_UNLOCK_UNTIL_KEY = 'garibaldino_eventi_admin_unlock_until_v1';
const EVENTI_DEFAULT_PIN = '2580';
const EVENTI_UNLOCK_TTL_MS = 10 * 60 * 1000;
const EVENTI_MAX_FILE_MB = 12;

let eventiDraft = [];
let autoRefreshTimer = null;

function uid() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeText(value, fallback = '') {
  const text = String(value ?? '').trim();
  return text || fallback;
}

function normalizeEntry(entry) {
  if (!entry || typeof entry !== 'object') return null;

  const mediaType = entry.mediaType === 'video' ? 'video' : 'image';
  const mediaData = normalizeText(entry.mediaData);
  const posterData = normalizeText(entry.posterData, mediaData);
  const titolo = normalizeText(entry.titolo, 'Evento');
  const descrizione = normalizeText(entry.descrizione, '');
  const mimeType = normalizeText(entry.mimeType, '');

  if (!mediaData) return null;

  return {
    id: normalizeText(entry.id, uid()),
    mediaType,
    mediaData,
    posterData,
    titolo,
    descrizione,
    mimeType,
    createdAt: typeof entry.createdAt === 'number' ? entry.createdAt : Date.now(),
  };
}

function normalizeEntries(entries) {
  if (!Array.isArray(entries)) return [];
  return entries.map(normalizeEntry).filter(Boolean);
}

function readLocalCache() {
  try {
    const raw = localStorage.getItem(EVENTI_LOCAL_CACHE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return normalizeEntries(parsed);
  } catch (_err) {
    return [];
  }
}

function writeLocalCache(entries) {
  try {
    localStorage.setItem(EVENTI_LOCAL_CACHE_KEY, JSON.stringify(normalizeEntries(entries)));
  } catch (_err) {
    // no-op
  }
}

function clearLocalCache() {
  try {
    localStorage.removeItem(EVENTI_LOCAL_CACHE_KEY);
  } catch (_err) {
    // no-op
  }
}

async function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Errore lettura file'));
    reader.readAsDataURL(file);
  });
}

async function createVideoPoster(file) {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.src = objectUrl;

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
    };

    const resolveFallback = () => {
      cleanup();
      resolve('img/logo_1.jpg');
    };

    const capture = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;
        const context = canvas.getContext('2d');
        if (!context) {
          resolveFallback();
          return;
        }

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const poster = canvas.toDataURL('image/jpeg', 0.82);
        cleanup();
        resolve(poster);
      } catch (_err) {
        resolveFallback();
      }
    };

    video.addEventListener('loadeddata', () => {
      try {
        if (video.duration > 0.1) {
          video.currentTime = 0.1;
        } else {
          capture();
        }
      } catch (_err) {
        capture();
      }
    });

    video.addEventListener('seeked', capture, { once: true });
    video.addEventListener('error', resolveFallback, { once: true });
  });
}

function getAdminPin() {
  try {
    const saved = localStorage.getItem(EVENTI_PIN_KEY);
    if (saved && /^\d{4,8}$/.test(saved)) return saved;
  } catch (_err) {
    // no-op
  }
  return EVENTI_DEFAULT_PIN;
}

function isAdminUnlocked() {
  try {
    const raw = sessionStorage.getItem(EVENTI_UNLOCK_UNTIL_KEY);
    const until = Number(raw || '0');
    return Number.isFinite(until) && Date.now() < until;
  } catch (_err) {
    return false;
  }
}

function setAdminUnlocked() {
  try {
    sessionStorage.setItem(EVENTI_UNLOCK_UNTIL_KEY, String(Date.now() + EVENTI_UNLOCK_TTL_MS));
  } catch (_err) {
    // no-op
  }
}

function normalizePin(pin) {
  return String(pin || '').trim();
}

function saveAdminPin(pin) {
  const normalized = normalizePin(pin);
  if (!/^\d{4,8}$/.test(normalized)) return false;

  try {
    localStorage.setItem(EVENTI_PIN_KEY, normalized);
    return true;
  } catch (_err) {
    return false;
  }
}

function ensureAdminAccess() {
  if (isAdminUnlocked()) return true;

  const expectedPin = getAdminPin();

  for (let i = 0; i < 3; i += 1) {
    const remaining = 3 - i;
    const input = window.prompt(`Inserisci PIN admin Eventi (${remaining} tentativi):`);
    if (input === null) return false;

    if (normalizePin(input) === expectedPin) {
      setAdminUnlocked();
      return true;
    }
  }

  window.alert('PIN errato. Accesso admin bloccato.');
  return false;
}

function changeAdminPinFlow() {
  const current = window.prompt('Inserisci PIN attuale:');
  if (current === null) return { ok: false, message: '' };

  if (normalizePin(current) !== getAdminPin()) {
    return { ok: false, message: 'PIN attuale non corretto.' };
  }

  const next = window.prompt('Nuovo PIN (4-8 cifre):');
  if (next === null) return { ok: false, message: '' };

  const confirm = window.prompt('Conferma nuovo PIN:');
  if (confirm === null) return { ok: false, message: '' };

  if (normalizePin(next) !== normalizePin(confirm)) {
    return { ok: false, message: 'I due PIN non coincidono.' };
  }

  if (!saveAdminPin(next)) {
    return { ok: false, message: 'PIN non valido. Usa 4-8 cifre numeriche.' };
  }

  setAdminUnlocked();
  return { ok: true, message: 'PIN aggiornato con successo.' };
}

function readPreviewImage(entry) {
  return entry.posterData || entry.mediaData || 'img/logo_1.jpg';
}

function creaCardEvento(entry, index) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'eventi-card';
  button.dataset.index = String(index);

  const title = normalizeText(entry.titolo, `Evento ${index + 1}`);
  const safeTitle = title.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  button.setAttribute('aria-label', `Apri evento ${index + 1}`);
  button.innerHTML = `
    <div class="eventi-card-img-wrap">
      <img class="eventi-card-img" src="${readPreviewImage(entry)}" alt="${safeTitle}" loading="lazy" decoding="async" />
    </div>
    <div class="eventi-card-body">
      <div class="eventi-card-title">${safeTitle}</div>
    </div>
  `;

  const img = button.querySelector('.eventi-card-img');
  if (img) {
    img.addEventListener('error', () => {
      img.src = 'img/logo_1.jpg';
    }, { once: true });
  }

  return button;
}

function apriPopupEvento(entry) {
  const popup = document.getElementById('eventi-popup');
  const img = document.getElementById('eventi-popup-img');
  const video = document.getElementById('eventi-popup-video');
  const title = document.getElementById('eventi-popup-title');
  const desc = document.getElementById('eventi-popup-desc');
  if (!popup || !img || !video || !title || !desc) return;

  title.textContent = normalizeText(entry.titolo, 'Evento');
  desc.textContent = normalizeText(entry.descrizione, 'Nessuna descrizione disponibile.');

  if (entry.mediaType === 'video') {
    img.style.display = 'none';
    img.src = '';
    video.style.display = 'block';
    video.src = entry.mediaData;
    video.poster = readPreviewImage(entry);
    video.currentTime = 0;
  } else {
    video.pause();
    video.style.display = 'none';
    video.removeAttribute('src');
    video.load();
    img.style.display = 'block';
    img.src = entry.mediaData;
    img.alt = title.textContent;
  }

  popup.classList.add('active');
  document.body.style.overflow = 'hidden';
  popup.focus();
}

function chiudiPopupEvento() {
  const popup = document.getElementById('eventi-popup');
  const video = document.getElementById('eventi-popup-video');
  if (!popup) return;

  if (video) {
    video.pause();
    video.currentTime = 0;
  }

  popup.classList.remove('active');
  document.body.style.overflow = '';
}

function initPopupEventi() {
  const popup = document.getElementById('eventi-popup');
  const closeBtn = document.querySelector('.eventi-popup-close');
  if (!popup) return;

  closeBtn?.addEventListener('click', chiudiPopupEvento);

  popup.addEventListener('click', (e) => {
    if (e.target === popup) chiudiPopupEvento();
  });

  document.addEventListener('keydown', (e) => {
    if (!popup.classList.contains('active')) return;
    if (e.key === 'Escape') chiudiPopupEvento();
  });
}

async function loadEventiEntries() {
  try {
    const response = await fetch(EVENTI_REMOTE_URL, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = await response.json();
    const items = normalizeEntries(payload.items);
    writeLocalCache(items);
    return items;
  } catch (_err) {
    return readLocalCache();
  }
}

async function saveEventiEntries(entries, statusEl) {
  const sanitized = normalizeEntries(entries);

  try {
    const response = await fetch(EVENTI_REMOTE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: sanitized }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    writeLocalCache(sanitized);
    return { ok: true, source: 'remote' };
  } catch (_err) {
    const isLocalDev = ['localhost', '127.0.0.1'].includes(window.location.hostname) || window.location.protocol === 'file:';

    if (isLocalDev) {
      writeLocalCache(sanitized);
      if (statusEl) {
        statusEl.textContent = 'Backend non disponibile in locale: salvato nella cache del browser.';
      }
      return { ok: true, source: 'local-fallback' };
    }

    if (statusEl) {
      statusEl.textContent = 'Impossibile salvare sul cloud. Verifica che la funzione Netlify sia attiva e riprova.';
    }
    return { ok: false, source: 'remote-failed' };
  }
}

async function deleteEventiEntries() {
  try {
    const response = await fetch(EVENTI_REMOTE_URL, { method: 'DELETE' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  } catch (_err) {
    // no-op: la cache locale viene comunque rimossa
  }

  clearLocalCache();
}

async function renderEventi() {
  const grid = document.getElementById('eventi-grid');
  if (!grid) return;

  const requestToken = Date.now();
  grid.dataset.renderToken = String(requestToken);
  grid.innerHTML = '';

  const entries = await loadEventiEntries();
  if (grid.dataset.renderToken !== String(requestToken)) return;

  if (!entries.length) {
    grid.innerHTML = '<div class="eventi-empty">Nessun evento configurato. Premi Ctrl + Shift + E per aprire il pannello admin e caricare contenuti.</div>';
    return;
  }

  entries.forEach((entry, index) => {
    const card = creaCardEvento(entry, index);
    card.addEventListener('click', () => apriPopupEvento(entry));
    grid.appendChild(card);
  });
}

function renderAdminList(container) {
  if (!container) return;

  if (!eventiDraft.length) {
    container.innerHTML = '<div class="eventi-admin-list-empty">Nessun elemento in bozza.</div>';
    return;
  }

  container.innerHTML = eventiDraft.map((item, index) => {
    const title = normalizeText(item.titolo, `Evento ${index + 1}`).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const mediaLabel = item.mediaType === 'video' ? 'Video' : 'Immagine';
    return `
      <div class="eventi-admin-list-item">
        <div class="eventi-admin-list-item-title">${mediaLabel}: ${title}</div>
        <button type="button" class="eventi-admin-remove" data-remove-id="${item.id}">Rimuovi</button>
      </div>
    `;
  }).join('');
}

async function initAdminPanelEventi() {
  const panel = document.getElementById('eventi-admin');
  const dialog = panel?.querySelector('.eventi-admin-panel');
  const fileInput = document.getElementById('eventi-admin-file');
  const titleInput = document.getElementById('eventi-admin-title');
  const descInput = document.getElementById('eventi-admin-desc');
  const list = document.getElementById('eventi-admin-list');
  const btnClose = document.getElementById('eventi-admin-close');
  const btnAdd = document.getElementById('eventi-admin-add');
  const btnSave = document.getElementById('eventi-admin-save');
  const btnReset = document.getElementById('eventi-admin-reset');
  const btnChangePin = document.getElementById('eventi-admin-change-pin');
  const status = document.getElementById('eventi-admin-status');
  if (!panel || !dialog || !fileInput || !titleInput || !descInput || !list || !btnClose || !btnAdd || !btnSave || !btnReset || !btnChangePin || !status) return;

  const clearForm = () => {
    fileInput.value = '';
    titleInput.value = '';
    descInput.value = '';
  };

  const openPanel = async () => {
    if (!ensureAdminAccess()) return;

    eventiDraft = await loadEventiEntries();
    renderAdminList(list);
    clearForm();
    status.textContent = '';
    panel.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    dialog.focus();
  };

  const closePanel = () => {
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  btnClose.addEventListener('click', closePanel);

  panel.addEventListener('click', (e) => {
    if (e.target === panel) closePanel();
  });

  list.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const id = target.getAttribute('data-remove-id');
    if (!id) return;

    eventiDraft = eventiDraft.filter((item) => item.id !== id);
    renderAdminList(list);
    status.textContent = 'Elemento rimosso dalla bozza.';
  });

  btnAdd.addEventListener('click', async () => {
    const file = fileInput.files?.[0];
    const titolo = titleInput.value.trim();
    const descrizione = descInput.value.trim();

    if (!file) {
      status.textContent = 'Seleziona prima un file immagine o video.';
      return;
    }

    if (!(file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      status.textContent = 'Formato non supportato. Carica un\'immagine o un video.';
      return;
    }

    const maxBytes = EVENTI_MAX_FILE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      status.textContent = `File troppo grande. Limite: ${EVENTI_MAX_FILE_MB}MB.`;
      return;
    }

    const mediaData = await readFileAsDataUrl(file);
    const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
    const posterData = mediaType === 'video' ? await createVideoPoster(file) : mediaData;

    eventiDraft.push({
      id: uid(),
      mediaType,
      mediaData,
      posterData,
      titolo: titolo || 'Evento',
      descrizione,
      mimeType: file.type,
      createdAt: Date.now(),
    });

    renderAdminList(list);
    clearForm();
    status.textContent = 'Contenuto aggiunto in bozza. Premi Salva Eventi per pubblicarlo online.';
  });

  btnSave.addEventListener('click', async () => {
    if (!eventiDraft.length) {
      status.textContent = 'Aggiungi almeno un contenuto prima di salvare.';
      return;
    }

    const result = await saveEventiEntries(eventiDraft, status);
    if (!result.ok) return;

    await renderEventi();
    status.textContent = result.source === 'remote'
      ? `Salvati ${eventiDraft.length} contenuti nel cloud. Tutti i visitatori vedranno gli aggiornamenti.`
      : `Salvati ${eventiDraft.length} contenuti solo in locale.`;
  });

  btnReset.addEventListener('click', async () => {
    eventiDraft = [];
    await deleteEventiEntries();
    clearForm();
    renderAdminList(list);
    status.textContent = 'Configurazione rimossa dal cloud.';
    await renderEventi();
  });

  btnChangePin.addEventListener('click', () => {
    const result = changeAdminPinFlow();
    if (result.message) status.textContent = result.message;
  });

  document.addEventListener('keydown', async (e) => {
    const isShortcut = e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e';
    if (isShortcut) {
      e.preventDefault();
      if (panel.classList.contains('active')) closePanel();
      else await openPanel();
      return;
    }

    if (e.key === 'Escape' && panel.classList.contains('active')) {
      closePanel();
    }
  });

  return { openPanel, closePanel };
}

function initAutoRefresh() {
  if (autoRefreshTimer) clearInterval(autoRefreshTimer);
  autoRefreshTimer = window.setInterval(() => {
    const panel = document.getElementById('eventi-admin');
    if (panel?.classList.contains('active')) return;
    if (document.visibilityState !== 'visible') return;
    void renderEventi();
  }, 60000);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      void renderEventi();
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await renderEventi();
  initPopupEventi();
  await initAdminPanelEventi();
  initAutoRefresh();
});
