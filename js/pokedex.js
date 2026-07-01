/* Pokedex interactiva (PokeAPI) // Buscador con autocompletado, pokemon aleatorio,
modal de detalle, favoritos en Localstorage e integración con carrito de compras */

document.addEventListener("DOMContentLoaded", function () {
  const API_BASE    = "https://pokeapi.co/api/v2/pokemon/";
  const API_LIST    = "https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0";
  const MAX_ID      = 1010;
  const FAV_KEY     = "pp_favorites";

  /* Referencias*/
  const form       = document.getElementById("pokedexForm");
  const input      = document.getElementById("pokedexInput");
  const randomBtn  = document.getElementById("pokedexRandomBtn");
  const grid       = document.getElementById("pokedexGrid");
  const loading    = document.getElementById("pokedexLoading");
  const errorBox   = document.getElementById("pokedexError");
  const modal      = document.getElementById("pokedexModal");
  const modalBody  = document.getElementById("pokedexModalBody");
  const modalClose = document.getElementById("pokedexModalClose");
  const favGrid    = document.getElementById("favGrid");
  const favSection = document.getElementById("favSection");
  const autocomplete = document.getElementById("pokedexAutocomplete");

  if (!grid) return;

  /* Datos*/
  const TYPE_LABELS = {
    normal:"Normal",fire:"Fuego",water:"Agua",electric:"Eléctrico",
    grass:"Planta",ice:"Hielo",fighting:"Lucha",poison:"Veneno",
    ground:"Tierra",flying:"Volador",psychic:"Psíquico",bug:"Bicho",
    rock:"Roca",ghost:"Fantasma",dragon:"Dragón",dark:"Siniestro",
    steel:"Acero",fairy:"Hada",
  };
  const PRODUCT_TYPES = [
    { label:"Figura coleccionable", base:9000 },
    { label:"Peluche",              base:7500 },
    { label:"Carta promocional",    base:6000 },
  ];
  const FEATURED = ["pikachu","charizard","gengar","umbreon","mew","lucario"];

  let cache      = {};
  let nameList   = [];
  let loadedList = false;

  /* Favoritos*/
  function getFavs() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
    catch { return []; }
  }
  function saveFavs(arr) { localStorage.setItem(FAV_KEY, JSON.stringify(arr)); }
  function isFav(id) { return getFavs().includes(Number(id)); }
  function toggleFav(id) {
    id = Number(id);
    const favs = getFavs();
    const idx  = favs.indexOf(id);
    if (idx === -1) favs.push(id); else favs.splice(idx, 1);
    saveFavs(favs);
    // Actualizar botones corazón en la página
    document.querySelectorAll(`.fav-btn[data-id="${id}"]`).forEach(btn => {
      btn.classList.toggle("active", favs.includes(id));
      btn.title = favs.includes(id) ? "Quitar de favoritos" : "Agregar a favoritos";
    });
    renderFavSection();
  }

  /* Autocompletado*/
  async function loadNameList() {
    if (loadedList) return;
    try {
      const res  = await fetch(API_LIST);
      const data = await res.json();
      nameList   = data.results.map(p => p.name);
      loadedList = true;
    } catch {}
  }

  let acTimer = null;
  function handleAutocomplete(val) {
    clearTimeout(acTimer);
    if (!autocomplete) return;
    if (!val || val.length < 2) { autocomplete.style.display = "none"; return; }
    acTimer = setTimeout(async () => {
      await loadNameList();
      const q       = val.toLowerCase();
      const matches = nameList.filter(n => n.startsWith(q)).slice(0, 6);
      if (!matches.length) { autocomplete.style.display = "none"; return; }
      autocomplete.innerHTML = matches.map(n =>
        `<li class="ac-item" data-name="${n}">${capitalize(n)}</li>`
      ).join("");
      autocomplete.style.display = "block";
    }, 220);
  }

  if (input) {
    input.addEventListener("input", () => handleAutocomplete(input.value.trim()));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { autocomplete.style.display = "none"; }
    });
  }
  document.addEventListener("click", (e) => {
    if (autocomplete && !autocomplete.contains(e.target) && e.target !== input) {
      autocomplete.style.display = "none";
    }
    const acItem = e.target.closest(".ac-item");
    if (acItem) {
      input.value = capitalize(acItem.getAttribute("data-name"));
      autocomplete.style.display = "none";
      handleSearch(acItem.getAttribute("data-name"));
    }
  });

  /* Utils*/
  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function showLoading(show) {
    if (loading) loading.style.display = show ? "flex" : "none";
  }
  function showError(msg) {
    if (!errorBox) return;
    errorBox.textContent = msg || "";
    errorBox.style.display = msg ? "block" : "none";
  }

  async function fetchPokemon(nameOrId) {
    const res = await fetch(API_BASE + String(nameOrId).toLowerCase().trim());
    if (!res.ok) throw new Error("No encontramos ese Pokémon. Revisá el nombre e intentá de nuevo.");
    return res.json();
  }

  /* Cards*/
  function buildCard(p, prepend) {
    cache[p.id] = p;
    const img  = p.sprites?.other?.["official-artwork"]?.front_default
                 || p.sprites?.front_default
                 || `https://placehold.co/280x280/1a2437/d4af37?text=${capitalize(p.name)}`;
    const types = p.types.map(t => TYPE_LABELS[t.type.name] || capitalize(t.type.name));
    const num   = String(p.id).padStart(3, "0");
    const fav   = isFav(p.id);

    const div = document.createElement("div");
    div.className = "poke-card";
    div.style.opacity = "0";
    div.innerHTML = `
      <div class="poke-card-thumb">
        <span class="poke-num">#${num}</span>
        <img src="${img}" alt="${capitalize(p.name)}" loading="lazy">
        <button type="button" class="fav-btn ${fav ? "active" : ""}" data-id="${p.id}" title="${fav ? "Quitar de favoritos" : "Agregar a favoritos"}">
          <i class="fa-${fav ? "solid" : "regular"} fa-heart"></i>
        </button>
      </div>
      <div class="poke-card-body">
        <div class="poke-types">${types.map(t => `<span class="poke-type-badge">${t}</span>`).join("")}</div>
        <h4>${capitalize(p.name)}</h4>
        <div class="poke-card-actions">
          <button type="button" class="btn btn-outline poke-details-btn" data-id="${p.id}">Ver detalles</button>
          <button type="button" class="btn btn-gold poke-add-btn" data-id="${p.id}">Agregar al carrito</button>
        </div>
      </div>`;

    if (prepend && grid.firstChild) {
      grid.insertBefore(div, grid.firstChild);
    } else {
      grid.appendChild(div);
    }
    // Animación fade-in con pequeño delay
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { div.style.opacity = ""; div.classList.add("poke-animate-in"); });
    });
  }

  function renderFavSection() {
    if (!favGrid || !favSection) return;
    const favs = getFavs();
    if (!favs.length) { favSection.style.display = "none"; return; }
    favSection.style.display = "block";
    favGrid.innerHTML = "";
    favs.forEach(id => {
      if (cache[id]) buildFavChip(cache[id]);
    });
  }

  function buildFavChip(p) {
    const img = p.sprites?.other?.["official-artwork"]?.front_default || p.sprites?.front_default || "";
    const chip = document.createElement("div");
    chip.className = "fav-chip";
    chip.innerHTML = `
      <img src="${img}" alt="${capitalize(p.name)}">
      <span>${capitalize(p.name)}</span>
      <button type="button" class="fav-remove-btn" data-id="${p.id}" title="Quitar"><i class="fa-solid fa-xmark"></i></button>`;
    favGrid.appendChild(chip);
  }

  /* Fetch y render*/
  async function loadFeatured() {
    showLoading(true); showError(null);
    try {
      const results = await Promise.all(FEATURED.map(n => fetchPokemon(n)));
      results.forEach(p => buildCard(p, false));
    } catch (err) {
      showError("No pudimos cargar los Pokémon destacados. Intentá recargar la página.");
    } finally {
      showLoading(false);
      renderFavSection();
    }
  }

  async function handleSearch(query) {
    if (!query) return;
    showLoading(true); showError(null);
    try {
      const p = await fetchPokemon(query);
      buildCard(p, true);
      document.getElementById("pokedexResults")?.scrollIntoView({ behavior:"smooth", block:"start" });
    } catch (err) {
      showError(err.message);
    } finally {
      showLoading(false);
    }
  }

  async function handleRandom() {
    const id = Math.floor(Math.random() * MAX_ID) + 1;
    showLoading(true); showError(null);
    try {
      const p = await fetchPokemon(id);
      buildCard(p, true);
      document.getElementById("pokedexResults")?.scrollIntoView({ behavior:"smooth", block:"start" });
    } catch (err) {
      showError("Ocurrió un error. Probá de nuevo.");
    } finally {
      showLoading(false);
    }
  }

  /* Modal*/
  function statBar(stat) {
    const pct = Math.min(100, Math.round((stat.base_stat / 200) * 100));
    return `<div class="poke-stat-row">
      <span class="poke-stat-label">${stat.stat.name.toUpperCase()}</span>
      <div class="poke-stat-track"><div class="poke-stat-fill" style="width:${pct}%"></div></div>
      <span class="poke-stat-value">${stat.base_stat}</span>
    </div>`;
  }

  function openModal(p) {
    const img      = p.sprites?.other?.["official-artwork"]?.front_default || p.sprites?.front_default || "";
    const types    = p.types.map(t => TYPE_LABELS[t.type.name] || capitalize(t.type.name));
    const abilities = p.abilities.map(a => capitalize(a.ability.name.replace(/-/g," ")));
    const fav      = isFav(p.id);
    modalBody.innerHTML = `
      <div class="poke-modal-grid">
        <div class="poke-modal-img"><img src="${img}" alt="${capitalize(p.name)}"></div>
        <div class="poke-modal-info">
          <div class="poke-modal-title-row">
            <div>
              <span class="poke-num-lg">#${String(p.id).padStart(3,"0")}</span>
              <h3>${capitalize(p.name)}</h3>
            </div>
            <button type="button" class="fav-btn ${fav ? "active" : ""}" data-id="${p.id}" title="${fav ? "Quitar de favoritos" : "Agregar a favoritos"}">
              <i class="fa-${fav ? "solid" : "regular"} fa-heart"></i>
            </button>
          </div>
          <div class="poke-types">${types.map(t => `<span class="poke-type-badge">${t}</span>`).join("")}</div>
          <div class="poke-modal-meta">
            <div><i class="fa-solid fa-ruler-vertical"></i> ${(p.height/10).toFixed(1)} m</div>
            <div><i class="fa-solid fa-weight-hanging"></i> ${(p.weight/10).toFixed(1)} kg</div>
          </div>
          <p class="poke-modal-abilities"><strong>Habilidades:</strong> ${abilities.join(", ")}</p>
          <div class="poke-stats">${p.stats.map(statBar).join("")}</div>
          <button type="button" class="btn btn-gold poke-add-btn" data-id="${p.id}" style="width:100%;justify-content:center;">Agregar al carrito</button>
        </div>
      </div>`;
    modal.classList.add("open");
  }

  function closeModal() { modal.classList.remove("open"); }

  function addPokemonToCart(p) {
    const pt    = PRODUCT_TYPES[p.id % PRODUCT_TYPES.length];
    const price = pt.base + (p.base_experience || 50) * 8;
    const img   = p.sprites?.other?.["official-artwork"]?.front_default || p.sprites?.front_default || "";
    const name  = `${pt.label} de ${capitalize(p.name)}`;
    Cart.addItem({ id: `poke-${p.id}-${Cart.slugify(pt.label)}`, name, price, img });

    // Feedback visual en botones de esa card
    document.querySelectorAll(`.poke-add-btn[data-id="${p.id}"]`).forEach(b => {
      const orig = b.textContent;
      b.textContent = "¡Agregado!";
      b.classList.add("added");
      setTimeout(() => { b.textContent = orig; b.classList.remove("added"); }, 1100);
    });
  }

  /* Eventos*/
  if (form) form.addEventListener("submit", e => { e.preventDefault(); handleSearch(input.value.trim()); });
  if (randomBtn) randomBtn.addEventListener("click", handleRandom);
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal) modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // Delegación global para la pokédex
  document.addEventListener("click", e => {
    const detailsBtn = e.target.closest(".poke-details-btn");
    const addBtn     = e.target.closest(".poke-add-btn");
    const favBtn     = e.target.closest(".fav-btn");
    const favRemove  = e.target.closest(".fav-remove-btn");

    if (detailsBtn) { const p = cache[detailsBtn.dataset.id]; if (p) openModal(p); }
    if (addBtn)     { const p = cache[addBtn.dataset.id];     if (p) addPokemonToCart(p); }
    if (favBtn)     { toggleFav(favBtn.dataset.id); }
    if (favRemove)  { toggleFav(favRemove.dataset.id); }
  });

  loadFeatured();
});