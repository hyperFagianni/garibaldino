/* =============================================
   GARIBALDINO — WINE & BOLLICINE DATA
   Modifica facilmente prezzi, nomi e descrizioni
   ============================================= */

const wineData = {

  // ─── VINI BIANCHI ─────────────────────────────
  bianchi: [
    { name: "Insolia",                  region: "Sicilia",        price_glass: null, price_bottle: 25 },
    { name: "Roero Arneis",             region: "Piemonte",       price_glass: null, price_bottle: 28 },
    { name: "Sauvignon",                region: "Alto Adige",     price_glass: null, price_bottle: 40 },
    { name: "Chardonnay — Tormaresca",  region: "Puglia",         price_glass: 7,    price_bottle: 25 },
    { name: "Chardonnay — Colterenzio", region: "Alto Adige",     price_glass: null, price_bottle: 30 },
    { name: "Sharis",                   region: "Friuli",         price_glass: null, price_bottle: 30 },
    { name: "Passerina",                region: "Marche",         price_glass: null, price_bottle: 25 },
    { name: "Ribolla Gialla",           region: "Friuli",         price_glass: null, price_bottle: 25 },
    { name: "Gewürztraminer",           region: "Alto Adige",     price_glass: 8,    price_bottle: 30 },
    { name: "Falanghina",               region: "Campania",       price_glass: null, price_bottle: 25 },
    { name: "Lugana",                   region: "Lombardia",      price_glass: null, price_bottle: 28 },
  ],

  // ─── VINI ROSSI ───────────────────────────────
  rossi: [
    { name: "Barbaresco",               region: "Piemonte",       price_glass: null, price_bottle: 40 },
    { name: "Barolo",                   region: "Piemonte",       price_glass: null, price_bottle: 45 },
    { name: "Barbera Superiore",        region: "Piemonte",       price_glass: null, price_bottle: 30 },
    { name: "Chianti Classico",         region: "Toscana",        price_glass: null, price_bottle: 30 },
    { name: "Valpolicella",             region: "Veneto",         price_glass: null, price_bottle: 28 },
    { name: "Valpolicella Ripasso",     region: "Veneto",         price_glass: null, price_bottle: 30 },
    { name: "Montepulciano",            region: "Abruzzo",        price_glass: null, price_bottle: 25 },
    { name: "Pinot Nero",               region: "Alto Adige",     price_glass: 7,    price_bottle: 25 },
    { name: "Lagrein",                  region: "Alto Adige",     price_glass: null, price_bottle: 27 },
    { name: "Le Volte dell'Ornellaia",  region: "Toscana",        price_glass: null, price_bottle: 35 },
    { name: "Syrah",                    region: "Sicilia",        price_glass: null, price_bottle: 25 },
    { name: "Primitivo",                region: "Puglia",         price_glass: null, price_bottle: 25 },
    { name: "Sassicaia",                region: "Toscana",        price_glass: null, price_bottle: null, note: "Chiedere al personale" },
    { name: "Sangiovese Superiore",     region: "Emilia Romagna", price_glass: 7,    price_bottle: 25 },
  ],

  // ─── BOLLICINE ────────────────────────────────
  bollicine: [
    { name: "Lambrusco — Vigna del Cristo",          region: "Emilia Romagna", price_glass: 5,  price_bottle: 20  },
    { name: "Lambrusco — Otello",                    region: "Emilia Romagna", price_glass: 5,  price_bottle: 20  },
    { name: "Prosecco Extra Dry — Astoria",          region: "Veneto",         price_glass: 7,  price_bottle: 25  },
    { name: "Bellavista Alma Cuvée",                 region: "Franciacorta",   price_glass: null, price_bottle: 50 },
    { name: "Ca' del Bosco Cuvée Prestige",          region: "Franciacorta",   price_glass: null, price_bottle: 50 },
    { name: "Monterossa Brut",                       region: "Franciacorta",   price_glass: null, price_bottle: 40 },
    { name: "Franciacorta Brut — Cola",              region: "Franciacorta",   price_glass: 8,  price_bottle: 35  },
    { name: "Franciacorta Satèn — Cola",             region: "Franciacorta",   price_glass: null, price_bottle: 40 },
    { name: "Ferrari Perlé",                         region: "Trentino DOC",   price_glass: null, price_bottle: 50 },
    { name: "Ferrari Riserva Lunelli",               region: "Trentino DOC",   price_glass: null, price_bottle: 110 },
    { name: "Franz Haas Pinot Nero Dosaggio Zero",   region: "Alto Adige",     price_glass: null, price_bottle: 65 },
    { name: "Altemasi Trento DOC",                   region: "Trentino DOC",   price_glass: 9,  price_bottle: 40  },
    { name: "Altemasi Trento DOC Rosé",              region: "Trentino DOC",   price_glass: 9,  price_bottle: 45  },
    { name: "Mattaglio Brut",                        region: "Emilia Romagna", price_glass: null, price_bottle: 35 },
    { name: "Laurent Perrier Brut",                  region: "Champagne",      price_glass: 12,   price_bottle: 70  },
    { name: "Dom Pérignon",                          region: "Champagne",      price_glass: null, price_bottle: 330 },
    { name: "Perrier Jouet — Belle Epoque",          region: "Champagne",      price_glass: null, price_bottle: 280 },
  ],

  // ─── ROSATO ───────────────────────────────────
  rosati: [
    { name: "Masseria Altemura Zinzula Rosé", region: "Puglia", price_glass: 8, price_bottle: 30 },
  ],

  // ─── VINI DA DESSERT ──────────────────────────
  dessert: [
    { name: "Sauternes",          region: "Bordeaux, Francia", price_glass: 8, price_bottle: null },
    { name: "Altari Frescobaldi", region: "Toscana",           price_glass: 8, price_bottle: null },
  ],
};
