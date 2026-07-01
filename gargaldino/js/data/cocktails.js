/* =============================================
   GARIBALDINO — COCKTAIL & BAR DATA
   Modifica facilmente prezzi, nomi e descrizioni
   ============================================= */

const cocktailsData = [
  // ─── ANALCOLICI ──────────────────────────────
  { id: 1,  name: "Tropical Colada Virgin", desc: "Cocco • Lime • Ananas • Ace • Spuma all'anice", price: 10, style: "analcolici", menuCat: "analcolici", tag: "Analcolico" },
  { id: 2,  name: "Albachiara",             desc: "Fragola • Pesca • Arancia",                      price: 10, style: "analcolici", menuCat: "analcolici", tag: "Analcolico" },
  { id: 3,  name: "Jack Sparrow",           desc: "Passion Fruit • Lime • Ananas • Ginger Beer",    price: 10, style: "analcolici", menuCat: "analcolici", tag: "Analcolico" },
  { id: 4,  name: "Garibaldino",            desc: "Menta • Lime • Sciroppo fiori di sambuco • Tassoni", price: 10, style: "analcolici", menuCat: "analcolici", tag: "Analcolico" },

  // ─── SUMMER ESSENTIAL ─────────────────────────
  { id: 5,  name: "Spritz",           desc: "Aperol / Campari / Select / Hugo / Cynar / Lambrusco — Bollicine, bitter, estate.",  price: 7,  style: "summer", menuCat: "cocktail", tag: "Summer Essential" },
  { id: 6,  name: "Gin Tonic / Lemon", desc: "Edgar Sopper London Dry Gin • Tonica o Lemon — Pulito, diretto, perfetto sempre.", price: 10, style: "summer", menuCat: "cocktail", tag: "Summer Essential" },
  { id: 7,  name: "Cuba Libre",        desc: "Jamaica Gold Rum • Cola • Lime — Fresco, semplice, intramontabile.",                price: 10, style: "summer", menuCat: "cocktail", tag: "Summer Essential" },
  { id: 8,  name: "Mule",              desc: "Vodka o Gin • Ginger Beer • Lime — Speziato, dissetante.",                          price: 9,  style: "summer", menuCat: "cocktail", tag: "Summer Essential" },

  // ─── ITALIAN CLASSICS ─────────────────────────
  { id: 9,  name: "Negroni",    desc: "Gin • Bitter • Vermouth — Strutturato, Iconico.",       price: 9, style: "italian-classics", menuCat: "cocktail", tag: "Italian Classics" },
  { id: 10, name: "Americano",  desc: "Bitter • Vermouth • Soda — Leggero, aperitivo perfetto.", price: 8, style: "italian-classics", menuCat: "cocktail", tag: "Italian Classics" },
  { id: 11, name: "MI-TO",      desc: "Bitter • Vermouth — Essenziale, diretto.",               price: 8, style: "italian-classics", menuCat: "cocktail", tag: "Italian Classics" },
  { id: 12, name: "Garibaldi",  desc: "Bitter • Succo d'Arancia — Fresco, vibrante.",           price: 8, style: "italian-classics", menuCat: "cocktail", tag: "Italian Classics" },

  // ─── SHAKEN ───────────────────────────────────
  { id: 13, name: "Naked And Famous",  desc: "Lime • Chartreuse Gialla • Mezcal • Aperol — Equilibrio perfetto.",          price: 12, style: "shaken", menuCat: "cocktail", tag: "Shaken" },
  { id: 22, name: "Margarita",         desc: "Tequila Blanco • Lime • Triple Sec — Il classico messicano.",                 price: 9,  style: "shaken", menuCat: "cocktail", tag: "Shaken" },
  { id: 23, name: "Daiquiri",          desc: "Rum Blanco Cubano • Lime • Zucchero — Fresco, bilanciato, elegante.",         price: 9,  style: "shaken", menuCat: "cocktail", tag: "Shaken" },
  { id: 24, name: "Long Island",       desc: "White Mix • Lime • Cola — Quattro distillati in perfetto equilibrio.",        price: 10, style: "shaken", menuCat: "cocktail", tag: "Shaken" },
  { id: 25, name: "Pornstar Martini",  desc: "Vodka vaniglia • Passion Fruit • Sciroppo vaniglia • Passoã",                 price: 15, style: "shaken", menuCat: "cocktail", tag: "Shaken" },

  // ─── SOUR ─────────────────────────────────────
  { id: 15, name: "Kefirino Fizz",   desc: "Limone • Zucchero • Gin • Kefir d'acqua al passion fruit",                                                    price: 12, style: "sour", menuCat: "signature", tag: "Sour" },
  { id: 16, name: "Criptico",        desc: "Limone • Zucchero • Mirtilli • Lamponi • Fiori di sambuco • Gin • Spuma • Spuma Champagne e vaniglia",          price: 12, style: "sour", menuCat: "signature", tag: "Sour" },
  { id: 26, name: "Gin Fizz",        desc: "Gin London Dry • Lime • Zucchero • Soda • Albume — Classico rinfrescante.",                                    price: 10, style: "sour", menuCat: "cocktail", tag: "Sour" },
  { id: 27, name: "Whiskey Sour",    desc: "Bourbon • Lime • Zucchero • Albume — Morbido e avvolgente.",                                                   price: 9,  style: "sour", menuCat: "cocktail", tag: "Sour" },
  { id: 28, name: "Gin / Vodka Sour", desc: "Gin London Dry / Vodka • Lime • Zucchero • Albume — Equilibrato e setoso.",                                   price: 9,  style: "sour", menuCat: "cocktail", tag: "Sour" },
  { id: 29, name: "Amaretto Sour",   desc: "by Jeffrey Morgenthaler — Amaretto • Bourbon • Lime • Zucchero • Albume — Dolce, rotondo, sorprendente.",       price: 10, style: "sour", menuCat: "cocktail", tag: "Sour" },

  // ─── TIKI ─────────────────────────────────────
  { id: 17, name: "Summercolada",             desc: "Lime • Passion fruit • Ananas • Mango • Cocco • Rum",                                                    price: 12, style: "tiki", menuCat: "cocktail", tag: "Tiki" },
  { id: 18, name: "Tropical May Thai",        desc: "Lime • Ananas • Ace • Orzata • Mix di rum • Triple sec • Spuma all'anice",                             price: 12, style: "tiki", menuCat: "cocktail", tag: "Tiki" },
  { id: 30, name: "Missionary's Downfall",    desc: "Ananas • Apricot Brandy • Rum Bianco • Menta • Lime • Honey Mix — Tropicale e aromatico.",              price: 12, style: "tiki", menuCat: "cocktail", tag: "Tiki" },
  { id: 31, name: "Don's Special Daiquiri",   desc: "Rum Mix • Passion Fruit • Honey Mix • Lime — Complessità tiki in ogni sorso.",                          price: 12, style: "tiki", menuCat: "cocktail", tag: "Tiki" },
  { id: 32, name: "Allegra Morte",            desc: "Lime • Passion Fruit • Orzata • Mezcal • Triple Sec — Oscuro e festoso.",                               price: 12, style: "tiki", menuCat: "cocktail", tag: "Tiki" },

  // ─── IBA SPECIAL ──────────────────────────────
  { id: 13, name: "Espresso Martini",  desc: "Vodka • Zucchero • Kahlua • Caffè — Energico, elegante.",                                                   price: 10, style: "iba", menuCat: "cocktail", tag: "IBA Special" },
  { id: 19, name: "Illegal",           desc: "Mezcal • Rum Overproof • Falernum • Maraschino • Lime • Zucchero — Pericolosamente buono.",                  price: 13, style: "iba", menuCat: "cocktail", tag: "IBA Special" },
  { id: 20, name: "Fernandito",        desc: "Fernet • Cola — Classico argentino, digestivo e audace.",                                                    price: 10, style: "iba", menuCat: "cocktail", tag: "IBA Special" },

  // ─── SIGNATURE ────────────────────────────────
  { id: 21, name: "Kombucha West", desc: "Lime • Mango • Rum kombucha all'ibisco — Il nostro twist fermentato.",                    price: 12, style: "signature", menuCat: "signature", tag: "Signature" },
];

