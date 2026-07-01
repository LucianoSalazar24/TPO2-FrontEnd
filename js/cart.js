/* Carrito de compras con persistencia en LocalStorage
+ Toast notifications al agregar productos al carrito
 */

const Cart = (function () {
  const STORAGE_KEY = "pp_cart";

  function getItems() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    render();
  }

  function formatPrice(value) {
    return "$" + Math.round(value).toLocaleString("es-AR");
  }

  function parsePrice(text) {
    const clean = String(text).replace(/[^\d]/g, "");
    return clean ? parseInt(clean, 10) : 0;
  }

  /* Toast*/
  let toastTimer = null;
  function showToast(name) {
    let toast = document.getElementById("ppToast");
    if (!toast) return;
    toast.textContent = "✔ " + name + " agregado al carrito";
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
  }

  function addItem(product) {
    const items = getItems();
    const existing = items.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        qty: 1,
      });
    }
    saveItems(items);
    pulseCartIcon();
    showToast(product.name);
  }

  function removeItem(id) {
    saveItems(getItems().filter((i) => i.id !== id));
  }

  function changeQty(id, delta) {
    const items = getItems();
    const item = items.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      saveItems(items.filter((i) => i.id !== id));
    } else {
      saveItems(items);
    }
  }

  function clear() { saveItems([]); }

  function getTotal() { return getItems().reduce((sum, i) => sum + i.price * i.qty, 0); }
  function getCount() { return getItems().reduce((sum, i) => sum + i.qty, 0); }

  function pulseCartIcon() {
    const toggle = document.querySelector(".cart-toggle");
    if (!toggle) return;
    toggle.classList.add("cart-pulse");
    setTimeout(() => toggle.classList.remove("cart-pulse"), 350);
  }

  function render() {
    const countEl = document.getElementById("cartCount");
    const itemsEl = document.getElementById("cartItems");
    const emptyEl = document.getElementById("cartEmpty");
    const totalEl = document.getElementById("cartTotal");
    if (!countEl || !itemsEl || !emptyEl || !totalEl) return;

    const items = getItems();
    countEl.textContent = getCount();
    countEl.style.display = getCount() > 0 ? "flex" : "none";
    totalEl.textContent = formatPrice(getTotal());

    if (items.length === 0) {
      itemsEl.innerHTML = "";
      emptyEl.style.display = "block";
      return;
    }

    emptyEl.style.display = "none";
    itemsEl.innerHTML = items.map((item) => `
      <div class="cart-item" data-id="${escapeAttr(item.id)}">
        <img src="${item.img}" alt="${escapeAttr(item.name)}">
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">${formatPrice(item.price)}</p>
          <div class="cart-item-qty">
            <button type="button" class="qty-btn qty-minus" aria-label="Restar">−</button>
            <span>${item.qty}</span>
            <button type="button" class="qty-btn qty-plus" aria-label="Sumar">+</button>
          </div>
        </div>
        <button type="button" class="cart-item-remove" aria-label="Quitar"><i class="fa-solid fa-trash"></i></button>
      </div>`).join("");
  }

  function escapeAttr(str) {
    return String(str).replace(/"/g, "&quot;");
  }

  function slugify(str) {
    return String(str).toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function init() {
    render();

    const toggle   = document.querySelector(".cart-toggle");
    const dropdown = document.getElementById("cartDropdown");
    const closeBtn = document.getElementById("cartClose");
    const clearBtn = document.getElementById("cartClear");

    if (toggle && dropdown) {
      toggle.addEventListener("click", (e) => { e.stopPropagation(); dropdown.classList.toggle("open"); });
    }
    if (closeBtn) closeBtn.addEventListener("click", () => dropdown.classList.remove("open"));
    if (clearBtn) clearBtn.addEventListener("click", clear);

    document.addEventListener("click", (e) => {
      if (dropdown && dropdown.classList.contains("open")) {
        if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
          dropdown.classList.remove("open");
        }
      }
    });

    // Botones estáticos "Agregar al carrito"
    document.addEventListener("click", (e) => {
      const addBtn = e.target.closest(".add-to-cart");
      if (addBtn) {
        const card = addBtn.closest(".prod-card");
        if (card) {
          const name      = card.querySelector("h4")?.textContent.trim() || "Producto";
          const priceText = card.querySelector(".price")?.textContent.trim() || "$0";
          const img       = card.querySelector("img")?.getAttribute("src") || "";
          addItem({ id: "static-" + slugify(name), name, price: parsePrice(priceText), img });
        }
        return;
      }

      // Controles dentro del dropdown
      const itemRow = e.target.closest(".cart-item");
      if (itemRow) {
        const id = itemRow.getAttribute("data-id");
        if (e.target.closest(".qty-plus"))        changeQty(id, 1);
        if (e.target.closest(".qty-minus"))       changeQty(id, -1);
        if (e.target.closest(".cart-item-remove")) removeItem(id);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);

  return { addItem, removeItem, changeQty, clear, getItems, getTotal, getCount, formatPrice, slugify };
})();