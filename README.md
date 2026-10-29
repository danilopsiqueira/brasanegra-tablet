# Cardápio digital Brasa Negra (tablet)

Cardápio para os clientes consultarem no tablet da mesa.

## Como o cliente usa

1. **Boas-vindas**: ecrã com brasas a subir e um botão grande "Toque para ver o cardápio".
2. **Início que abre o apetite**: destaque "Da brasa para a sua mesa", a fila "Saídos da brasa"
   com as carnes, e as categorias com foto (mais "Avalie-nos").
3. **Pratos**: cada prato com foto e preço. Tocar no prato abre-o em grande
   (descrição, o que acompanha, preço e uma sugestão de vinho); deslizar passa ao seguinte.
4. **A minha escolha**: o botão **+ Juntar** guarda o prato numa lista, com quantidades
   e total estimado. No fim, o cliente mostra a lista ao empregado.

Também:
- Volta ao ecrã de boas-vindas depois de 2 minutos sem uso.
- A lista "A minha escolha" é apagada depois de 20 minutos sem uso (mesa nova).
- Funciona sem Wi-Fi depois de aberto uma vez, e mantém o ecrã ligado.
- No fim de cada categoria há um botão para passar à seguinte.

## Atualizar o cardápio

Tudo está em **`menu-data.js`**:

- **Mudar um preço**: altere o número (`price: 25.90`) e publique.
- **Tirar um prato**: apague a linha dele.
- **Acrescentar um prato**: copie uma linha parecida e mude nome, preço e foto.
- **Descrição**: acrescente `desc: "Corte nobre grelhado na brasa"` à linha do prato.
- **Selo**: acrescente `tag: "Mais pedido"` ou `tag: "Sugestão do chef"`.

### Fotos

- **Fotos limpas** (sem texto) ficam em `assets/fotos/` e escrevem-se `photo: "fotos/picanha.webp"`.
  O nome, o preço e a descrição aparecem por baixo, sempre certos.
- **Ainda com texto do Canva** (`assets/produtos/`): Cupim, Costeletão à Parmegiana,
  Escondidinho de Costela (acompanhamento), Coração de Frango, Perna de Frango (executivo),
  Arroz Doce, Imperial, Sagres, Frize Lima/Pepino/Gengibre, Frize Framboesa/Pimenta Rosa,
  Cohiba Wide Short (caixa) e Flor de Copán. Quando tiver fotos limpas destes, coloque-as em
  `assets/fotos/` e troque o `photo`.
- Algumas fotos limpas foram obtidas apagando o texto das imagens do Canva (copos de vinho,
  charutos, pratos executivos…). Se notar alguma mancha, troque por uma foto nova.
- **Capas** das categorias e a foto grande do início: `assets/capas/`.
- As **sugestões de vinho** (`pairing`) e as **descrições** (`desc`) foram escritas como ponto
  de partida: ajuste à vontade.

## Preparar o tablet

- **Android (Chrome)**: abrir o site → menu ⋮ → "Adicionar ao ecrã principal".
  Para prender o tablet no cardápio: Definições → Segurança → "Afixar aplicação".
- **iPad (Safari)**: Partilhar → "Adicionar ao ecrã principal". Para prender no
  cardápio: Definições → Acessibilidade → "Acesso Guiado"; desligue o bloqueio automático.

## Testar no computador

```
python3 -m http.server 8000
```
e abrir http://localhost:8000
