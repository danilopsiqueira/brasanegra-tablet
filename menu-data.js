// =====================================================================
//  CARDAPIO BRASA NEGRA
//  Este e o unico ficheiro que precisa de editar para mudar o cardapio.
//
//  Cada prato pode ter:
//    name:     nome do prato
//    price:    preco em euros, com ponto (ex.: 25.90)
//    photo:    foto. "fotos/..." = foto limpa (assets/fotos/);
//              sem "fotos/" = imagem antiga do Canva, com texto (assets/produtos/)
//    desc:     descricao curta que da agua na boca (opcional)
//    pairing:  nome exato de um vinho deste ficheiro, sugerido com o prato (opcional)
//    tag:      selo, ex.: "Mais pedido" ou "Sugestão da casa" (opcional)
//    featured: true = aparece na fila "Saídos da brasa" no inicio (opcional)
//    unit:     "kg" se o preco for ao quilo (opcional)
//
//  Para mudar um preco: altere o numero e publique.
//  Para tirar um prato: apague a linha dele.
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
        { name: "Batata Frita", price: 3.90, photo: "fotos/batata-frita.webp" },
        { name: "Batata Frita c/ Cheddar e Bacon", price: 4.95, photo: "fotos/batata-frita-c-cheddar-e-bacon.webp", desc: "Batata frita coberta com cheddar derretido e bacon estaladiço." },
        { name: "Mandioca Frita", price: 7.65, photo: "fotos/mandioca-frita.webp" },
        { name: "Mix de Salgadinhos", price: 7.35, photo: "fotos/mix-de-salgadinhos.webp", desc: "Coxinhas, bolinhas de queijo e outros salgadinhos para petiscar." },
        { name: "Polenta Frita", price: 4.80, photo: "fotos/polenta-frita.webp" },
        { name: "Pão de Alho", price: 4.30, photo: "fotos/pao-de-alho.webp", desc: "Pão estaladiço com manteiga de alho, aquecido na brasa." },
        { name: "Bruschetas", price: 4.60, photo: "fotos/bruschetas.webp", desc: "Pão tostado com tomate fresco e queijo derretido." },
        { name: "Queijo Fresco", price: 3.50, photo: "fotos/queijo-fresco.webp" },
        { name: "Queijo Coalho na Brasa", price: 7.90, photo: "fotos/queijo-coalho-na-brasa.webp", desc: "Espetadas de queijo coalho tostadas na brasa, douradas e a derreter." }
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
        { name: "Picanha", price: 25.90, photo: "fotos/picanha.webp", featured: true, desc: "O corte rei do churrasco brasileiro: suculenta, com a capa de gordura a derreter na brasa.", pairing: "Bacalhôa Touriga" },
        { name: "Maminha", price: 24.90, photo: "fotos/maminha.webp", featured: true, desc: "Macia e cheia de sabor, grelhada devagar e servida em fatias.", pairing: "Bacalhôa Touriga" },
        { name: "Grelhada Mista", price: 29.90, photo: "fotos/grelhada-mista.webp", featured: true, desc: "Uma seleção de carnes da casa acabadas de sair da brasa, para partilhar.", pairing: "Quatro Ventos Reserva" },
        { name: "Costela em Tiras", price: 29.90, photo: "fotos/costela-em-tiras.webp", featured: true, desc: "Costela grelhada na brasa, tostada por fora e suculenta junto ao osso.", pairing: "Quatro Ventos Reserva" },
        { name: "Fraldinha", price: 25.90, photo: "fotos/fraldinha.webp", desc: "Corte de fibra longa, muito suculento e com sabor intenso.", pairing: "Bacalhôa Touriga" },
        { name: "Entrecote", price: 28.90, photo: "fotos/entrecote.webp", featured: true, desc: "Corte marmoreado, macio e saboroso, selado na brasa.", pairing: "Quatro Ventos Reserva" },
        { name: "Costeletão", price: 38.90, photo: "fotos/costeletao.webp", featured: true, desc: "Corte generoso com osso, dourado por fora e suculento por dentro.", pairing: "Quinta do Carmo Reserva Tinto" }
      ] },
      { title: "Cortes Premium", note: "Maturação 14 dias · preço ao quilo", items: [
        { name: "T-Bone", price: 69.90, photo: "fotos/t-bone.webp", unit: "kg", featured: true, desc: "Dois cortes num só, o lombo e o vazio, unidos pelo osso em T.", pairing: "Quinta do Carmo Reserva Tinto" },
        { name: "Tomahawk", price: 79.90, photo: "fotos/tomahawk.webp", unit: "kg", tag: "Sugestão da casa", featured: true, desc: "O espetáculo da casa: costeleta de osso longo, maturada e grelhada na brasa.", pairing: "Quinta do Carmo Reserva Tinto" },
        { name: "Costeletão Premium", price: 69.90, photo: "fotos/costeletao-premium.webp", unit: "kg", desc: "Costeletão maturado 14 dias, ainda mais macio e saboroso.", pairing: "Quinta do Carmo Reserva Tinto" }
      ] },
      { title: "Especialidades", items: [
        { name: "Costela no Bafo", price: 38.90, photo: "fotos/costela-no-bafo.webp", desc: "Cozinhada lentamente até se desfazer ao toque do garfo.", pairing: "Bacalhôa Alicante" },
        { name: "Cupim", price: 39.90, photo: "cupim.webp", desc: "Corte típico brasileiro, cozinhado devagar até ficar macio e suculento.", pairing: "Bacalhôa Alicante" },
        { name: "Costeletas de Borrego", price: 39.90, photo: "fotos/costeletas-de-borrego.webp", desc: "Costeletas tenras de borrego, grelhadas com ervas aromáticas.", pairing: "Bacalhôa Alicante" },
        { name: "Costeletão à Parmegiana", price: 49.90, photo: "costeletao-a-parmegiana.webp", desc: "Costeletão panado, coberto com molho de tomate e queijo gratinado.", pairing: "Bacalhôa Alicante" }
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
        { name: "Posta de Bacalhau na Brasa", price: 31.90, photo: "fotos/posta-de-bacalhau-na-brasa.webp", desc: "Posta alta de bacalhau grelhada na brasa e regada com azeite.", pairing: "Quinta do Carmo Branco" },
        { name: "Bife de Atum na Frigideira", price: 21.90, photo: "fotos/bife-de-atum-na-frigideira.webp", desc: "Bife de atum selado na frigideira, dourado por fora.", pairing: "Quinta do Carmo Branco" },
        { name: "Camarões à Guilho", price: 23.90, photo: "fotos/camaroes-a-guilho.webp", desc: "Camarões salteados em azeite e alho, servidos a fervilhar.", pairing: "Quinta do Carmo Branco" },
        { name: "Polvo à Lagareiro", price: 28.90, photo: "fotos/polvo-a-lagareiro.webp", desc: "Polvo assado e regado com azeite e alho, à moda portuguesa.", pairing: "Quinta do Carmo Branco" }
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
        { name: "Arroz", price: 3.15, photo: "fotos/arroz.webp" },
        { name: "Feijão Preto", price: 4.20, photo: "fotos/feijao-preto.webp" },
        { name: "Polenta Cozida", price: 3.50, photo: "fotos/polenta-cozida.webp" },
        { name: "Mandioca Cozida", price: 4.10, photo: "fotos/mandioca-cozida.webp" },
        { name: "Escondidinho de Costela", price: 9.40, photo: "escondidinho-de-costela.webp" },
        { name: "Batata Frita", price: 2.80, photo: "fotos/batata-frita-acompanhamentos.webp" },
        { name: "Polenta Frita", price: 4.20, photo: "fotos/polenta-frita-acompanhamentos.webp" },
        { name: "Mandioca Frita", price: 5.30, photo: "fotos/mandioca-frita-acompanhamentos.webp" },
        { name: "Salsicha Toscana (2 un.)", price: 2.40, photo: "fotos/salsicha-toscana-2-un.webp" },
        { name: "Salsicha de Frango (2 un.)", price: 2.40, photo: "fotos/salsicha-de-frango-2-un.webp" },
        { name: "Puré de Batata", price: 2.60, photo: "fotos/pure-de-batata.webp" },
        { name: "Vinagrete", price: 1.80, photo: "fotos/vinagrete.webp" },
        { name: "Farofa", price: 2.10, photo: "fotos/farofa.webp" },
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
        { name: "Lasanha de Frango", price: 13.90, photo: "fotos/lasanha-de-frango.webp" },
        { name: "Lasanha de Carne", price: 15.90, photo: "fotos/lasanha-de-carne.webp" },
        { name: "Escondidinho de Costela", price: 18.90, photo: "fotos/escondidinho-de-costela-executivo.webp" },
        { name: "Picanha", price: 16.90, photo: "fotos/picanha-executivo.webp" },
        { name: "Salsicha Toscana", price: 13.90, photo: "fotos/salsicha-toscana-executivo.webp" },
        { name: "Perna de Frango", price: 13.90, photo: "perna-de-frango.webp" },
        { name: "Secretos de Porco Preto", price: 12.90, photo: "fotos/secretos-de-porco-preto.webp" }
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
        { name: "Baba de Camelo", price: 3.90, photo: "fotos/baba-de-camelo.webp" },
        { name: "Mousse de Chocolate", price: 4.20, photo: "fotos/mousse-de-chocolate.webp" },
        { name: "Mousse de Manga", price: 4.20, photo: "fotos/mousse-de-manga.webp" },
        { name: "Mousse de Maracujá", price: 4.20, photo: "fotos/mousse-de-maracuja.webp" },
        { name: "Delícia de Morango", price: 4.90, photo: "fotos/delicia-de-morango.webp" },
        { name: "Pudim de Leite Condensado", price: 4.90, photo: "fotos/pudim-de-leite-condensado.webp", desc: "Cremoso, com calda de caramelo, como em casa." },
        { name: "Tiramissu", price: 5.20, photo: "fotos/tiramissu.webp", desc: "Camadas de creme de mascarpone, café e cacau." },
        { name: "Fruta da Época", price: 4.20, photo: "fotos/fruta-da-epoca.webp" },
        { name: "Arroz Doce", price: 4.50, photo: "arroz-doce.webp" },
        { name: "Abacaxi na Brasa", price: 4.90, photo: "fotos/abacaxi-na-brasa.webp", desc: "Abacaxi caramelizado na brasa, doce e quente." }
      ] }
    ]
  },
  {
    id: "bebidas",
    name: "Bebidas",
    cover: "bebidas.webp",
    sections: [
      { title: "Águas", items: [
        { name: "Água Mineral", price: 2.00, photo: "fotos/agua-mineral.webp" },
        { name: "Água das Pedras", price: 2.00, photo: "fotos/agua-das-pedras.webp" },
        { name: "Frize Limão", price: 2.00, photo: "fotos/frize-limao.webp" },
        { name: "Frize Ananás", price: 2.00, photo: "fotos/frize-ananas.webp" },
        { name: "Frize Clementina", price: 2.00, photo: "fotos/frize-clementina.webp" },
        { name: "Frize Groselha", price: 2.00, photo: "fotos/frize-groselha.webp" },
        { name: "Frize Lima, Pepino e Gengibre", price: 2.00, photo: "frize-lima-pepino-e-gengibre.webp" },
        { name: "Frize Framboesa e Pimenta Rosa", price: 2.00, photo: "frize-framboesa-e-pimenta-rosa.webp" }
      ] },
      { title: "Sumos", items: [
        { name: "Compal Manga", price: 2.50, photo: "fotos/compal-manga.webp" },
        { name: "Compal Pêssego", price: 2.50, photo: "fotos/compal-pessego.webp" },
        { name: "Compal Pera", price: 2.50, photo: "fotos/compal-pera.webp" },
        { name: "Sumo Natural de Laranja", price: 3.80, photo: "fotos/sumo-natural-de-laranja.webp" },
        { name: "Sumo Natural de Ananás e Hortelã", price: 3.80, photo: "fotos/sumo-natural-de-ananas-e-hortela.webp" },
        { name: "Sumo Natural de Lima", price: 3.80, photo: "fotos/sumo-natural-de-lima.webp" }
      ] },
      { title: "Refrigerantes", items: [
        { name: "Coca-Cola", price: 2.50, photo: "fotos/coca-cola.webp" },
        { name: "Coca-Cola Zero", price: 2.50, photo: "fotos/coca-cola-zero.webp" },
        { name: "Guaraná", price: 2.50, photo: "fotos/guarana.webp" },
        { name: "7Up", price: 2.50, photo: "fotos/7up.webp" },
        { name: "Sumol Ananás", price: 2.50, photo: "fotos/sumol-ananas.webp" },
        { name: "Sumol Laranja", price: 2.50, photo: "fotos/sumol-laranja.webp" },
        { name: "Lipton Manga", price: 2.50, photo: "fotos/lipton-manga.webp" },
        { name: "Lipton Pêssego", price: 2.50, photo: "fotos/lipton-pessego.webp" },
        { name: "Frutea Limão", price: 2.50, photo: "fotos/frutea-limao.webp" }
      ] },
      { title: "Cafés", items: [
        { name: "Café", price: 1.40, photo: "fotos/cafe.webp" },
        { name: "Descafeinado", price: 1.40, photo: "fotos/descafeinado.webp" },
        { name: "Abatanado", price: 1.40, photo: "fotos/abatanado.webp" }
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
        { name: "Sagres sem Álcool", price: 3.20, photo: "fotos/sagres-sem-alcool.webp" }
      ] },
      { title: "Sidra", items: [
        { name: "Somersby Maçã", price: 4.20, photo: "fotos/somersby-maca.webp" }
      ] },
      { title: "Sangrias", note: "Jarro de 1 litro", items: [
        { name: "Sangria de Vinho Branco", price: 16.50, photo: "fotos/sangria-de-vinho-branco.webp" },
        { name: "Sangria de Vinho Tinto", price: 17.50, photo: "fotos/sangria-de-vinho-tinto.webp" },
        { name: "Sangria de Espumante", price: 18.75, photo: "fotos/sangria-de-espumante.webp" },
        { name: "Da Casa Blue", price: 19.65, photo: "fotos/da-casa-blue.webp" },
        { name: "Da Casa Pink", price: 19.65, photo: "fotos/da-casa-pink.webp" },
        { name: "Da Casa sem Álcool", price: 18.65, photo: "fotos/da-casa-sem-alcool.webp" }
      ] }
    ]
  },
  {
    id: "drinks",
    name: "Drinks",
    cover: "drinks.webp",
    sections: [
      { title: "Caipirinhas", items: [
        { name: "Caipirinha de Lima", price: 9.75, photo: "fotos/caipirinha-de-lima.webp" },
        { name: "Caipirinha de Morango", price: 11.45, photo: "fotos/caipirinha-de-morango.webp" },
        { name: "Caipirinha de Maracujá", price: 11.45, photo: "fotos/caipirinha-de-maracuja.webp" },
        { name: "Caipivinho", price: 9.65, photo: "fotos/caipivinho.webp" }
      ] },
      { title: "Gin", items: [
        { name: "Bulldog", price: 12.00, photo: "fotos/bulldog.webp" },
        { name: "Monkey 47", price: 17.50, photo: "fotos/monkey-47.webp" }
      ] },
      { title: "Licores", items: [
        { name: "Licor 43", price: 8.70, photo: "fotos/licor-43.webp" },
        { name: "Licor Beirão", price: 5.20, photo: "fotos/licor-beirao.webp" }
      ] },
      { title: "Whiskey", note: "1 dose", items: [
        { name: "Bushmills", price: 4.50, photo: "fotos/bushmills.webp" },
        { name: "Cardhu", price: 8.75, photo: "fotos/cardhu.webp" }
      ] },
      { title: "Vinho do Porto", items: [
        { name: "Taylor's", price: 3.50, photo: "fotos/taylor-s.webp" }
      ] }
    ]
  },
  {
    id: "vinhos",
    name: "Vinhos",
    cover: "vinhos.webp",
    sections: [
      { title: "Vinho Tinto", items: [
        { name: "Dom Martinho", price: 11.70, photo: "fotos/dom-martinho.webp" },
        { name: "Catarina Tinto", price: 12.40, photo: "fotos/catarina-tinto.webp" },
        { name: "Bacalhôa Syrah", price: 29.75, photo: "fotos/bacalhoa-syrah.webp" },
        { name: "Bacalhôa Merlot", price: 30.55, photo: "fotos/bacalhoa-merlot.webp" },
        { name: "Bacalhôa Alicante", price: 14.65, photo: "fotos/bacalhoa-alicante.webp" },
        { name: "Quinta da Bacalhôa", price: 42.60, photo: "fotos/quinta-da-bacalhoa.webp" },
        { name: "Palácio da Bacalhôa", price: 83.60, photo: "fotos/palacio-da-bacalhoa.webp" },
        { name: "Quinta do Carmo Reserva Tinto", price: 68.70, photo: "fotos/quinta-do-carmo-reserva-tinto.webp" },
        { name: "Quinta do Carmo Tinto", price: 31.00, photo: "fotos/quinta-do-carmo-tinto.webp" },
        { name: "Quatro Ventos Reserva", price: 37.40, photo: "fotos/quatro-ventos-reserva.webp" },
        { name: "Quatro Ventos Grande Reserva", price: 78.90, photo: "fotos/quatro-ventos-grande-reserva.webp" },
        { name: "Quatro Ventos Superior", price: 15.80, photo: "fotos/quatro-ventos-superior.webp" },
        { name: "Serras de Azeitão Tinto", price: 7.60, photo: "fotos/serras-de-azeitao-tinto.webp" },
        { name: "Bacalhôa Touriga", price: 26.90, photo: "fotos/bacalhoa-touriga.webp" },
        { name: "Alabastro Tinto", price: 7.60, photo: "fotos/alabastro-tinto.webp" }
      ] },
      { title: "Vinho Branco", items: [
        { name: "Serras de Azeitão Branco", price: 7.45, photo: "fotos/serras-de-azeitao-branco.webp" },
        { name: "Quinta do Carmo Branco", price: 19.40, photo: "fotos/quinta-do-carmo-branco.webp" },
        { name: "Quinta do Carmo Reserva Branco", price: 34.60, photo: "fotos/quinta-do-carmo-reserva-branco.webp" },
        { name: "Catarina Branco", price: 12.40, photo: "fotos/catarina-branco.webp" },
        { name: "Alabastro Branco", price: 7.45, photo: "fotos/alabastro-branco.webp" }
      ] },
      { title: "Vinho Verde", items: [
        { name: "Casal Mendes Verde", price: 8.65, photo: "fotos/casal-mendes-verde.webp" }
      ] },
      { title: "Vinho Rosé", items: [
        { name: "Catarina Rosé", price: 11.70, photo: "fotos/catarina-rose.webp" },
        { name: "Casal Mendes Rosé", price: 8.65, photo: "fotos/casal-mendes-rose.webp" }
      ] },
      { title: "Vinho a Copo", items: [
        { name: "Copo Bacalhôa Syrah", price: 7.50, photo: "fotos/copo-bacalhoa-syrah.webp" },
        { name: "Copo Bacalhôa Merlot", price: 7.70, photo: "fotos/copo-bacalhoa-merlot.webp" },
        { name: "Copo Quinta da Bacalhôa", price: 10.70, photo: "fotos/copo-quinta-da-bacalhoa.webp" },
        { name: "Copo Palácio da Bacalhôa", price: 21.00, photo: "fotos/copo-palacio-da-bacalhoa.webp" },
        { name: "Copo Quinta do Carmo Reserva Tinto", price: 17.20, photo: "fotos/copo-quinta-do-carmo-reserva-tinto.webp" },
        { name: "Copo Quatro Ventos Reserva", price: 9.50, photo: "fotos/copo-quatro-ventos-reserva.webp" },
        { name: "Copo Quatro Ventos Grande Reserva", price: 19.80, photo: "fotos/copo-quatro-ventos-grande-reserva.webp" },
        { name: "Copo Quinta do Carmo Reserva Branco", price: 8.70, photo: "fotos/copo-quinta-do-carmo-reserva-branco.webp" }
      ] }
    ]
  },
  {
    id: "espumantes",
    name: "Espumantes e Digestivos",
    cover: "espumantes.webp",
    sections: [
      { title: "Espumantes", items: [
        { name: "Aliança Baga Reserva Branco", price: 15.75, photo: "fotos/alianca-baga-reserva-branco.webp" },
        { name: "Aliança Baga Reserva Bruto", price: 19.45, photo: "fotos/alianca-baga-reserva-bruto.webp" },
        { name: "Aliança Grande Reserva Pinot Noir", price: 63.40, photo: "fotos/alianca-grande-reserva-pinot-noir.webp" },
        { name: "Aliança Grande Reserva Bruto", price: 59.70, photo: "fotos/alianca-grande-reserva-bruto.webp" }
      ] },
      { title: "Moscatel", note: "Dose", items: [
        { name: "Bacalhôa Moscatel Corrente", price: 2.80, photo: "fotos/bacalhoa-moscatel-corrente.webp" },
        { name: "Bacalhôa Moscatel 5 anos", price: 4.15, photo: "fotos/bacalhoa-moscatel-5-anos.webp" },
        { name: "Bacalhôa Moscatel 20 anos", price: 11.50, photo: "fotos/bacalhoa-moscatel-20-anos.webp" }
      ] },
      { title: "Moscatel Roxo", note: "Dose", items: [
        { name: "Bacalhôa Moscatel Roxo 10 anos", price: 7.20, photo: "fotos/bacalhoa-moscatel-roxo-10-anos.webp" },
        { name: "Bacalhôa Moscatel Roxo 20 anos", price: 16.70, photo: "fotos/bacalhoa-moscatel-roxo-20-anos.webp" }
      ] },
      { title: "Aguardente", note: "Dose", items: [
        { name: "Aliança Velha", price: 3.50, photo: "fotos/alianca-velha.webp" },
        { name: "Aliança XO 10 anos", price: 8.40, photo: "fotos/alianca-xo-10-anos.webp" },
        { name: "Aliança XO 40 anos", price: 19.75, photo: "fotos/alianca-xo-40-anos.webp" }
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
        { name: "Cohiba Wide Short (unidade)", price: 7.00, photo: "fotos/cohiba-wide-short-unidade.webp" },
        { name: "Flor de Copán Short Robusto", price: 17.00, photo: "flor-de-copan-short-robusto.webp" },
        { name: "Partagás Serie D Nº 4", price: 26.00, photo: "fotos/partagas-serie-d-no-4.webp" },
        { name: "Romeo y Julieta", price: 78.00, photo: "fotos/romeo-y-julieta.webp" }
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
