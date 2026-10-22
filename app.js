
const games = [
  { id: 1, title: "NEON FRONTIER", category: "Aventura", color: "#174c39", icon: "🌆" },
  { id: 2, title: "SHADOWS", category: "Ação", color: "#432b56", icon: "🌑" },
  { id: 3, title: "ROTA 9", category: "Corrida", color: "#61321d", icon: "🏎️" },
  { id: 4, title: "PIXEL RUN", category: "Arcade", color: "#214b68", icon: "👾" },
  { id: 5, title: "GUARDIÕES", category: "Aventura", color: "#65531d", icon: "⚔️" },
  { id: 6, title: "CIDADE NEON", category: "Ação", color: "#55303c", icon: "🌃" }
];

const grid = document.querySelector("#gamesGrid");
const search = document.querySelector("#gameSearch");
const navItems = document.querySelectorAll("[data-page]");
const favorites = new Set();
let currentPage = "home";

function renderGames() {
  if (!grid) return;

  const term = search ? search.value.trim().toLowerCase() : "";

  const visibleGames = games.filter(game => {
    const matchesSearch =
      game.title.toLowerCase().includes(term) ||
      game.category.toLowerCase().includes(term);

    const matchesPage =
      currentPage !== "favorites" || favorites.has(game.id);

    return matchesSearch && matchesPage;
  });

  grid.innerHTML = "";

  if (visibleGames.length === 0) {
    grid.innerHTML = '<p class="empty-state">Nenhum jogo encontrado.</p>';
    return;
  }

  visibleGames.forEach(game => {
    const card = document.createElement("article");
    card.className = "game-card";
    card.tabIndex = 0;
    card.style.setProperty("--cover-color", game.color);

    const isFavorite = favorites.has(game.id);

    card.innerHTML = `
      <div class="game-cover">
        <span class="game-icon">${game.icon}</span>
        <button class="favorite-btn" aria-label="Favoritar ${game.title}">
          ${isFavorite ? "★" : "☆"}
        </button>
        <span class="game-title"></span>
      </div>
      <div class="game-info">
        <strong class="game-name"></strong>
        <span class="game-category"></span>
      </div>
    `;

    card.querySelector(".game-title").textContent = game.title;
    card.querySelector(".game-name").textContent = game.title;
    card.querySelector(".game-category").textContent = game.category;

    card.querySelector(".favorite-btn").addEventListener("click", event => {
      event.stopPropagation();

      if (favorites.has(game.id)) {
        favorites.delete(game.id);
      } else {
        favorites.add(game.id);
      }

      renderGames();
    });

    card.addEventListener("click", () => {
      document.querySelectorAll(".game-card").forEach(item => {
        item.classList.remove("selected");
      });

      card.classList.add("selected");
    });

    grid.appendChild(card);
  });
}

navItems.forEach(item => {
  item.addEventListener("click", () => {
    currentPage = item.dataset.page || "home";

    navItems.forEach(nav => nav.classList.remove("active"));
    item.classList.add("active");

    renderGames();
  });
});

if (search) {
  search.addEventListener("input", renderGames);
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && search) {
    search.value = "";
    renderGames();
  }
});

function updateClock() {
  const clock = document.querySelector("#clock");
  if (!clock) return;

  clock.textContent = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
}

updateClock();
setInterval(updateClock, 30000);
renderGames();
    
