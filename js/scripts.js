document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".hamburger");
  const nav    = document.querySelector(".main-nav");

  if (burger && nav) {
    burger.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    // Cierra al hacer click en un enlace
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }
});

/* Modal de vista previa del producto (index.html)*/
document.addEventListener("DOMContentLoaded", function () {
  var modal    = document.getElementById("prodModal");
  var closeBtn = document.getElementById("prodModalClose");
  var addBtn   = document.getElementById("prodModalAdd");
  if (!modal) return;

  var currentCard = null;

  function openProdModal(card) {
    currentCard = card;
    document.getElementById("prodModalImg").src     = card.dataset.prodImg    || "";
    document.getElementById("prodModalImg").alt     = card.dataset.prodName   || "";
    document.getElementById("prodModalName").textContent   = card.dataset.prodName   || "";
    document.getElementById("prodModalRarity").textContent = card.dataset.prodRarity || "";
    document.getElementById("prodModalSet").textContent    = card.dataset.prodSet    || "";
    document.getElementById("prodModalPrice").textContent  = card.dataset.prodPrice  || "";
    modal.classList.add("open");
  }

  function closeProdModal() { modal.classList.remove("open"); currentCard = null; }

  document.addEventListener("click", function (e) {
    /* Vista rápida */
    var previewBtn = e.target.closest(".prod-preview-btn");
    if (previewBtn) {
      var card = previewBtn.closest(".prod-card");
      if (card) openProdModal(card);
    }
    /* Cerrar modal */
    if (e.target === modal) closeProdModal();

    /* Favoritos de prod-card */
    var favBtn = e.target.closest(".prod-fav-btn");
    if (favBtn) {
      var id   = favBtn.getAttribute("data-id");
      var favs = JSON.parse(localStorage.getItem("pp_prod_favs") || "[]");
      var idx  = favs.indexOf(id);
      if (idx === -1) { favs.push(id); }
      else            { favs.splice(idx, 1); }
      localStorage.setItem("pp_prod_favs", JSON.stringify(favs));
      var active = favs.includes(id);
      favBtn.classList.toggle("prod-fav-active", active);
      var icon = favBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-regular", !active);
        icon.classList.toggle("fa-solid",  active);
      }
      favBtn.style.color = active ? "#e06464" : "";
    }
  });

  if (closeBtn) closeBtn.addEventListener("click", closeProdModal);

  /* Agregar al carrito desde modal */
  if (addBtn) {
    addBtn.addEventListener("click", function () {
      if (!currentCard) return;
      if (typeof Cart !== "undefined") {
        var priceRaw = (currentCard.dataset.prodPrice || "0").replace(/[^\d]/g, "");
        Cart.addItem({
          id:    "static-" + (currentCard.dataset.prodId || "prod"),
          name:  currentCard.dataset.prodName  || "Producto",
          price: parseInt(priceRaw, 10) || 0,
          img:   currentCard.dataset.prodImg   || "",
        });
      }
      closeProdModal();
    });
  }

  /* Restaurar estado de favoritos al cargar */
  var favs = JSON.parse(localStorage.getItem("pp_prod_favs") || "[]");
  document.querySelectorAll(".prod-fav-btn").forEach(function (btn) {
    var id = btn.getAttribute("data-id");
    if (favs.includes(id)) {
      btn.classList.add("prod-fav-active");
      var icon = btn.querySelector("i");
      if (icon) { icon.classList.remove("fa-regular"); icon.classList.add("fa-solid"); }
      btn.style.color = "#e06464";
    }
  });
});