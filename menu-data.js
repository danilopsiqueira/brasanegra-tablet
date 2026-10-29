// =====================================================================
//  CARDAPIO BRASA NEGRA
//  Este e o unico ficheiro que precisa de editar para mudar o cardapio.
//
//  Cada prato tem:
//    name:  nome do prato
//    price: preco em euros, com ponto (ex.: 25.90)
//    photo: foto dentro de assets/produtos/ (pode trocar por fotos reais)
//    unit:  "kg" se o preco for ao quilo (opcional)
//    desc:  descricao curta que aparece ao abrir o prato (opcional)
//
//  Para mudar um preco: altere o numero e publique.
//  Para tirar um prato: apague a linha dele.
//  Para por um selo: acrescente  tag: "Mais pedido"  ou  tag: "Sugestão do chef"
// =====================================================================

window.MENU_CATEGORIES = [
  {
    id: "entradas",
    name: "Entradas",
    cover: "entradas.webp",
    sections: [
      { title: "Couvert", items: [
        { name: "Couvert I", price: 5.35, desc: "Pão, queijo, azeitona e manteigas." },
        { name: "Couvert II", price: 8.30, desc: "Pão de queijo, coxinha, pão, queijo, azeitona e manteigas." }
      ] },
      { title: "Entradas", items: [
        { name: "Batata Frita", price: 3.90, photo: "batata-frita.webp" },
        { name: "Batata Frita c/ Cheddar e Bacon", price: 4.95, photo: "batata-frita-c-cheddar-e-bacon.webp" },
        { name: "Mandioca Frita", price: 7.65, photo: "mandioca-frita.webp" },
        { name: "Mix de Salgadinhos", price: 7.35, photo: "mix-de-salgadinhos.webp" },
        { name: "Polenta Frita", price: 4.80, photo: "polenta-frita.webp" },
        { name: "Pão de Alho", price: 4.30, photo: "pao-de-alho.webp" },
        { name: "Bruschetas", price: 4.60, photo: "bruschetas.webp" },
        { name: "Queijo Fresco", price: 3.50, photo: "queijo-fresco.webp" },
        { name: "Queijo Coalho na Brasa", price: 7.90, photo: "queijo-coalho-na-brasa.webp" }
      ] }
    ]
  },
  {
    id: "carnes",
    name: "Carnes",
    cover: "carnes.webp",
    note: "Todos os pratos são acompanhados de batata frita com ovos rotos e salada. Servem 2 pessoas.",
    sections: [
      { title: "Cortes Tradicionais", items: [
        { name: "Picanha", price: 25.90, photo: "picanha.webp" },
        { name: "Maminha", price: 24.90, photo: "maminha.webp" },
        { name: "Grelhada Mista", price: 29.90, photo: "grelhada-mista.webp" },
        { name: "Costela em Tiras", price: 29.90, photo: "costela-em-tiras.webp" },
        { name: "Fraldinha", price: 25.90, photo: "fraldinha.webp" },
        { name: "Entrecote", price: 28.90, photo: "entrecote.webp" },
        { name: "Costeletão", price: 38.90, photo: "costeletao.webp" }
      ] },
      { title: "Cortes Premium", note: "Maturação 14 dias · preço ao quilo", items: [
        { name: "T-Bone", price: 69.90, photo: "t-bone.webp", unit: "kg" },
        { name: "Tomahawk", price: 79.90, photo: "tomahawk.webp", unit: "kg" },
        { name: "Costeletão Premium", price: 69.90, photo: "costeletao-premium.webp", unit: "kg" }
      ] },
      { title: "Especialidades", items: [
        { name: "Costela no Bafo", price: 38.90, photo: "costela-no-bafo.webp" },
        { name: "Cupim", price: 39.90, photo: "cupim.webp" },
        { name: "Costeletas de Borrego", price: 39.90, photo: "costeletas-de-borrego.webp" },
        { name: "Costeletão à Parmegiana", price: 49.90, photo: "costeletao-a-parmegiana.webp" }
      ] }
    ]
  },
  {
    id: "peixes",
    name: "Peixes",
    cover: "peixes.webp",
    note: "Acompanhados de batata ao murro e vegetais (o bife de atum vem com batata frita).",
    sections: [
      { title: null, items: [
        { name: "Posta de Bacalhau na Brasa", price: 31.90, photo: "posta-de-bacalhau-na-brasa.webp" },
        { name: "Bife de Atum na Frigideira", price: 21.90, photo: "bife-de-atum-na-frigideira.webp" },
        { name: "Camarões à Guilho", price: 23.90, photo: "camaroes-a-guilho.webp" },
        { name: "Polvo à Lagareiro", price: 28.90, photo: "polvo-a-lagareiro.webp" }
      ] }
    ]
  },
  {
    id: "acompanhamentos",
    name: "Acompanhamentos",
    cover: "acompanhamentos.webp",
    note: "Servem 2 pessoas.",
    sections: [
      { title: null, items: [
        { name: "Arroz", price: 3.15, photo: "arroz.webp" },
        { name: "Feijão Preto", price: 4.20, photo: "feijao-preto.webp" },
        { name: "Polenta Cozida", price: 3.50, photo: "polenta-cozida.webp" },
        { name: "Mandioca Cozida", price: 4.10, photo: "mandioca-cozida.webp" },
        { name: "Escondidinho de Costela", price: 9.40, photo: "escondidinho-de-costela.webp" },
        { name: "Batata Frita", price: 2.80, photo: "batata-frita-2.webp" },
        { name: "Polenta Frita", price: 4.20, photo: "polenta-frita-2.webp" },
        { name: "Mandioca Frita", price: 5.30, photo: "mandioca-frita-2.webp" },
        { name: "Salsicha Toscana (2 un.)", price: 2.40, photo: "salsicha-toscana-2-un.webp" },
        { name: "Salsicha de Frango (2 un.)", price: 2.40, photo: "salsicha-de-frango-2-un.webp" },
        { name: "Puré de Batata", price: 2.60, photo: "pure-de-batata.webp" },
        { name: "Vinagrete", price: 1.80, photo: "vinagrete.webp" },
        { name: "Farofa", price: 2.10, photo: "farofa.webp" },
        { name: "Coração de Frango", price: 2.80, photo: "coracao-de-frango.webp" }
      ] }
    ]
  },
  {
    id: "executivo",
    name: "Prato Executivo",
    cover: "executivo.webp",
    note: "Somente ao almoço.",
    sections: [
      { title: null, items: [
        { name: "Lasanha de Frango", price: 13.90, photo: "lasanha-de-frango.webp" },
        { name: "Lasanha de Carne", price: 15.90, photo: "lasanha-de-carne.webp" },
        { name: "Escondidinho de Costela", price: 18.90, photo: "escondidinho-de-costela-2.webp" },
        { name: "Picanha", price: 16.90, photo: "picanha-2.webp" },
        { name: "Salsicha Toscana", price: 13.90, photo: "salsicha-toscana.webp" },
        { name: "Perna de Frango", price: 13.90, photo: "perna-de-frango.webp" },
        { name: "Secretos de Porco Preto", price: 12.90, photo: "secretos-de-porco-preto.webp" }
      ] }
    ]
  },
  {
    id: "grupo",
    name: "Menu Grupo",
    cover: "grupo.webp",
    note: "Mínimo 8 pessoas. Preço por pessoa. Acompanhamentos: arroz, feijão, batata frita c/ ovos rotos, farofa e vinagrete.",
    sections: [
      { title: null, items: [
        { name: "Menu I", price: 31.90, desc: "Carnes: salsicha, perna de frango, fraldinha, maminha e picanha. Bebidas: água, sumos (2 unidades por pessoa), imperial, vinho da casa (Alabastro) e café. 1 sobremesa." },
        { name: "Menu II", price: 36.90, desc: "Carnes: salsicha, perna de frango, plumas de porco preto, fraldinha, maminha, picanha e costeletão. Bebidas: água, sumos (2 unidades por pessoa), imperial e vinho da casa (Alabastro), sangrias e café. 1 sobremesa." }
      ] }
    ]
  },
  {
    id: "sobremesas",
    name: "Sobremesas",
    cover: "sobremesas.webp",
    sections: [
      { title: null, items: [
        { name: "Baba de Camelo", price: 3.90, photo: "baba-de-camelo.webp" },
        { name: "Mousse de Chocolate", price: 4.20, photo: "mousse-de-chocolate.webp" },
        { name: "Mousse de Manga", price: 4.20, photo: "mousse-de-manga.webp" },
        { name: "Mousse de Maracujá", price: 4.20, photo: "mousse-de-maracuja.webp" },
        { name: "Delícia de Morango", price: 4.90, photo: "delicia-de-morango.webp" },
        { name: "Pudim de Leite Condensado", price: 4.90, photo: "pudim-de-leite-condensado.webp" },
        { name: "Tiramissu", price: 5.20, photo: "tiramissu.webp" },
        { name: "Fruta da Época", price: 4.20, photo: "fruta-da-epoca.webp" },
        { name: "Arroz Doce", price: 4.50, photo: "arroz-doce.webp" },
        { name: "Abacaxi na Brasa", price: 4.90, photo: "abacaxi-na-brasa.webp" }
      ] }
    ]
  },
  {
    id: "bebidas",
    name: "Bebidas",
    cover: "bebidas.webp",
    sections: [
      { title: "Águas", items: [
        { name: "Água Mineral", price: 2.00, photo: "agua-mineral.webp" },
        { name: "Água das Pedras", price: 2.00, photo: "agua-das-pedras.webp" },
        { name: "Frize Limão", price: 2.00, photo: "frize-limao.webp" },
        { name: "Frize Ananás", price: 2.00, photo: "frize-ananas.webp" },
        { name: "Frize Clementina", price: 2.00, photo: "frize-clementina.webp" },
        { name: "Frize Groselha", price: 2.00, photo: "frize-groselha.webp" },
        { name: "Frize Lima, Pepino e Gengibre", price: 2.00, photo: "frize-lima-pepino-e-gengibre.webp" },
        { name: "Frize Framboesa e Pimenta Rosa", price: 2.00, photo: "frize-framboesa-e-pimenta-rosa.webp" }
      ] },
      { title: "Sumos", items: [
        { name: "Compal Manga", price: 2.50, photo: "compal-manga.webp" },
        { name: "Compal Pêssego", price: 2.50, photo: "compal-pessego.webp" },
        { name: "Compal Pera", price: 2.50, photo: "compal-pera.webp" },
        { name: "Sumo Natural de Laranja", price: 3.80, photo: "sumo-natural-de-laranja.webp" },
        { name: "Sumo Natural de Ananás e Hortelã", price: 3.80, photo: "sumo-natural-de-ananas-e-hortela.webp" },
        { name: "Sumo Natural de Lima", price: 3.80, photo: "sumo-natural-de-lima.webp" }
      ] },
      { title: "Refrigerantes", items: [
        { name: "Coca-Cola", price: 2.50, photo: "coca-cola.webp" },
        { name: "Coca-Cola Zero", price: 2.50, photo: "coca-cola-zero.webp" },
        { name: "Guaraná", price: 2.50, photo: "guarana.webp" },
        { name: "7Up", price: 2.50, photo: "7up.webp" },
        { name: "Sumol Ananás", price: 2.50, photo: "sumol-ananas.webp" },
        { name: "Sumol Laranja", price: 2.50, photo: "sumol-laranja.webp" },
        { name: "Lipton Manga", price: 2.50, photo: "lipton-manga.webp" },
        { name: "Lipton Pêssego", price: 2.50, photo: "lipton-pessego.webp" },
        { name: "Frutea Limão", price: 2.50, photo: "frutea-limao.webp" }
      ] },
      { title: "Cafés", items: [
        { name: "Café", price: 1.40, photo: "cafe.webp" },
        { name: "Descafeinado", price: 1.40, photo: "descafeinado.webp" },
        { name: "Abatanado", price: 1.40, photo: "abatanado.webp" }
      ] }
    ]
  },
  {
    id: "cervejas",
    name: "Cervejas e Sangrias",
    cover: "cervejas.webp",
    sections: [
      { title: "Cervejas", items: [
        { name: "Imperial", price: 2.25, photo: "imperial.webp" },
        { name: "Sagres", price: 2.50, photo: "sagres.webp" },
        { name: "Sagres sem Álcool", price: 3.20, photo: "sagres-sem-alcool.webp" }
      ] },
      { title: "Sidra", items: [
        { name: "Somersby Maçã", price: 4.20, photo: "somersby-maca.webp" }
      ] },
      { title: "Sangrias", note: "Jarro de 1 litro", items: [
        { name: "Sangria de Vinho Branco", price: 16.50, photo: "sangria-de-vinho-branco.webp" },
        { name: "Sangria de Vinho Tinto", price: 17.50, photo: "sangria-de-vinho-tinto.webp" },
        { name: "Sangria de Espumante", price: 18.75, photo: "sangria-de-espumante.webp" },
        { name: "Da Casa Blue", price: 19.65, photo: "da-casa-blue.webp" },
        { name: "Da Casa Pink", price: 19.65, photo: "da-casa-pink.webp" },
        { name: "Da Casa sem Álcool", price: 18.65, photo: "da-casa-sem-alcool.webp" }
      ] }
    ]
  },
  {
    id: "drinks",
    name: "Drinks",
    cover: "drinks.webp",
    sections: [
      { title: "Caipirinhas", items: [
        { name: "Caipirinha de Lima", price: 9.75, photo: "caipirinha-de-lima.webp" },
        { name: "Caipirinha de Morango", price: 11.45, photo: "caipirinha-de-morango.webp" },
        { name: "Caipirinha de Maracujá", price: 11.45, photo: "caipirinha-de-maracuja.webp" },
        { name: "Caipivinho", price: 9.65, photo: "caipivinho.webp" }
      ] },
      { title: "Gin", items: [
        { name: "Bulldog", price: 12.00, photo: "bulldog.webp" },
        { name: "Monkey 47", price: 17.50, photo: "monkey-47.webp" }
      ] },
      { title: "Licores", items: [
        { name: "Licor 43", price: 8.70, photo: "licor-43.webp" },
        { name: "Licor Beirão", price: 5.20, photo: "licor-beirao.webp" }
      ] },
      { title: "Whiskey", note: "1 dose", items: [
        { name: "Bushmills", price: 4.50, photo: "bushmills.webp" },
        { name: "Cardhu", price: 8.75, photo: "cardhu.webp" }
      ] },
      { title: "Vinho do Porto", items: [
        { name: "Taylor's", price: 3.50, photo: "taylor-s.webp" }
      ] }
    ]
  },
  {
    id: "vinhos",
    name: "Vinhos",
    cover: "vinhos.webp",
    sections: [
      { title: "Vinho Tinto", items: [
        { name: "Dom Martinho", price: 11.70, photo: "dom-martinho.webp" },
        { name: "Catarina Tinto", price: 12.40, photo: "catarina-tinto.webp" },
        { name: "Bacalhôa Syrah", price: 29.75, photo: "bacalhoa-syrah.webp" },
        { name: "Bacalhôa Merlot", price: 30.55, photo: "bacalhoa-merlot.webp" },
        { name: "Bacalhôa Alicante", price: 14.65, photo: "bacalhoa-alicante.webp" },
        { name: "Quinta da Bacalhôa", price: 42.60, photo: "quinta-da-bacalhoa.webp" },
        { name: "Palácio da Bacalhôa", price: 83.60, photo: "palacio-da-bacalhoa.webp" },
        { name: "Quinta do Carmo Reserva Tinto", price: 68.70, photo: "quinta-do-carmo-reserva-tinto.webp" },
        { name: "Quinta do Carmo Tinto", price: 31.00, photo: "quinta-do-carmo-tinto.webp" },
        { name: "Quatro Ventos Reserva", price: 37.40, photo: "quatro-ventos-reserva.webp" },
        { name: "Quatro Ventos Grande Reserva", price: 78.90, photo: "quatro-ventos-grande-reserva.webp" },
        { name: "Quatro Ventos Superior", price: 15.80, photo: "quatro-ventos-superior.webp" },
        { name: "Serras de Azeitão Tinto", price: 7.60, photo: "serras-de-azeitao-tinto.webp" },
        { name: "Bacalhôa Touriga", price: 26.90, photo: "bacalhoa-touriga.webp" },
        { name: "Alabastro Tinto", price: 7.60, photo: "alabastro-tinto.webp" }
      ] },
      { title: "Vinho Branco", items: [
        { name: "Serras de Azeitão Branco", price: 7.45, photo: "serras-de-azeitao-branco.webp" },
        { name: "Quinta do Carmo Branco", price: 19.40, photo: "quinta-do-carmo-branco.webp" },
        { name: "Quinta do Carmo Reserva Branco", price: 34.60, photo: "quinta-do-carmo-reserva-branco.webp" },
        { name: "Catarina Branco", price: 12.40, photo: "catarina-branco.webp" },
        { name: "Alabastro Branco", price: 7.45, photo: "alabastro-branco.webp" }
      ] },
      { title: "Vinho Verde", items: [
        { name: "Casal Mendes Verde", price: 8.65, photo: "casal-mendes-verde.webp" }
      ] },
      { title: "Vinho Rosé", items: [
        { name: "Catarina Rosé", price: 11.70, photo: "catarina-rose.webp" },
        { name: "Casal Mendes Rosé", price: 8.65, photo: "casal-mendes-rose.webp" }
      ] },
      { title: "Vinho a Copo", items: [
        { name: "Copo Bacalhôa Syrah", price: 7.50, photo: "copo-bacalhoa-syrah.webp" },
        { name: "Copo Bacalhôa Merlot", price: 7.70, photo: "copo-bacalhoa-merlot.webp" },
        { name: "Copo Quinta da Bacalhôa", price: 10.70, photo: "copo-quinta-da-bacalhoa.webp" },
        { name: "Copo Palácio da Bacalhôa", price: 21.00, photo: "copo-palacio-da-bacalhoa.webp" },
        { name: "Copo Quinta do Carmo Reserva Tinto", price: 17.20, photo: "copo-quinta-do-carmo-reserva-tinto.webp" },
        { name: "Copo Quatro Ventos Reserva", price: 9.50, photo: "copo-quatro-ventos-reserva.webp" },
        { name: "Copo Quatro Ventos Grande Reserva", price: 19.80, photo: "copo-quatro-ventos-grande-reserva.webp" },
        { name: "Copo Quinta do Carmo Reserva Branco", price: 8.70, photo: "copo-quinta-do-carmo-reserva-branco.webp" }
      ] }
    ]
  },
  {
    id: "espumantes",
    name: "Espumantes e Digestivos",
    cover: "espumantes.webp",
    sections: [
      { title: "Espumantes", items: [
        { name: "Aliança Baga Reserva Branco", price: 15.75, photo: "alianca-baga-reserva-branco.webp" },
        { name: "Aliança Baga Reserva Bruto", price: 19.45, photo: "alianca-baga-reserva-bruto.webp" },
        { name: "Aliança Grande Reserva Pinot Noir", price: 63.40, photo: "alianca-grande-reserva-pinot-noir.webp" },
        { name: "Aliança Grande Reserva Bruto", price: 59.70, photo: "alianca-grande-reserva-bruto.webp" }
      ] },
      { title: "Moscatel", note: "Dose", items: [
        { name: "Bacalhôa Moscatel Corrente", price: 2.80, photo: "bacalhoa-moscatel-corrente.webp" },
        { name: "Bacalhôa Moscatel 5 anos", price: 4.15, photo: "bacalhoa-moscatel-5-anos.webp" },
        { name: "Bacalhôa Moscatel 20 anos", price: 11.50, photo: "bacalhoa-moscatel-20-anos.webp" }
      ] },
      { title: "Moscatel Roxo", note: "Dose", items: [
        { name: "Bacalhôa Moscatel Roxo 10 anos", price: 7.20, photo: "bacalhoa-moscatel-roxo-10-anos.webp" },
        { name: "Bacalhôa Moscatel Roxo 20 anos", price: 16.70, photo: "bacalhoa-moscatel-roxo-20-anos.webp" }
      ] },
      { title: "Aguardente", note: "Dose", items: [
        { name: "Aliança Velha", price: 3.50, photo: "alianca-velha.webp" },
        { name: "Aliança XO 10 anos", price: 8.40, photo: "alianca-xo-10-anos.webp" },
        { name: "Aliança XO 40 anos", price: 19.75, photo: "alianca-xo-40-anos.webp" }
      ] }
    ]
  },
  {
    id: "charutos",
    name: "Charutos",
    cover: "charutos.webp",
    sections: [
      { title: null, items: [
        { name: "Cohiba Wide Short (caixa)", price: 34.00, photo: "cohiba-wide-short-caixa.webp" },
        { name: "Cohiba Wide Short (unidade)", price: 7.00, photo: "cohiba-wide-short-unidade.webp" },
        { name: "Flor de Copán Short Robusto", price: 17.00, photo: "flor-de-copan-short-robusto.webp" },
        { name: "Partagás Serie D Nº 4", price: 26.00, photo: "partagas-serie-d-no-4.webp" },
        { name: "Romeo y Julieta", price: 78.00, photo: "romeo-y-julieta.webp" }
      ] }
    ]
  }
];

// Pagina de avaliacao (aparece como ultimo quadrado no inicio).
window.MENU_REVIEW_IMAGE = "assets/avaliacao-20260814.jpg";

// Minutos sem ninguem tocar ate voltar ao ecra de boas-vindas.
window.MENU_IDLE_MINUTES = 2;

// Minutos sem ninguem tocar ate limpar "A minha escolha" (proximo cliente).
window.MENU_CLEAR_LIST_MINUTES = 20;
