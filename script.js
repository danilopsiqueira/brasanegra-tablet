// A lista de paginas fica em menu-data.js. Este ficheiro so trata do comportamento.

const pages = window.MENU_PAGES || [];
const idleMinutes = window.MENU_IDLE_MINUTES || 2;

const app = document.querySelector(".menu-app");
const carousel = document.querySelector("#carousel");
const chipsNav = document.querySelector("#chips");
const counter = document.querySelector("#counter");
const progressBar = document.querySelector("#progress-bar");
const hint = document.querySelector("#hint");
const previousButton = document.querySelector(".nav-arrow--left");
const nextButton = document.querySelector(".nav-arrow--right");
const zoomResetButton = document.querySelector(".zoom-reset");
const indexPanel = document.querySelector("#index-panel");
const indexGrid = document.querySelector("#index-grid");
const fullscreenButton = document.querySelector('[data-action="fullscreen"]');

const MAX_ZOOM = 4;
const DOUBLE_TAP_ZOOM = 2.5;
const loadedAt = Date.now();

let currentIndex = 0;
let perView = 1;
let scrollTimer;
let idleTimer;
let wakeLock = null;
const slides = [];
const chipButtons = new Map();

// ---------- Caminhos das imagens ----------

function baseName(file) {
  return file.replace(/\.[^.]+$/, "");
}

const imagePaths = {
  original: (file) => `assets/${file}`,
  web: (file) => `assets/web/${baseName(file)}.webp`,
  thumb: (file) => `assets/thumbs/${baseName(file)}.webp`
};

// Usa a versao leve; se ainda nao foi gerada, cai para a imagem original.
function setImageWithFallback(image, preferred, original) {
  image.addEventListener("error", () => {
    if (image.dataset.fallback) return;
    image.dataset.fallback = "1";
    image.src = original;
  });
  image.src = preferred;
}

// ---------- Construcao da pagina ----------

function createSlides() {
  pages.forEach((page, index) => {
    const slide = document.createElement("article");
    slide.className = "slide";
    slide.dataset.index = index;
    slide.setAttribute("aria-label", `${page.category} – página ${index + 1} de ${pages.length}`);

    const layer = document.createElement("div");
    layer.className = "zoom-layer";

    const image = document.createElement("img");
    image.alt = `Cardápio Brasa Negra – ${page.category}`;
    image.width = 1200;
    image.height = 1920;
    image.draggable = false;
    image.decoding = "async";
    image.addEventListener("load", () => image.classList.add("is-loaded"));

    layer.appendChild(image);
    slide.appendChild(layer);
    carousel.appendChild(slide);
    slides.push({ slide, layer, image, page, loaded: false, hiRes: false });
  });
}

function loadSlide(index, highPriority = false) {
  const item = slides[index];
  if (!item || item.loaded) return;
  item.loaded = true;
  if (highPriority) item.image.fetchPriority = "high";
  setImageWithFallback(item.image, imagePaths.web(item.page.file), imagePaths.original(item.page.file));
}

function loadHiRes(item) {
  if (item.hiRes) return;
  item.hiRes = true;
  const original = imagePaths.original(item.page.file);
  const preload = new Image();
  preload.onload = () => {
    item.image.src = original;
  };
  preload.src = original;
}

function preloadRemaining() {
  let next = 0;
  const step = () => {
    while (next < slides.length && slides[next].loaded) next += 1;
    if (next >= slides.length) return;
    loadSlide(next);
    window.setTimeout(step, 500);
  };
  window.setTimeout(step, 1000);
}

function createChips() {
  pages.forEach((page, index) => {
    if (page.chip === false || chipButtons.has(page.category)) return;
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    if (index === pages.length - 1) chip.classList.add("chip--highlight");
    chip.textContent = page.category;
    chip.addEventListener("click", () => goToSlide(index));
    chipsNav.appendChild(chip);
    chipButtons.set(page.category, chip);
  });
}

function createIndex() {
  pages.forEach((page, index) => {
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "index-thumb";
    thumb.dataset.index = index;
    thumb.setAttribute("aria-label", `${page.category}, página ${index + 1}`);

    const frame = document.createElement("span");
    frame.className = "index-thumb__frame";

    const image = document.createElement("img");
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    setImageWithFallback(image, imagePaths.thumb(page.file), imagePaths.original(page.file));
    frame.appendChild(image);

    const label = document.createElement("span");
    label.className = "index-thumb__label";
    label.textContent = page.category;

    thumb.append(frame, label);
    thumb.addEventListener("click", () => {
      closeIndex();
      goToSlide(index, false);
    });
    indexGrid.appendChild(thumb);
  });
}

