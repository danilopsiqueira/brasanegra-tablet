# Cardápio digital Brasa Negra (tablet)

Cardápio para os clientes consultarem no tablet da mesa. As páginas continuam a ser
as imagens feitas no Canva; este site só trata da experiência de navegação.

## O que o cliente tem

- **Categorias no topo** (Entradas, Carnes, Vinhos…): um toque e vai direto à secção.
- **Índice** com miniaturas de todas as páginas.
- **Ampliar**: toque duas vezes ou faça pinça para ler os preços; arraste para mover;
  botão "Reduzir" para voltar.
- **Tablet deitado**: mostra duas páginas lado a lado, como um livro.
- **Volta sozinho ao início** após 2 minutos sem uso, pronto para o próximo cliente.
- **Funciona sem Wi-Fi** depois de aberto uma vez (fica guardado no tablet).
- **Ecrã sempre ligado** enquanto o cardápio está aberto (nos navegadores que permitem).
- Imagens leves (WebP): abre muito mais rápido; ao ampliar carrega a imagem original.

## Atualizar o cardápio

1. Exporte a página do Canva em JPG com uma data nova no nome, ex.: `carnes-20261101.jpg`.
2. Coloque o ficheiro em `assets/`.
3. Em `menu-data.js`, troque o nome antigo pelo novo (ou acrescente uma linha nova).
4. Gere as versões leves (opcional, mas recomendado):
   ```
   pip install pillow
   python3 tools/otimizar-imagens.py
   ```
   Se não fizer este passo, o site usa a imagem original (funciona, só mais lento).
5. Publique (Netlify). Os tablets apanham a versão nova sozinhos na próxima vez que
   voltarem ao início depois de 1 hora ligados, ou ao recarregar a página.

Em `menu-data.js` também pode mudar quanto tempo sem uso até voltar ao início
(`MENU_IDLE_MINUTES`).

## Preparar o tablet

- **Android (Chrome)**: abrir o site → menu ⋮ → "Adicionar ao ecrã principal".
  Abre em ecrã inteiro. Para bloquear o tablet no cardápio use "Afixação de ecrã"
  (Definições → Segurança → Afixar aplicação).
- **iPad (Safari)**: Partilhar → "Adicionar ao ecrã principal". Para bloquear no
  cardápio use "Acesso Guiado" (Definições → Acessibilidade → Acesso Guiado) e
  desligue o bloqueio automático do ecrã.

## Testar no computador

```
python3 -m http.server 8000
```
e abrir http://localhost:8000
