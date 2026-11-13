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
