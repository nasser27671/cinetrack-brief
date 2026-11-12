
import { movieName, img, type, description, genres, directors } from "./ui.js";

export function cards(films) {
    const list = document.getElementById("list");
    const cardsPage = 10;
    const firstPage = films.slice(0, cardsPage);

    list.innerHTML = firstPage.map(function (film) {

        const title = movieName(film);
        const image = img(film);
        const filmType = type(film);
        const filmDescription = description(film);
        const filmDirectors = directors(film);
        const filmGenres = genres(film);
        console.log(filmType)

        return `
            <div class="w-64 bg-gray-800 rounded-xl shadow-lg">

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

        cards(filteredFilms);
    }

    document.getElementById("searchInput").addEventListener("input", filterAndSearch);

    document.getElementById("optionFilter").addEventListener("change", filterAndSearch);
}
