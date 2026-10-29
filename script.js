// O conteudo do cardapio fica em menu-data.js. Este ficheiro so trata do comportamento.

const categories = window.MENU_CATEGORIES || [];
const idleMinutes = window.MENU_IDLE_MINUTES || 2;
const clearListMinutes = window.MENU_CLEAR_LIST_MINUTES || 20;
const LIST_KEY = "brasa-negra-escolha";
const loadedAt = Date.now();

const $ = (selector) => document.querySelector(selector);
const screens = { welcome: $("#welcome"), home: $("#home"), category: $("#category") };
const categoryGrid = $("#category-grid");
const tabsNav = $("#tabs");
const categoryScroll = $("#category-scroll");
const categoryContent = $("#category-content");
const detailOverlay = $("#detail");
const listOverlay = $("#list");
const reviewOverlay = $("#review");
const listBar = $("#list-bar");
const toast = $("#toast");

const priceFormat = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" });
const plusIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>';

let currentScreen = "welcome";
let detailItems = [];
let detailIndex = 0;
let idleTimer;
let toastTimer;
let wakeLock = null;
let clearConfirm = false;

// ---------- Dados ----------

function slug(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const itemsById = new Map();

categories.forEach((category) => {
  category.sections.forEach((section) => {
    section.items.forEach((item) => {
      item.id = `${category.id}/${slug(item.name)}`;
      item.category = category;
      item.section = section;
      itemsById.set(item.id, item);
    });
  });
});

function categoryItems(category) {
  return category.sections.flatMap((section) => section.items);
}

function photoUrl(item) {
  if (!item.photo) return null;
  // Fotos reais (sem texto por cima) ficam noutra pasta, ex.: "fotos/picanha.jpg".
  return item.photo.includes("/") ? `assets/${item.photo}` : `assets/produtos/${item.photo}`;
}

function formatPrice(item) {
  return priceFormat.format(item.price);
}

function priceText(item) {
  return item.unit === "kg" ? `${formatPrice(item)}/kg` : formatPrice(item);
}

function findItemByName(name) {
  return [...itemsById.values()].find((item) => item.name === name);
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// ---------- A minha escolha ----------

let choice = new Map();

function readSavedChoice() {
  try {
    return JSON.parse(localStorage.getItem(LIST_KEY) || "null");
  } catch (error) {
    return null;
  }
}

function loadChoice() {
  const saved = readSavedChoice();
  if (!saved || Date.now() - saved.at > clearListMinutes * 60 * 1000) return;
  Object.entries(saved.items || {}).forEach(([id, qty]) => {
    if (itemsById.has(id) && qty > 0) choice.set(id, qty);
  });
}

function saveChoice() {
  try {
    localStorage.setItem(LIST_KEY, JSON.stringify({ at: Date.now(), items: Object.fromEntries(choice) }));
  } catch (error) {
    // Sem armazenamento (modo privado): a lista funciona na mesma enquanto a pagina estiver aberta.
  }
}

function choiceCount() {
  let total = 0;
  choice.forEach((qty) => (total += qty));
  return total;
}

function choiceTotal() {
  let total = 0;
  choice.forEach((qty, id) => {
    const item = itemsById.get(id);
    if (item.unit !== "kg") total += item.price * qty;
  });
  return total;
}

function hasKgItems() {
  return [...choice.keys()].some((id) => itemsById.get(id).unit === "kg");
}

function setQuantity(item, qty) {
  const before = choice.get(item.id) || 0;
  if (qty <= 0) choice.delete(item.id);
  else choice.set(item.id, qty);
  saveChoice();
  refreshChoiceUi(qty > before);
}

function addOne(item) {
  const qty = (choice.get(item.id) || 0) + 1;
  setQuantity(item, qty);
  showToast(qty > 1 ? `${item.name}: ${qty} na sua escolha` : `${item.name} foi para a sua escolha`);
}

function refreshChoiceUi(bump = false) {
  const count = choiceCount();

  document.querySelectorAll("[data-count]").forEach((badge) => {
    badge.hidden = count === 0;
    badge.textContent = count;
    if (bump) restartAnimation(badge, "is-bumping");
  });

  $("#list-bar-count").textContent = count === 1 ? "1 item" : `${count} itens`;
  $("#list-bar-total").textContent = priceFormat.format(choiceTotal()) + (hasKgItems() ? " +" : "");
  updateListBar();
  if (bump && !listBar.hidden) restartAnimation(listBar, "is-bumping");

  document.querySelectorAll(".product[data-id]").forEach((card) => {
    const qty = choice.get(card.dataset.id) || 0;
    card.classList.toggle("is-chosen", qty > 0);
    const button = card.querySelector(".product__add");
    button.classList.toggle("is-chosen", qty > 0);
    button.innerHTML = qty > 0 ? `✓ ${qty} na escolha` : `${plusIcon}Juntar`;
    button.setAttribute("aria-label", qty > 0 ? `${qty} na sua escolha, juntar mais um` : "Juntar à minha escolha");
  });

  if (!detailOverlay.hidden) renderDetailActions();
  if (!listOverlay.hidden) renderList();
}

function updateListBar() {
  listBar.hidden = !(
    choiceCount() > 0 &&
    currentScreen !== "welcome" &&
    detailOverlay.hidden &&
    listOverlay.hidden &&
    reviewOverlay.hidden
  );
}

function restartAnimation(node, className) {
  node.classList.remove(className);
  void node.offsetWidth;
  node.classList.add(className);
}

// ---------- Ecras ----------

function showScreen(name) {
  currentScreen = name;
  Object.entries(screens).forEach(([key, screen]) => screen.classList.toggle("is-active", key === name));
  if (name === "welcome") startEmbers();
  else stopEmbers();
  updateListBar();
}

function buildHome() {
  categories.forEach((category) => {
    const tile = el("button", "category-tile");
    tile.type = "button";
    const image = el("img");
    image.src = `assets/capas/${category.cover}`;
    image.alt = "";
    image.decoding = "async";
    const text = el("span", "category-tile__text");
    const count = categoryItems(category).length;
    text.append(el("span", "category-tile__name", category.name), el("span", "category-tile__meta", `${count} opções`));
    tile.append(image, text);
    tile.addEventListener("click", () => openCategory(category));
    categoryGrid.appendChild(tile);
  });

  if (window.MENU_REVIEW_IMAGE) {
    const review = el("button", "category-tile category-tile--review");
    review.type = "button";
    const inner = el("span", "review-tile");
    inner.append(
      el("span", "review-tile__stars", "★★★★★"),
      el("span", "review-tile__title", "Avalie-nos"),
      el("span", "review-tile__sub", "e ganhe um brigadeiro")
    );
    review.appendChild(inner);
    review.addEventListener("click", openReview);
    categoryGrid.appendChild(review);
  }
}

function buildFeatured() {
  const row = $("#featured-row");
  const featured = [...itemsById.values()].filter((item) => item.featured);
  if (!featured.length) {
    row.closest(".featured").hidden = true;
    return;
  }
  featured.forEach((item) => {
    const card = el("button", "feature-card");
    card.type = "button";
    const image = el("img");
    image.src = photoUrl(item);
    image.alt = item.name;
    image.decoding = "async";
    const text = el("span", "feature-card__text");
    text.append(el("span", "feature-card__name", item.name));
    if (item.desc) text.append(el("span", "feature-card__desc", item.desc));
    text.append(el("span", "feature-card__price", priceText(item)));
    card.append(image, text);
    if (item.tag) card.appendChild(el("span", "product__tag", item.tag));
    card.addEventListener("click", () => openDetail(item));
    row.appendChild(card);
  });
}

function buildTabs() {
  categories.forEach((category) => {
    const tab = el("button", "tab", category.name);
    tab.type = "button";
    tab.dataset.id = category.id;
    tab.addEventListener("click", () => openCategory(category));
    tabsNav.appendChild(tab);
  });
}

function productCard(item) {
  const card = el("button", "product");
  card.type = "button";
  card.dataset.id = item.id;

  const url = photoUrl(item);
  if (url) {
    const image = el("img", "product__photo");
    image.src = url;
    image.alt = item.name;
    image.loading = "lazy";
    image.decoding = "async";
    const frame = el("span", "product__frame");
    frame.appendChild(image);
    card.appendChild(frame);
    const caption = el("span", "product__caption");
    const line = el("span", "product__line");
    line.append(el("span", "product__name", item.name), el("span", "product__price", priceText(item)));
    caption.appendChild(line);
    if (item.desc) caption.appendChild(el("span", "product__desc", item.desc));
    card.appendChild(caption);
  } else {
    card.classList.add("product--text");
    card.append(el("span", "product__name", item.name));
    if (item.desc) card.append(el("span", "product__desc", item.desc));
    card.append(el("span", "product__price", formatPrice(item)));
  }

  if (item.tag) card.appendChild(el("span", "product__tag", item.tag));

  const add = el("span", "product__add");
  add.setAttribute("role", "button");
  add.innerHTML = `${plusIcon}Juntar`;
  add.addEventListener("click", (event) => {
    event.stopPropagation();
    addOne(item);
  });
  card.appendChild(add);

  card.addEventListener("click", () => openDetail(item));
  return card;
}

function openCategory(category) {
  categoryContent.replaceChildren();
  // As carnes sao a estrela da casa: cartoes maiores.
  categoryContent.classList.toggle("category__content--large", category.id === "carnes");

  const head = el("div", "category__head");
  const cover = el("img", "category__cover");
  cover.src = `assets/capas/${category.cover}`;
  cover.alt = "";
  const headText = el("div", "category__head-text");
  headText.append(el("h2", "category__title", category.name), el("p", "category__count", `${categoryItems(category).length} opções`));
  head.append(cover, headText);
  categoryContent.appendChild(head);
  if (category.note) categoryContent.appendChild(el("p", "note", category.note));

  category.sections.forEach((section) => {
    const block = el("section", "section");
    if (section.title) {
      const title = el("h3", "section__title", section.title);
      if (section.note) title.appendChild(el("span", "section__note", section.note));
      block.appendChild(title);
    } else if (section.note) {
      block.appendChild(el("p", "note", section.note));
    }
    const grid = el("div", "product-grid");
    section.items.forEach((item) => grid.appendChild(productCard(item)));
    block.appendChild(grid);
    categoryContent.appendChild(block);
  });

  const next = categories[categories.indexOf(category) + 1];
  if (next) {
    const button = el("button", "next-category");
    button.type = "button";
    const label = el("span");
    label.append(el("span", null, "A seguir"), el("strong", null, next.name));
    button.appendChild(label);
    button.insertAdjacentHTML("beforeend", '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>');
    button.addEventListener("click", () => openCategory(next));
    categoryContent.appendChild(button);
  }

  showScreen("category");
  categoryScroll.scrollTop = 0;
  refreshChoiceUi();

  tabsNav.querySelectorAll(".tab").forEach((tab) => {
    const active = tab.dataset.id === category.id;
    tab.classList.toggle("is-active", active);
    if (active) {
      tab.setAttribute("aria-current", "page");
      tabsNav.scrollTo({ left: tab.offsetLeft - (tabsNav.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
    } else {
      tab.removeAttribute("aria-current");
    }
  });
}

// ---------- Detalhe do prato ----------

function openDetail(item) {
  detailItems = categoryItems(item.category);
  detailIndex = detailItems.indexOf(item);
  $(".detail").classList.remove("is-sliding");
  detailOverlay.hidden = false;
  renderDetail();
  updateListBar();
}

function closeDetail() {
  detailOverlay.hidden = true;
  updateListBar();
}

function renderDetail() {
  const item = detailItems[detailIndex];
  const media = $("#detail-media");
  media.replaceChildren();
  media.className = "detail__media";
  const url = photoUrl(item);
  if (url) {
    const image = el("img", "detail__photo");
    image.src = url;
    image.alt = item.name;
    const zoom = el("button", "detail__zoom");
    zoom.type = "button";
    zoom.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>Ver em grande';
    media.append(image, zoom);
    media.onclick = () => openPhoto(item);
  } else {
    media.classList.add("detail__media--text");
    media.textContent = item.name;
    media.onclick = null;
  }

  $("#detail-section").textContent = [item.category.name, item.section.title].filter(Boolean).join(" · ");
  $("#detail-name").textContent = item.name;
  const price = $("#detail-price");
  price.textContent = formatPrice(item);
  if (item.unit === "kg") price.appendChild(el("small", null, "por kg"));

  const desc = $("#detail-desc");
  desc.textContent = item.desc || "";
  desc.hidden = !item.desc;

  const notes = [item.section.note, item.category.note].filter(Boolean).join(" · ");
  const note = $("#detail-note");
  note.textContent = notes;
  note.hidden = !notes;

  const pairingBox = $("#detail-pairing");
  pairingBox.replaceChildren();
  const wine = item.pairing && findItemByName(item.pairing);
  pairingBox.hidden = !wine;
  if (wine) {
    const button = el("button", "pairing__button");
    button.type = "button";
    const thumb = el("img", "pairing__photo");
    thumb.src = photoUrl(wine);
    thumb.alt = "";
    const text = el("span", "pairing__text");
    text.append(el("span", "pairing__label", "Fica perfeito com"), el("span", "pairing__name", wine.name), el("span", "pairing__price", priceText(wine)));
    button.append(thumb, text);
    button.insertAdjacentHTML("beforeend", '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>');
    button.addEventListener("click", () => openDetail(wine));
    pairingBox.appendChild(button);
  }

  $("#detail-position").textContent = `${detailIndex + 1} de ${detailItems.length} em ${item.category.name} · deslize para ver mais`;
  $(".detail__nav--prev").disabled = detailIndex === 0;
  $(".detail__nav--next").disabled = detailIndex === detailItems.length - 1;
  renderDetailActions();
}

function renderDetailActions() {
  const item = detailItems[detailIndex];
  const qty = choice.get(item.id) || 0;
  const actions = $("#detail-actions");
  actions.replaceChildren();

  if (qty === 0) {
    const button = el("button", "big-button");
    button.type = "button";
    button.innerHTML = '<span class="heart" aria-hidden="true"></span>Juntar à minha escolha';
    button.addEventListener("click", () => addOne(item));
    actions.appendChild(button);
  } else {
    actions.appendChild(stepper(item, qty, false));
  }
}

function stepper(item, qty, small) {
  const box = el("div", small ? "stepper stepper--small" : "stepper");
  const minus = el("button", null, "−");
  minus.type = "button";
  minus.setAttribute("aria-label", `Tirar um: ${item.name}`);
  minus.addEventListener("click", () => setQuantity(item, qty - 1));
  const plus = el("button", null, "+");
  plus.type = "button";
  plus.setAttribute("aria-label", `Mais um: ${item.name}`);
  plus.addEventListener("click", () => setQuantity(item, qty + 1));
  const value = el("span", "stepper__value");
  if (small) {
    value.textContent = qty;
  } else {
    value.append(el("strong", null, String(qty)), document.createTextNode(" na sua escolha"));
  }
  box.append(minus, value, plus);
  return box;
}

function moveDetail(step) {
  const next = detailIndex + step;
  if (next < 0 || next >= detailItems.length) return;
  detailIndex = next;
  $(".detail").classList.add("is-sliding");
  renderDetail();
}

// Deslizar o dedo no detalhe passa para o prato seguinte ou anterior.
let swipeStart = null;
$(".detail").addEventListener(
  "touchstart",
  (event) => {
    swipeStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  },
  { passive: true }
);
$(".detail").addEventListener("touchend", (event) => {
  if (!swipeStart) return;
  const touch = event.changedTouches[0];
  const dx = touch.clientX - swipeStart.x;
  const dy = touch.clientY - swipeStart.y;
  swipeStart = null;
  if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) moveDetail(dx < 0 ? 1 : -1);
});

// ---------- Foto em ecra inteiro ----------

const photoViewer = $("#photo-viewer");

function openPhoto(item) {
  $("#photo-viewer-image").src = photoUrl(item);
  $("#photo-viewer-image").alt = item.name;
  $("#photo-viewer-caption").textContent = `${item.name} · ${priceText(item)}`;
  photoViewer.hidden = false;
}

function closePhoto() {
  photoViewer.hidden = true;
}

photoViewer.addEventListener("click", closePhoto);

// ---------- Lista ----------

function openList() {
  clearConfirm = false;
  listOverlay.hidden = false;
  renderList();
  updateListBar();
}

function closeList() {
  listOverlay.hidden = true;
  updateListBar();
}

function renderList() {
  const items = $("#list-items");
  const foot = $("#list-foot");
  items.replaceChildren();
  foot.replaceChildren();

  if (choice.size === 0) {
    const empty = el("div", "list-empty");
    empty.innerHTML =
      '<span class="heart" aria-hidden="true"></span><span>Ainda não escolheu nada.<br>Toque no <strong>+</strong> de um prato para o juntar aqui.</span>';
    items.appendChild(empty);
    const back = el("button", "big-button big-button--ghost", "Ver o cardápio");
    back.type = "button";
    back.addEventListener("click", () => {
      closeList();
      if (currentScreen === "welcome") showScreen("home");
    });
    foot.appendChild(back);
    return;
  }

  choice.forEach((qty, id) => {
    const item = itemsById.get(id);
    const row = el("div", "list-row");
    const url = photoUrl(item);
    let thumb;
    if (url) {
      thumb = el("img", "list-row__photo");
      thumb.src = url;
      thumb.alt = "";
    } else {
      thumb = el("span", "list-row__photo list-row__photo--text", item.name.slice(0, 1));
    }
    const info = el("div");
    info.append(
      el("p", "list-row__name", item.name),
      el("p", "list-row__price", item.unit === "kg" ? `${formatPrice(item)} por kg` : `${qty} × ${formatPrice(item)}`)
    );
    row.append(thumb, info, stepper(item, qty, true));
    items.appendChild(row);
  });

  const total = el("div", "list-total");
  total.append(el("span", null, "Total estimado"), el("strong", null, priceFormat.format(choiceTotal())));
  foot.appendChild(total);
  if (hasKgItems()) foot.appendChild(el("p", "list-hint", "Os cortes ao quilo são pesados na hora e não entram neste total."));
  foot.appendChild(el("p", "list-waiter", "Mostre esta lista ao empregado para fazer o seu pedido."));

  const clear = el("button", "big-button big-button--ghost", clearConfirm ? "Toque outra vez para apagar tudo" : "Limpar a lista");
  clear.type = "button";
  clear.addEventListener("click", () => {
    if (!clearConfirm) {
      clearConfirm = true;
      renderList();
      return;
    }
    clearConfirm = false;
    choice.clear();
    saveChoice();
    refreshChoiceUi();
  });
  foot.appendChild(clear);
}

// ---------- Avaliacao ----------

function openReview() {
  $("#review-image").src = window.MENU_REVIEW_IMAGE;
  reviewOverlay.hidden = false;
  updateListBar();
}

function closeReview() {
  reviewOverlay.hidden = true;
  updateListBar();
}

// ---------- Aviso rapido ----------

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

// ---------- Brasas a subir no ecra de boas-vindas ----------

const embersCanvas = $("#embers");
const embersContext = embersCanvas.getContext("2d");
let embers = [];
let embersFrame = null;

function resizeEmbers() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  embersCanvas.width = embersCanvas.clientWidth * ratio;
  embersCanvas.height = embersCanvas.clientHeight * ratio;
  embersContext.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function newEmber(anywhere) {
  return {
    x: Math.random() * embersCanvas.clientWidth,
    y: anywhere ? Math.random() * embersCanvas.clientHeight : embersCanvas.clientHeight + 10,
    size: 0.8 + Math.random() * 2.4,
    speed: 0.4 + Math.random() * 1.1,
    drift: (Math.random() - 0.5) * 0.6,
    phase: Math.random() * Math.PI * 2,
    life: 0.5 + Math.random() * 0.5
  };
}

function drawEmbers() {
  const width = embersCanvas.clientWidth;
  const height = embersCanvas.clientHeight;
  embersContext.clearRect(0, 0, width, height);
  embers.forEach((ember, index) => {
    ember.y -= ember.speed;
    ember.phase += 0.03;
    ember.x += ember.drift + Math.sin(ember.phase) * 0.35;
    if (ember.y < -10) embers[index] = newEmber(false);
    const fade = Math.max(0, Math.min(1, ember.y / height)) * ember.life;
    const radius = ember.size * 4;
    const glow = embersContext.createRadialGradient(ember.x, ember.y, 0, ember.x, ember.y, radius);
    glow.addColorStop(0, `rgba(255, 196, 110, ${fade})`);
    glow.addColorStop(0.4, `rgba(240, 120, 40, ${fade * 0.6})`);
    glow.addColorStop(1, "rgba(240, 90, 20, 0)");
    embersContext.fillStyle = glow;
    embersContext.beginPath();
    embersContext.arc(ember.x, ember.y, radius, 0, Math.PI * 2);
    embersContext.fill();
  });
  embersFrame = requestAnimationFrame(drawEmbers);
}

function startEmbers() {
  if (embersFrame || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  resizeEmbers();
  embers = Array.from({ length: 70 }, () => newEmber(true));
  drawEmbers();
}

function stopEmbers() {
  cancelAnimationFrame(embersFrame);
  embersFrame = null;
}

// ---------- Inatividade: volta ao inicio para o proximo cliente ----------

function resetForNextGuest() {
  // Se o tablet esteve ligado muito tempo, recarrega para apanhar precos novos.
  if (Date.now() - loadedAt > 60 * 60 * 1000 && navigator.onLine) {
    window.location.reload();
    return;
  }
  detailOverlay.hidden = true;
  listOverlay.hidden = true;
  reviewOverlay.hidden = true;
  photoViewer.hidden = true;
  showScreen("welcome");
}

function restartIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(resetForNextGuest, idleMinutes * 60 * 1000);
  if (choice.size) saveChoice();
}

// A lista so e apagada depois de muito tempo sem uso (mesa nova).
setInterval(() => {
  const saved = readSavedChoice();
  if (choice.size && saved && Date.now() - saved.at > clearListMinutes * 60 * 1000) {
    choice.clear();
    saveChoice();
    refreshChoiceUi();
  }
}, 60 * 1000);

// ---------- Ecra sempre ligado e ecra inteiro ----------

async function keepScreenOn() {
  if (!("wakeLock" in navigator) || wakeLock || document.visibilityState !== "visible") return;
  try {
    wakeLock = await navigator.wakeLock.request("screen");
    wakeLock.addEventListener("release", () => {
      wakeLock = null;
    });
  } catch (error) {
    wakeLock = null;
  }
}

function toggleFullscreen() {
  const element = document.documentElement;
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  } else {
    (element.requestFullscreen || element.webkitRequestFullscreen).call(element);
  }
}

// Carrega as fotos todas em segundo plano, para funcionar mesmo sem Wi-Fi.
function preloadPhotos() {
  const urls = [
    ...categories.map((category) => `assets/capas/${category.cover}`),
    ...[...itemsById.values()].map(photoUrl).filter(Boolean)
  ];
  let index = 0;
  const next = () => {
    if (index >= urls.length) return;
    const image = new Image();
    image.onload = image.onerror = () => setTimeout(next, 120);
    image.src = urls[index];
    index += 1;
  };
  setTimeout(next, 1500);
}

// ---------- Arranque ----------

loadChoice();
buildHome();
buildFeatured();
buildTabs();
refreshChoiceUi();
showScreen("welcome");
restartIdleTimer();
window.addEventListener("load", preloadPhotos, { once: true });

if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
  document.querySelectorAll('[data-action="fullscreen"]').forEach((button) => (button.hidden = false));
}

screens.welcome.addEventListener("click", () => showScreen("home"));

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "home") showScreen("home");
  if (action === "open-carnes") openCategory(categories.find((category) => category.id === "carnes") || categories[0]);
  if (action === "welcome") showScreen("welcome");
  if (action === "open-list") openList();
  if (action === "close-list") closeList();
  if (action === "close-detail") closeDetail();
  if (action === "detail-prev") moveDetail(-1);
  if (action === "detail-next") moveDetail(1);
  if (action === "close-review") closeReview();
  if (action === "close-photo") closePhoto();
  if (action === "fullscreen") toggleFullscreen();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!photoViewer.hidden) closePhoto();
    else if (!reviewOverlay.hidden) closeReview();
    else if (!listOverlay.hidden) closeList();
    else if (!detailOverlay.hidden) closeDetail();
    else if (currentScreen === "category") showScreen("home");
  }
  if (!detailOverlay.hidden && event.key === "ArrowRight") moveDetail(1);
  if (!detailOverlay.hidden && event.key === "ArrowLeft") moveDetail(-1);
});

["pointerdown", "touchstart", "keydown", "wheel", "scroll"].forEach((type) => {
  document.addEventListener(type, restartIdleTimer, { passive: true, capture: true });
});

document.addEventListener("pointerdown", keepScreenOn, { passive: true });
document.addEventListener("visibilitychange", keepScreenOn);
window.addEventListener("resize", () => {
  if (embersFrame) resizeEmbers();
});

// Impede o zoom da pagina inteira com dois dedos.
document.addEventListener(
  "touchmove",
  (event) => {
    if (event.touches.length > 1) event.preventDefault();
  },
  { passive: false }
);
document.addEventListener("gesturestart", (event) => event.preventDefault());
document.addEventListener("contextmenu", (event) => event.preventDefault());

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
