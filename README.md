# Cardápio digital Brasa Negra (tablet)

Cardápio para os clientes consultarem no tablet da mesa.

## Como o cliente usa

1. **Boas-vindas**: ecrã com brasas a subir e um botão grande "Toque para ver o cardápio".
2. **Início simples**: a fila "Saídos da brasa" com as carnes em foto grande e, por baixo,
   as categorias com foto (mais "Avalie-nos").
3. **Pratos**: cada prato com foto e preço. Tocar no prato abre-o em grande
   (descrição, o que acompanha, preço e uma sugestão de vinho); deslizar passa ao seguinte.
   Tocar na foto abre-a no ecrã inteiro: dois toques ou dois dedos para ampliar,
   deslizar para ver o prato seguinte.
4. **A minha escolha**: o botão **+** ao lado do preço guarda o prato numa lista, com quantidades
   e total estimado. No fim, o cliente mostra a lista ao empregado.

5. **Procurar**: no início, "Procurar um prato ou bebida" encontra qualquer produto pelo nome.
6. **Mostrar ao empregado**: na lista, mostra o pedido em letra grande, fácil de ler.

Também:
- Com o tablet deitado, as categorias ficam numa coluna à esquerda, sempre visíveis.
- O botão "voltar" do tablet fecha a janela aberta em vez de sair do cardápio.
- Volta ao ecrã de boas-vindas depois de 3 minutos sem uso.
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
- As fotos levaram um tratamento de cor (mais quentes, com mais contraste e nitidez).
  Fotos novas que acrescentar entram como estão.
- `assets/fotos/hd/` tem versões em alta resolução (1200 px), usadas no detalhe e no ecrã
  inteiro. Se uma foto não tiver versão HD, usa-se a normal automaticamente.
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
