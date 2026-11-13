
export function setupPagination(films, displayFilms) {

    const pagination = document.getElementById("pagination");

    const filmsPerPage = 10;

    let currentPage = 1;

    const totalPages = Math.ceil(films.length / filmsPerPage);

    function showFilms() {

        const start = (currentPage - 1) * filmsPerPage;

        const end = start + filmsPerPage;

        const filmsPage = films.slice(start, end);

        displayFilms(filmsPage);

    }

    function showButtons() {

        pagination.innerHTML = "";

        if (currentPage > 1) {

            const previous = document.createElement("button");

            previous.textContent = "Previous";

            previous.className = "bg-yellow-400 px-4 py-2 rounded-lg";

            previous.addEventListener("click", function () {

                currentPage--;

                showFilms();

                showButtons();

            });

            pagination.appendChild(previous);
        }

        for (let i = 1; i <= totalPages; i++) {

            const button = document.createElement("button");

            button.textContent = i;

            button.className = "px-4 py-2 rounded-lg text-white";

            if (i === currentPage) {
                button.className += " bg-yellow-500";
            } else {
                button.className += " bg-gray-700";
            }

            button.addEventListener("click", function () {

                currentPage = i;

                showFilms();

                showButtons();

            });

            pagination.appendChild(button);
        }

        if (currentPage < totalPages) {

            const next = document.createElement("button");

            next.textContent = "Next";

            next.className = "bg-yellow-400 px-4 py-2 rounded-lg";

            next.addEventListener("click", function () {

                currentPage++;

                showFilms();

                showButtons();

            });

            pagination.appendChild(next);
        }
    }

    showFilms();

    showButtons();

}