// ---------- Navegacao ----------

function updatePerView() {
  const width = carousel.clientWidth || window.innerWidth;
  const height = carousel.clientHeight || window.innerHeight;
  // Tablet deitado: mostra duas paginas lado a lado, como um livro.
  const next = width / height >= 1.05 && pages.length > 1 ? 2 : 1;
  if (next !== perView) {
    perView = next;
    app.style.setProperty("--per-view", perView);
  }
}

function slideWidth() {
  return (carousel.clientWidth || window.innerWidth) / perView;
}

function lastStartIndex() {
  return Math.max(0, pages.length - perView);
}

function goToSlide(index, smooth = true) {
  resetZoom(false);
  const safeIndex = Math.max(0, Math.min(index, lastStartIndex()));
  carousel.scrollTo({ left: safeIndex * slideWidth(), behavior: smooth ? "smooth" : "auto" });
  if (!smooth) updateUi(safeIndex);
}

function updateUi(index) {
  currentIndex = index;

  for (let i = index - 1; i <= index + perView + 1; i += 1) {
    loadSlide(i, i >= index && i < index + perView);
  }

  const lastVisible = Math.min(index + perView, pages.length);
  counter.textContent =
    lastVisible - index > 1
      ? `Páginas ${index + 1}–${lastVisible} de ${pages.length}`
      : `Página ${index + 1} de ${pages.length}`;
  progressBar.style.width = `${(lastVisible / pages.length) * 100}%`;

  let activeCategory = null;
  for (let i = index; i < lastVisible; i += 1) {
    if (pages[i].chip !== false) {
      activeCategory = pages[i].category;
      break;
    }
  }

  chipButtons.forEach((chip, category) => {
    const isActive = category === activeCategory;
    chip.classList.toggle("is-active", isActive);
    if (isActive) {
      chip.setAttribute("aria-current", "true");
      const target = chip.offsetLeft - (chipsNav.clientWidth - chip.offsetWidth) / 2;
      chipsNav.scrollTo({ left: target, behavior: "smooth" });
    } else {
      chip.removeAttribute("aria-current");
    }
  });

  previousButton.classList.toggle("is-disabled", index <= 0);
  nextButton.classList.toggle("is-disabled", index >= lastStartIndex());
}

function updateFromScroll() {
  const index = Math.round(carousel.scrollLeft / slideWidth());
  updateUi(Math.max(0, Math.min(index, lastStartIndex())));
}

function onScroll() {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(updateFromScroll, 80);
  if (carousel.scrollLeft > 10) hint.classList.add("is-hidden");
}

// ---------- Indice ----------

function openIndex() {
  resetZoom(false);
  indexGrid.querySelectorAll(".index-thumb").forEach((thumb) => {
    const index = Number(thumb.dataset.index);
    thumb.classList.toggle("is-current", index >= currentIndex && index < currentIndex + perView);
  });
  indexPanel.hidden = false;
  const current = indexGrid.querySelector(".index-thumb.is-current");
  if (current) current.scrollIntoView({ block: "center" });
}

function closeIndex() {
  indexPanel.hidden = true;
}

// ---------- Ampliar (pinca, duplo toque e arrastar) ----------

const zoom = { item: null, scale: 1, x: 0, y: 0 };

function slideItemFromTarget(target) {
  const slide = target && target.closest ? target.closest(".slide") : null;
  return slide ? slides[Number(slide.dataset.index)] : null;
}

// Coordenadas do ponto dentro da area da imagem (sem transformacao).
function localPoint(item, clientX, clientY) {
  const rect = item.slide.getBoundingClientRect();
  return {
    x: clientX - rect.left - item.layer.offsetLeft,
    y: clientY - rect.top - item.layer.offsetTop
  };
}

// Mantem a imagem dentro do ecra: nada de arrastar para o vazio.
function clampAxis(offset, scale, layerSize, contentStart, contentSize) {
  const scaled = contentSize * scale;
  if (scaled <= layerSize) return (layerSize - scaled) / 2 - contentStart * scale;
  const min = layerSize - (contentStart + contentSize) * scale;
  const max = -contentStart * scale;
  return Math.min(max, Math.max(min, offset));
}

function clampZoom() {
  const { item } = zoom;
  const w = item.layer.offsetWidth;
  const h = item.layer.offsetHeight;
  const ratio = (item.image.naturalWidth || 1200) / (item.image.naturalHeight || 1920);
  let cw = w;
  let ch = w / ratio;
  if (ch > h) {
    ch = h;
    cw = h * ratio;
  }
  zoom.x = clampAxis(zoom.x, zoom.scale, w, (w - cw) / 2, cw);
  zoom.y = clampAxis(zoom.y, zoom.scale, h, (h - ch) / 2, ch);
}

