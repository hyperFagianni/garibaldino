/* =============================================
   GARIBALDINO — FOOD MENU DATA
   Modifica facilmente prezzi, nomi e descrizioni
   ============================================= */

const foodData = {

  // ─── WARM-UP BITES — Bruschette ───────────────
  bruschette: [
    {
      name: "Classica",
      desc: "Pomodoro San Marzano profumato all'aglio, olio di oliva extravergine, pepe nero.",
      price: 5
    },
    {
      name: "Fashion",
      desc: "Prosciutto crudo di Parma 36 mesi, composta di fichi al Lambrusco, cipolla caramellata.",
      price: 9
    },
    {
      name: "Pink Smoke",
      desc: "Salmone affumicato, crema di formaggio, zucchine grigliate, scorza di lime e cipolla croccante.",
      price: 10
    },
    {
      name: "Rustic Flame",
      desc: "Salsiccia alla piastra, peperoni grigliati, scamorza affumicata filante e menta fresca.",
      price: 10
    },
  ],

  // ─── VINYL BITES — Taglieri ───────────────────
  taglieri: [
    {
      name: "Solo Track",
      desc: "Prosciutto crudo di Parma 36 mesi DOP, Mortadella Bologna IGP, Salame Felino IGP, Pancetta gigante, Ciccioli. Accompagnato da piadina calda.",
      price: 12
    },
    {
      name: "Duetto",
      desc: "Prosciutto crudo di Parma 36 mesi DOP, Mortadella Bologna IGP, Salame Felino IGP, Pancetta gigante, Ciccioli, Parmigiano Reggiano, verdure sott'olio. Accompagnato da piadina calda.",
      price: 22
    },
    {
      name: "Greatest Hits",
      desc: "Per 4 persone. Prosciutto crudo di Parma 36 mesi DOP, Mortadella Bologna IGP, Salame Felino IGP, Pancetta gigante, Ciccioli, Parmigiano Reggiano, Caciotta dei Colli bolognesi, ciccioli frolli, verdure sott'olio. Accompagnato da piadina calda.",
      price: 44,
      note: "Per 4 persone"
    },
    {
      name: "Moderato",
      desc: "Prosciutto crudo di Parma 36 mesi DOP. Accompagnato da piadina calda.",
      price: 13
    },
    {
      name: "Casaro",
      desc: "Selezione di formaggi freschi e semi stagionati, miele d'acacia e confetture di frutta.",
      price: 15
    },
    {
      name: "Piadina Vuota",
      desc: "Piadina romagnola calda.",
      price: 2
    },
  ],

  // ─── STREET BEATS — Piadine ───────────────────
  piadine: [
    {
      name: "Classica Remix",
      desc: "Mozzarella fior di latte, pomodoro, olio di oliva extravergine, origano.",
      price: 8
    },
    {
      name: "Signature Beat",
      desc: "Prosciutto crudo di Parma 36 mesi DOP, squacquerone di Romagna DOP, rucola.",
      price: 9
    },
    {
      name: "Romagna Gold",
      desc: "Prosciutto crudo di Parma, squacquerone, fichi, rucola e riduzione di aceto balsamico.",
      price: 10
    },
    {
      name: "Bologna Velvet",
      desc: "Mortadella, burrata, granella di pistacchio, scorza di limone e olio extravergine d'oliva.",
      price: 10
    },
    {
      name: "Mediterranean Smoke",
      desc: "Salmone affumicato, stracciatella, zucchine grigliate, pepe rosa e limone.",
      price: 12
    },
    {
      name: "Mountain Blue",
      desc: "Speck, gorgonzola dolce, pere caramellate, noci e radicchio.",
      price: 12
    },
  ],

  // ─── ROLLING BEATS — Hot Dog ──────────────────
  hotdog: [
    {
      name: "Crispy Dog",
      desc: "Würstel alla piastra, bacon super crispy, cheddar e salsa BBQ.",
      price: 10
    },
    {
      name: "Main Stage Dog",
      desc: "Würstel alla piastra, cheddar, bacon super crispy, cipolla caramellata e salsa crispy.",
      price: 10
    },
    {
      name: "Smokehouse Dog",
      desc: "Würstel grigliato, salsiccia, cheddar affumicato fuso, bacon croccante, cipolla rossa sottaceto, cetriolini e maionese affumicata artigianale.",
      price: 12
    },
    {
      name: "Road Cheese Dog",
      desc: "Würstel grigliato, bacon croccante, cheddar fuso, salsa BBQ affumicata, cipolla croccante e cetriolini artigianali.",
      price: 12
    },
  ],

  // ─── SMASH BURGER DROP ────────────────────────
  burger: [
    {
      name: "Junior Smash",
      desc: "Patty 90g, Cheddar Cheese, iceberg.",
      price: 9
    },
    {
      name: "Cheese Smash",
      desc: "Doppio patty 90g, Cheddar, iceberg, cipolla caramellata, pomodoro.",
      price: 10
    },
    {
      name: "Golden Smash",
      desc: "Doppio smash burger, cheddar fuso, lattuga iceberg, pomodoro, cetriolini artigianali e salsa crispy homemade.",
      price: 10
    },
    {
      name: "Crispy Smash",
      desc: "Doppio Patty da 90g, bacon super crispy, pomodoro, Cheddar Cheese, salsa Crispy.",
      price: 12
    },
    {
      name: "Apple Smash",
      desc: "Doppio Patty da 90g, bacon super crispy, Cheddar Cheese, salsa di mele fatta in casa, iceberg, pomodoro.",
      price: 12
    },
    {
      name: "Chichi Smash",
      desc: "Hamburger di pollo croccante, bacon super crispy, iceberg, pomodoro, salsa della casa.",
      price: 12
    },
    {
      name: "Crispy Veggie Smash",
      desc: "Burger green: uovo e feta, zucchine grigliate, insalata e pomodorini, cipolla caramellata, salsa yogurt al cetriolo, menta e limone.",
      price: 12
    },
    {
      name: "Garibaldino Smoke",
      desc: "Doppio Patty da 90g, scamorza affumicata, bacon croccante, uovo alla piastra, cipolla caramellata, iceberg, pomodoro e salsa crispy.",
      price: 12,
      note: "Our signature"
    },
  ],

  // ─── NAKED SANDWICH — Sandwich ────────────────
  sandwich: [
    {
      name: "Green Vibes",
      desc: "Zucchine grigliate alla menta, uovo occhio di bue, avocado, lattuga, pomodoro, Philadelphia Cheese.",
      price: 10
    },
    {
      name: "Crunchy Chicken",
      desc: "Petto di pollo sfilacciato arrosto, bacon extra crispy, uovo occhio di bue, salsa Ranch, lattuga, pomodoro.",
      price: 12
    },
    {
      name: "Ocean Beat",
      desc: "Salmone affumicato, uovo occhio di bue, lattuga, pomodoro, avocado, salsa Ranch.",
      price: 16
    },
    {
      name: "Premium Chicken",
      desc: "Doppio pollo crispy marinato tutta la notte, coleslaw di cavolo rosso e bianco, salsa yogurt al cetriolo, salsa piccante affumicata, cipolla rossa sottaceto, salsa della casa.",
      price: 12
    },
    {
      name: "Filetto con Patate Fritte",
      desc: "Filetto di manzo premium con patate fritte croccanti.",
      price: 25
    },
  ],

  // ─── FRITTO GROOVE — Fritti ───────────────────
  fritti: [
    { name: "Dippers",                    desc: "Spiedino di patate croccanti.",                                      price: 4  },
    { name: "Sweet Fries",                desc: "Patatine dolci croccanti.",                                          price: 5  },
    { name: "Crocchette di Patate",       desc: "Dorate, morbide dentro.",                                            price: 5  },
    { name: "Nachos",                     desc: "Classic.",                                                           price: 4  },
    { name: "Nachos Twisted",             desc: "Cheese cheddar, cipolla, bacon.",                                    price: 8  },
    { name: "Anelli di Cipolla",          desc: "7 pezzi, croccanti e dorati.",                                       price: 7  },
    { name: "Chicken Nuggets",            desc: "6 pezzi.",                                                           price: 8  },
    { name: "Mozzarella Bites",           desc: "Bocconcini di mozzarella dorati e filanti.",                        price: 5  },
    { name: "Olive all'Ascolana",         desc: "Olive ripiene e dorate secondo tradizione.",                        price: 6  },
    { name: "Crispy Veggie Bites",        desc: "Verdure fresche in pastella croccante.",                            price: 5  },
    { name: "Zeppole Fritte XL",          desc: "Soffici zeppole fritte preparate al momento.",                      price: 4  },
    { name: "Street Crunch Platter",      desc: "Selezione di fritti misti serviti caldi e croccanti.",              price: 10 },
    { name: "Premio Garibaldino",         desc: "Nuggets speziati alla paprika. By Chef Bruni.",                     price: 9  },
  ],

  // ─── CORNER SWEET VINYL — Dolci ──────────────
  dolci: [
    {
      name: "Pistachio Lime Delight",
      desc: "Piadina farcita con crema di pistacchio, ricotta fresca, scorza di lime e pistacchi tostati.",
      price: 8
    },
    {
      name: "Berry Cream Dream",
      desc: "Piadina farcita con mascarpone, confettura ai frutti di bosco, frutta fresca e zucchero a velo.",
      price: 8
    },
    {
      name: "Nutty Strawberry Bliss",
      desc: "Piadina farcita con crema alla nocciola, fragole fresche e granella di nocciole.",
      price: 8
    },
    {
      name: "Tres Leches Caramel",
      desc: "Pan di Spagna ai tre latti con crema al caramello.",
      price: 7
    },
    {
      name: "Torta Barozzi",
      desc: "Crema al mascarpone, cacao amaro e crumble di arachidi.",
      price: 7
    },
    {
      name: "Cheesecake",
      desc: "Guarnita con marmellata fatta in casa ai frutti di bosco oppure Nutella.",
      price: 7
    },
    {
      name: "Tortino al Cuore Caldo",
      desc: "Al cioccolato o al pistacchio, servito con gelato alla crema.",
      price: 7
    },
    {
      name: "Gelato alla Crema Artigianale",
      desc: "Con Aceto Balsamico di Modena IGP e cristalli di Sale Marino Maldon.",
      price: 6
    },
  ],
};
