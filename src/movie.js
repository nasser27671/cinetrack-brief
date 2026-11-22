import {
    movieName,
    img,
    type,
    description,
    genres,
    directors
} from "./ui.js";

import { setupPagination } from "./pagination.js";

export function cards(films) {
    const list = document.getElementById("list");

    list.innerHTML = films.map(function (film) {
        return `
            <div data-id="${film.id}" class="w-64 bg-gray-800 rounded-xl shadow-lg cursor-pointer">
                <img src="${img(film)}" class="w-full h-64 object-cover" alt="${movieName(film)}">
                <div class="p-3">
                    <h2 class="text-white text-xl font-bold">
                        ${movieName(film)}
                    </h2>
                    <div class="flex items-center justify-between">
                        <p class="text-gray-400 mt-1">
                            ${type(film)}
                        </p>
                        <p class="text-gray-400 mt-1">
                            ${film.releaseYear ?? ""}
                        </p>
                    </div>
                    <p class="text-gray-300 mt-2">
                        ${description(film)}
                    </p>
                    <p class="text-gray-400 mt-2">
                        ${directors(film).join(", ")}
                    </p>
                    <p class="text-gray-400 mt-2">
                        ${genres(film).join(", ")}
                    </p>
                    <button data-action="favorite" class="bg-yellow-400 text-black w-full p-2 mt-3 rounded-lg">
                        Add to favorites
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

export function setupFilter(films) {
    function filterAndSearch() {
        const searchInput = document.getElementById("searchInput");
        const optionFilter = document.getElementById("optionFilter");
        const search = searchInput.value.toLowerCase().trim();
        const typeFilter = optionFilter.value;
        const filteredFilms = films.filter(function (film) {
            const nameMatch = movieName(film).toLowerCase().includes(search);
            const typeMatch = typeFilter === "all" || type(film) === typeFilter;
            return nameMatch && typeMatch;
        });

        setupPagination(filteredFilms, cards);
    }

document.getElementById("searchInput").addEventListener("input", filterAndSearch);
document.getElementById("optionFilter").addEventListener("change", filterAndSearch);

    setupPagination(films, cards);
}

export function setupFavorites(films) {
    const list = document.getElementById("list");
    const favoritesList = document.getElementById("favoritesList");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    function afficherFavoris() {
        favoritesList.innerHTML = favorites.map(function (film) {
            return `
                <div class="bg-gray-800 p-3 rounded-lg border border-gray-700">
                    <img src="${img(film)}" class="w-full h-40 object-cover rounded-lg" alt="${movieName(film)}">
                    <p class="text-white font-bold mt-2">
                        ${movieName(film)}
                    </p>
                    <p class="text-gray-400 text-sm mt-1">
                        ${type(film)}
                    </p>
                    <button data-remove="${film.id}" class="bg-red-500 text-white w-full p-2 mt-3 rounded-lg">
                        Remove
                    </button>
                </div>
            `;
        }).join("");
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    list.addEventListener("click", function (event) {
        const bouton = event.target.closest('[data-action="favorite"]');
        if (!bouton) return;
        const card = bouton.closest("[data-id]");
        const id = card.dataset.id;
        const film = films.find(function (film) {

            return String(film.id) === String(id);
        });

        if (!film) return;

        const existe = favorites.find(function (favori) {
            return String(favori.id) === String(id);
        });

        if (existe) return;
        favorites.push(film);
        afficherFavoris();
    });

    favoritesList.addEventListener("click", function (event) {
        const bouton = event.target.closest("[data-remove]");
        if (!bouton) return;

        const id = bouton.dataset.remove;
        favorites = favorites.filter(function (film) {
            return String(film.id) !== String(id);
        });

        afficherFavoris();
    });

    afficherFavoris();
}