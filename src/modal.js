
import { movieName, img, type, description, genres, directors } from "./ui.js";

export function setupModal(films) {

    const list = document.getElementById("list")
    const modal = document.getElementById("modal")
    const modalContent = document.getElementById("modalContent")
    const closeModal = document.getElementById("closeModal")

    list.addEventListener("click", function (event) {

        const card = event.target.closest("[data-id]");

        if (card) {

            const id = card.dataset.id;

            const film = films.find(function (film) {
                return film.id == id;
            });

            if (!film) return;

            modalContent.innerHTML = `
                <h2 class="text-2xl font-bold mb-4">${movieName(film)}</h2>

                <img src="${img(film)}" class="w-80 h-80 mb-4 rounded-lg object-cover">

                <p class="mb-2">${description(film)}</p>

                <p class="mb-2">Type : ${type(film)}</p>



                <p class="mb-2">Directors : ${directors(film)}</p>

                <p>Genres : ${genres(film)}</p>
            `;

            modal.classList.remove("hidden");
        }

    });

    closeModal.addEventListener("click", function () {

        modal.classList.add("hidden");

    });

}
