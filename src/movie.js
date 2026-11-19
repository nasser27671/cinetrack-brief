
import { movieName, img, type, description, genres, directors } from "./ui.js";
import { setupPagination } from "./pagination.js";

export function cards(films) {

    const list = document.getElementById("list");

    list.innerHTML = films.map(function (film) {

        const title = movieName(film);
        const image = img(film);
        const filmType = type(film);
        const filmDescription = description(film);
        const filmDirectors = directors(film);
        const filmGenres = genres(film);

        return `
            <div data-id="${film.id}" class="w-64 bg-gray-800 rounded-xl shadow-lg cursor-pointer">

                <img src="${image}" class="w-full h-64 object-cover">

                <div class="p-3">

                    <h2 class="text-white text-xl font-bold">${title}</h2>

                    <div class="flex items-center justify-between">
                        <p class="text-gray-400 mt-1">${filmType}</p>
                        <p class="text-gray-400 mt-1">${film.year ?? ""}</p>
                    </div>

                    <p class="text-gray-300 mt-2">${filmDescription}</p>

                    <p class="text-gray-400 mt-2">${filmDirectors}</p>

                    <p class="text-gray-400 mt-2">${filmGenres}</p>

                    <button data-action="favorite"
                        class="bg-yellow-400 text-black w-full p-2 mt-3 rounded-lg">

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

            const nameMatch =
                movieName(film).toLowerCase().includes(search);

            const typeMatch =
                typeFilter === "all" || type(film) === typeFilter;

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

    const favorites = [];

    function afficherFavoris() {

        favoritesList.innerHTML = favorites.map(function (film) {

            return `
                <div class="bg-gray-800 p-3 rounded-lg">

                    <img src="${img(film)}"
                        class="w-full h-32 object-cover rounded-lg">

                    <p class="text-white font-bold mt-2">
                        ${movieName(film)}
                    </p>

                    <p class="text-gray-400">
                        ${type(film)}
                    </p>

                    <button data-remove="${film.id}"
                        class="bg-red-500 text-white w-full p-2 mt-2 rounded-lg">

                        Remove

                    </button>

                </div>
            `;

        }).join("");

    }

    list.addEventListener("click", function (event) {

        const bouton = event.target.closest('[data-action="favorite"]');

        if (!bouton) return;

        const card = bouton.closest("[data-id]");

        const id = card.dataset.id;

        const film = films.find(function (film) {
            return film.id == id;
        });

        if (!film) return;

        const existe = favorites.find(function (favori) {
            return favori.id == id;
        });

        if (existe) return;

        favorites.push(film);

        afficherFavoris();

    });

    favoritesList.addEventListener("click", function (event) {

        const bouton = event.target.closest("[data-remove]");

        if (!bouton) return;

        const id = bouton.dataset.remove;

        const index = favorites.findIndex(function (film) {
            return film.id == id;
        });

        if (index !== -1) {
            favorites.splice(index, 1);
        }

        afficherFavoris();

    });

}