const ginData = [
  { name: "Hendrick's",   desc: "Floreale, pepato, note di cetriolo e rosa. Serve con cetriolo e lavanda.",          price: 10 },
  { name: "Illusionist",  desc: "Gin botanico cangiante, dal viola al blu. Tonica premium o lemon.",                  price: 13 },
  { name: "Malfy Rosa",   desc: "Pompelmo rosa siciliano, fresco e vivace. Con tonica e pompelmo fresco.",            price: 10 },
  { name: "Mare",         desc: "Note marine e aromatiche del Mediterraneo. Tonica classica, fettina di lime.",       price: 10 },
  { name: "Nordes",       desc: "Gin gallego con uva Albariño. Delicato, fruttato, floreale.",                        price: 13 },
  { name: "Plymouth",     desc: "Classico inglese, morbido e bilanciato. Perfetto per Martini e Negroni.",            price: 10 },
  { name: "Roku",         desc: "Gin giapponese con sakura, yuzu e sansho. Elegante, raffinato.",                     price: 10 },
];

const birreData = [
  { name: "Spina Piccola — Bionda Peroni",        desc: "Bionda leggera, fresca, italiana.",          price: 4   },
  { name: "Spina Media — Bionda Peroni",          desc: "Bionda leggera, fresca, italiana.",          price: 6   },
  { name: "Spina Piccola — IPA Maisel & Friends", desc: "India Pale Ale, luppolata e aromatica.",     price: 4.5 },
  { name: "Spina Media — IPA Maisel & Friends",   desc: "India Pale Ale, luppolata e aromatica.",     price: 7   },
  { name: "Corona",                               desc: "Birra messicana, fresca con lime.",           price: 5   },
  { name: "Bella Fresca",                         desc: "Birra artigianale.",                          price: 5   },
  { name: "Blanche de Bruxelles",                 desc: "Birra bianca belga, note di agrumi.",        price: 5   },
];