function applyZoom(animate) {
  const { item } = zoom;
  if (!item) return;
  clampZoom();
  item.layer.classList.toggle("is-animating", animate);
  item.layer.style.transform = `translate3d(${zoom.x}px, ${zoom.y}px, 0) scale(${zoom.scale})`;

  const isZoomed = zoom.scale > 1.01;
  carousel.classList.toggle("is-zoomed", isZoomed);
  zoomResetButton.hidden = !isZoomed;
  if (zoom.scale >= 1.6) loadHiRes(item);
}

function zoomTo(item, scale, focusX, focusY, animate) {
  if (zoom.item && zoom.item !== item) resetZoom(false);
  const nextScale = Math.max(1, Math.min(MAX_ZOOM, scale));
  const ratio = nextScale / zoom.scale;
  zoom.item = item;
  zoom.x = focusX - (focusX - zoom.x) * ratio;
  zoom.y = focusY - (focusY - zoom.y) * ratio;
  zoom.scale = nextScale;
  applyZoom(animate);
}

function resetZoom(animate = true) {
  if (!zoom.item) return;
  zoom.scale = 1;
  zoom.x = 0;
  zoom.y = 0;
  applyZoom(animate);
  zoom.item = null;
}

function toggleZoomAt(item, clientX, clientY) {
  if (zoom.item === item && zoom.scale > 1.01) {
    resetZoom(true);
    return;
  }
  const point = localPoint(item, clientX, clientY);
  zoomTo(item, DOUBLE_TAP_ZOOM, point.x, point.y, true);
  hint.classList.add("is-hidden");
}

const gesture = { mode: null, startDistance: 0, startScale: 1, startX: 0, startY: 0, lastX: 0, lastY: 0 };
const tap = { startX: 0, startY: 0, startTime: 0, moved: false, multi: false, lastTime: 0, lastX: 0, lastY: 0 };

function touchDistance(a, b) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function startPinch(event) {
  const [a, b] = event.touches;
  const item = zoom.item || slideItemFromTarget(a.target);
  if (!item) return;
  if (zoom.item !== item) {
    resetZoom(false);
    zoom.item = item;
  }
  const mid = localPoint(item, (a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2);
  gesture.mode = "pinch";
  gesture.startDistance = touchDistance(a, b) || 1;
  gesture.startScale = zoom.scale;
  gesture.startX = zoom.x;
  gesture.startY = zoom.y;
  gesture.midX = mid.x;
  gesture.midY = mid.y;
}

function startPan(touch) {
  gesture.mode = "pan";
  gesture.lastX = touch.clientX;
  gesture.lastY = touch.clientY;
}

carousel.addEventListener(
  "touchstart",
  (event) => {
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      tap.startX = touch.clientX;
      tap.startY = touch.clientY;
      tap.startTime = Date.now();
      tap.moved = false;
      tap.multi = false;
      if (zoom.scale > 1.01) startPan(touch);
    } else if (event.touches.length === 2) {
      tap.multi = true;
      event.preventDefault();
      startPinch(event);
    }
  },
  { passive: false }
);

