# Cardápio digital Brasa Negra (tablet)

Cardápio para os clientes consultarem no tablet da mesa.

## Como o cliente usa

1. **Boas-vindas**: ecrã com brasas a subir e um botão grande "Toque para ver o cardápio".
2. **Categorias com foto**: Entradas, Carnes, Peixes, Bebidas, Vinhos…, mais "Avalie-nos".
3. **Pratos**: cada prato com foto e preço. Tocar no prato abre-o em grande
   (com o que acompanha, notas e preço); deslizar o dedo passa ao prato seguinte.
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

- As fotos atuais foram recortadas das páginas do Canva (`assets/produtos/`) e já trazem
  o nome e o preço escritos. **Se mudar um preço, mude também a foto** (ou passe a usar
  uma foto real, abaixo), senão a foto mostra o preço antigo.
- **Fotos reais** (recomendado): coloque a foto em `assets/fotos/` e escreva
  `photo: "fotos/picanha.jpg"`. Como a foto real não tem texto, o nome e o preço passam
  a aparecer automaticamente por baixo da foto, sempre certos.
- As capas das categorias estão em `assets/capas/`.

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