const bibiteData = [
  { name: "Acqua 0,5L",            desc: "Naturale",               price: 2   },
  { name: "Acqua 0,75L",           desc: "Naturale",               price: 3.5 },
  { name: "Coca Cola",             desc: "Classic",                price: 5   },
  { name: "Coca Cola Zero",        desc: "Senza zucchero",         price: 5   },
  { name: "Tè Limone",             desc: "",                       price: 5   },
  { name: "Tè Pesca",              desc: "",                       price: 5   },
  { name: "Acqua brillante Recoaro", desc: "",                     price: 5   },
  { name: "Lemon",                 desc: "",                       price: 5   },
  { name: "Tassoni",               desc: "Cedrata classica italiana", price: 5 },
  { name: "Ginger Beer",           desc: "",                       price: 5   },
  { name: "Soda al Pompelmo",      desc: "",                       price: 5   },
  { name: "Succo Pesca",           desc: "",                       price: 5   },
  { name: "Succo Arancia",         desc: "",                       price: 5   },
  { name: "Succo Pomodoro",        desc: "",                       price: 5   },
  { name: "Succo Ace",             desc: "",                       price: 5   },
  { name: "Succo Ananas",          desc: "",                       price: 5   },
  { name: "Succo Maracuja",        desc: "",                       price: 5   },
];

const aperitiviBottigliaData = [
  { name: "Crodino",   desc: "Aperitivo analcolico", price: 5 },
  { name: "Camparino", desc: "Campari ghiacciato",   price: 5 },
];