carousel.addEventListener(
  "touchmove",
  (event) => {
    const touch = event.touches[0];
    if (Math.hypot(touch.clientX - tap.startX, touch.clientY - tap.startY) > 10) tap.moved = true;

    if (gesture.mode === "pinch" && event.touches.length >= 2) {
      event.preventDefault();
      const [a, b] = event.touches;
      const item = zoom.item;
      const mid = localPoint(item, (a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2);
      const scale = Math.max(1, Math.min(MAX_ZOOM, gesture.startScale * (touchDistance(a, b) / gesture.startDistance)));
      const ratio = scale / gesture.startScale;
      zoom.scale = scale;
      zoom.x = mid.x - (gesture.midX - gesture.startX) * ratio;
      zoom.y = mid.y - (gesture.midY - gesture.startY) * ratio;
      applyZoom(false);
    } else if (gesture.mode === "pan" && zoom.scale > 1.01) {
      event.preventDefault();
      zoom.x += touch.clientX - gesture.lastX;
      zoom.y += touch.clientY - gesture.lastY;
      gesture.lastX = touch.clientX;
      gesture.lastY = touch.clientY;
      applyZoom(false);
    }
  },
  { passive: false }
);

carousel.addEventListener("touchend", (event) => {
  if (event.touches.length === 1 && zoom.scale > 1.01) {
    startPan(event.touches[0]);
    return;
  }
  if (event.touches.length > 0) return;

  if (gesture.mode === "pinch" && zoom.scale < 1.08) resetZoom(true);
  gesture.mode = null;

  // Duplo toque
  const now = Date.now();
  const isTap = !tap.moved && !tap.multi && now - tap.startTime < 300;
  if (!isTap) return;
  const isDoubleTap =
    now - tap.lastTime < 320 && Math.hypot(tap.startX - tap.lastX, tap.startY - tap.lastY) < 40;
  if (isDoubleTap) {
    tap.lastTime = 0;
    const item = slideItemFromTarget(event.target);
    if (item) toggleZoomAt(item, tap.startX, tap.startY);
    event.preventDefault();
  } else {
    tap.lastTime = now;
    tap.lastX = tap.startX;
    tap.lastY = tap.startY;
  }
});

// Rato (computador): duplo clique para ampliar e arrastar para mover.
carousel.addEventListener("dblclick", (event) => {
  const item = slideItemFromTarget(event.target);
  if (item) toggleZoomAt(item, event.clientX, event.clientY);
});

carousel.addEventListener("pointerdown", (event) => {
  if (event.pointerType !== "mouse" || zoom.scale <= 1.01) return;
  gesture.mode = "mouse-pan";
  gesture.lastX = event.clientX;
  gesture.lastY = event.clientY;
  carousel.setPointerCapture(event.pointerId);
});

carousel.addEventListener("pointermove", (event) => {
  if (gesture.mode !== "mouse-pan") return;
  zoom.x += event.clientX - gesture.lastX;
  zoom.y += event.clientY - gesture.lastY;
  gesture.lastX = event.clientX;
  gesture.lastY = event.clientY;
  applyZoom(false);
});

carousel.addEventListener("pointerup", () => {
  if (gesture.mode === "mouse-pan") gesture.mode = null;
});

// ---------- Inatividade: volta ao inicio para o proximo cliente ----------

function resetForNextGuest() {
  // Se o tablet esteve ligado muito tempo, recarrega para apanhar precos novos.
  if (Date.now() - loadedAt > 60 * 60 * 1000 && navigator.onLine) {
    window.location.reload();
    return;
  }
  closeIndex();
  resetZoom(false);
  goToSlide(0, false);
  chipsNav.scrollTo({ left: 0 });
  hint.classList.remove("is-hidden");
}

function restartIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(resetForNextGuest, idleMinutes * 60 * 1000);
}

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

function canFullscreen() {
  return document.fullscreenEnabled || document.webkitFullscreenEnabled;
}

function toggleFullscreen() {
  const element = document.documentElement;
  const isFull = document.fullscreenElement || document.webkitFullscreenElement;
  if (isFull) {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  } else {
    (element.requestFullscreen || element.webkitRequestFullscreen).call(element);
  }
}

// ---------- Arranque ----------

createSlides();
createChips();
createIndex();
updatePerView();
updateUi(0);
restartIdleTimer();
window.addEventListener("load", preloadRemaining, { once: true });

if (canFullscreen()) fullscreenButton.hidden = false;

nextButton.addEventListener("click", () => goToSlide(currentIndex + perView));
previousButton.addEventListener("click", () => goToSlide(currentIndex - perView));
zoomResetButton.addEventListener("click", () => resetZoom(true));
carousel.addEventListener("scroll", onScroll, { passive: true });

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "home") goToSlide(0);
  if (action === "index") openIndex();
  if (action === "close-index") closeIndex();
  if (action === "fullscreen") toggleFullscreen();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!indexPanel.hidden) closeIndex();
    else resetZoom(true);
  }
  if (!indexPanel.hidden) return;
  if (event.key === "ArrowRight" || event.key === "PageDown") goToSlide(currentIndex + perView);
  if (event.key === "ArrowLeft" || event.key === "PageUp") goToSlide(currentIndex - perView);
  if (event.key === "Home") goToSlide(0);
});

["pointerdown", "touchstart", "keydown", "wheel"].forEach((type) => {
  document.addEventListener(type, restartIdleTimer, { passive: true });
});

document.addEventListener("pointerdown", keepScreenOn, { passive: true });
document.addEventListener("visibilitychange", keepScreenOn);

let resizeFrame;
window.addEventListener("resize", () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => {
    updatePerView();
    goToSlide(currentIndex, false);
  });
});

// Impede o zoom da pagina inteira (o zoom e feito so na imagem do cardapio).
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
