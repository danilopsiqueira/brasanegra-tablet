// =====================================================================
//  PAGINAS DO CARDAPIO
//  Este e o unico ficheiro que precisa de editar para mudar o cardapio.
//
//  - file:     nome da imagem dentro da pasta assets/ (exportada do Canva)
//  - category: nome que aparece no menu de categorias no topo
//  - chip:     false = a pagina nao cria um botao proprio no topo
//
//  Para trocar uma pagina: exporte a nova imagem com outra data no nome
//  (ex.: carnes-20261101.jpg), coloque-a em assets/ e mude o nome aqui.
//  Depois corra "python3 tools/otimizar-imagens.py" para gerar as versoes
//  leves (se nao correr, o site usa a imagem original, apenas mais lenta).
// =====================================================================

window.MENU_PAGES = [
  { file: "inicio-20260824.jpg", category: "Início" },
  { file: "entradas-20260824.jpg", category: "Entradas" },
  { file: "carnes-20260824.jpg", category: "Carnes" },
  { file: "carnes-2-20260824.jpg", category: "Carnes" },
  { file: "peixes-20260824.jpg", category: "Peixes" },
  { file: "acompanhamentos-20260824.jpg", category: "Acompanhamentos" },
  { file: "prato-executivo-20260824.jpg", category: "Prato Executivo" },
  { file: "menu-grupo-20260824.jpg", category: "Menu Grupo" },
  { file: "aguas-e-sumos-20260824.jpg", category: "Bebidas" },
  { file: "refrigerantes-20260824.jpg", category: "Bebidas" },
  { file: "cervejas-e-sangrias-20260824.jpg", category: "Bebidas" },
  { file: "drinks-20260824.jpg", category: "Drinks" },
  { file: "vinhos-20260824.jpg", category: "Vinhos" },
  { file: "vinhos-tinto-20260824.jpg", category: "Vinhos" },
  { file: "taca-vinho-20260824.jpg", category: "Vinhos" },
  { file: "espumantes-20260824.jpg", category: "Vinhos" },
  { file: "charutos-20260824.jpg", category: "Charutos" },
  { file: "sobremesas-20260824.jpg", category: "Sobremesas" },
  { file: "21-20260824.jpg", category: "Contactos", chip: false },
  { file: "avaliacao-20260814.jpg", category: "Avalie-nos" }
];

// Minutos sem ninguem tocar no tablet ate voltar a primeira pagina.
window.MENU_IDLE_MINUTES = 2;
