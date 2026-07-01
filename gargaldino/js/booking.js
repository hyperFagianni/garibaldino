/* ============================================================
   GARIBALDINO — BOOKING FORM JS
   Validation · WhatsApp integration · Success feedback
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────
   CONFIG — easily integrate with any backend
   ───────────────────────────────────────────── */
const BOOKING_CONFIG = {
  whatsapp: {
    enabled:  true,
    number:   '390536883568',  // International format, no +
  },
  email: {
    enabled:  false,           // Set true when backend is ready
    endpoint: '/api/booking',  // Your API endpoint
  }
};

/* ─────────────────────────────────────────────
   VALIDATION RULES
   ───────────────────────────────────────────── */
const validators = {
  nome:     v => v.trim().length >= 2,
  telefono: v => /^[\d\s\+\-\(\)]{6,20}$/.test(v.trim()),
  email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  data:     v => {
    const d    = new Date(v);
    const now  = new Date();
    now.setHours(0, 0, 0, 0);
    return d instanceof Date && !isNaN(d) && d >= now;
  },
  ora:      v => v !== '',
  persone:  v => v !== '' && parseInt(v) > 0,
};

const errorMessages = {
  nome:     'Inserisci il tuo nome (min. 2 caratteri).',
  telefono: 'Inserisci un numero di telefono valido.',
  email:    'Inserisci un indirizzo email valido.',
  data:     'Scegli una data valida (oggi o futura).',
  ora:      'Seleziona un orario.',
  persone:  'Seleziona il numero di persone.',
};

/* ─────────────────────────────────────────────
   SET MIN DATE
   ───────────────────────────────────────────── */
function setMinDate() {
  const dateInput = document.getElementById('booking-data');
  if (!dateInput) return;

  const today = new Date();
  const yyyy  = today.getFullYear();
  const mm    = String(today.getMonth() + 1).padStart(2, '0');
  const dd    = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

/* ─────────────────────────────────────────────
   SHOW/CLEAR FIELD ERROR
   ───────────────────────────────────────────── */
function showError(fieldId, message) {
  const input = document.getElementById('booking-' + fieldId);
  const errEl = document.getElementById('err-' + fieldId);
  if (!input || !errEl) return;

  input.style.borderColor = '#E06C75';
  errEl.textContent = message;
  errEl.style.display = 'block';
}

function clearError(fieldId) {
  const input = document.getElementById('booking-' + fieldId);
  const errEl = document.getElementById('err-' + fieldId);
  if (!input || !errEl) return;

  input.style.borderColor = '';
  errEl.style.display = 'none';
}

/* ─────────────────────────────────────────────
   VALIDATE FORM
   ───────────────────────────────────────────── */
function validateForm() {
  let valid = true;

  Object.keys(validators).forEach(field => {
    const input = document.getElementById('booking-' + field);
    if (!input) return;
    if (!validators[field](input.value)) {
      showError(field, errorMessages[field]);
      valid = false;
    } else {
      clearError(field);
    }
  });

  return valid;
}

/* ─────────────────────────────────────────────
   BUILD WHATSAPP MESSAGE
   ───────────────────────────────────────────── */
function buildWhatsAppMessage(data) {
  const { nome, telefono, email, data: date, ora, persone, note } = data;

  const dateFormatted = new Date(date).toLocaleDateString('it-IT', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  let msg = `Ciao Garibaldino! Vorrei prenotare un tavolo:\n\n`;
  msg += `👤 *Nome:* ${nome}\n`;
  msg += `📱 *Telefono:* ${telefono}\n`;
  msg += `✉️ *Email:* ${email}\n`;
  msg += `📅 *Data:* ${dateFormatted}\n`;
  msg += `🕐 *Ora:* ${ora}\n`;
  msg += `👥 *Persone:* ${persone}\n`;
  if (note) msg += `📝 *Note:* ${note}\n`;
  msg += `\nGrazie!`;

  return encodeURIComponent(msg);
}

/* ─────────────────────────────────────────────
   SHOW SUCCESS
   ───────────────────────────────────────────── */
function showSuccess() {
  const form    = document.getElementById('booking-form');
  const success = document.getElementById('booking-success');
  if (!form || !success) return;

  form.style.display = 'none';
  success.classList.add('visible');
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ─────────────────────────────────────────────
   INIT FORM
   ───────────────────────────────────────────── */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  setMinDate();

  // Inline validation on blur
  Object.keys(validators).forEach(field => {
    const input = document.getElementById('booking-' + field);
    if (!input) return;

    input.addEventListener('blur', () => {
      if (input.value && !validators[field](input.value)) {
        showError(field, errorMessages[field]);
      } else {
        clearError(field);
      }
    });

    input.addEventListener('input', () => {
      if (input.style.borderColor === 'rgb(224, 108, 117)') {
        if (validators[field](input.value)) clearError(field);
      }
    });
  });

  // Submit
  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = {
      nome:    document.getElementById('booking-nome')?.value.trim()    || '',
      telefono:document.getElementById('booking-telefono')?.value.trim()|| '',
      email:   document.getElementById('booking-email')?.value.trim()   || '',
      data:    document.getElementById('booking-data')?.value           || '',
      ora:     document.getElementById('booking-ora')?.value            || '',
      persone: document.getElementById('booking-persone')?.value        || '',
      note:    document.getElementById('booking-note')?.value.trim()    || '',
    };

    // WhatsApp integration (primary)
    if (BOOKING_CONFIG.whatsapp.enabled) {
      const msg = buildWhatsAppMessage(data);
      const url = `https://wa.me/${BOOKING_CONFIG.whatsapp.number}?text=${msg}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      showSuccess();
      return;
    }

    // Email fallback (when backend is ready)
    if (BOOKING_CONFIG.email.enabled) {
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled    = true;
        submitBtn.textContent = 'Invio in corso…';
      }

      fetch(BOOKING_CONFIG.email.endpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
        .then(res => {
          if (!res.ok) throw new Error('Server error');
          showSuccess();
        })
        .catch(() => {
          alert('Si è verificato un errore. Riprova o chiama al 0536 883568.');
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Prenota'; }
        });
    }
  });
}

/* ─────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', initBookingForm);
