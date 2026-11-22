
import {movieName,img,type,description,genres,directors} from "./ui.js";

import {getComments,createComment} from "./api.js";

export function setupModal(films) {
    const list = document.getElementById("list");
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    const closeModal = document.getElementById("closeModal");

    list.addEventListener("click", async function(event) {
        if (event.target.closest("button")) return;

        const card = event.target.closest("[data-id]");
        if (!card) return;

        const id = card.dataset.id;

        const film = films.find(function(film) {
            return String(film.id) === String(id);
        });

        if (!film) return;

        modalContent.innerHTML = `
            <h2 class="text-2xl font-bold mb-4">${movieName(film)}</h2>
            <img src="${img(film)}" class="h-80 mb-4 rounded-lg object-cover">
            <p class="mb-2">${description(film)}</p>
            <p class="mb-2">Type : ${type(film)}</p>
            <p class="mb-2">Directors : ${directors(film).join(", ")}</p>
            <p class="mb-4">Genres : ${genres(film).join(", ")}</p>
            <hr class="border-gray-600 my-4">
            <h3 class="text-xl font-bold mb-3">Commentaires</h3>
            <form id="commentForm">
                <input id="commentAuthor" type="text" placeholder="nom" class="mb-2 text-black w-full h-10 p-2 rounded" required>
                <textarea id="commentText" placeholder="Votre commentaire" class="mb-2 text-black w-full p-2 rounded" required></textarea>
                <button type="submit" class="bg-yellow-400 text-black p-2 rounded-lg">Envoyer</button>
                <p id="commentMessage" class="mt-2"></p>
            </form>
        `;

        modal.classList.remove("hidden");

        await loadComments(id);

        const commentForm = document.getElementById("commentForm");

        commentForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const author = document.getElementById("commentAuthor").value.trim();
            const text = document.getElementById("commentText").value.trim();
            const message = document.getElementById("commentMessage");

            if (!author || !text) return;

            try {
                await createComment({
                    contentId: String(id),
                    author: author,
                    text: text
                });

                message.textContent = "commentaire ajouté";
                message.className = "text-green-400 mt-2";

                commentForm.reset();
                await loadComments(id);
            } catch (error) {
                console.error(error);
                message.textContent = "Erreur lors de l'envoi.";
                message.className = "text-red-400 mt-2";
            }
        });
    });

    async function loadComments(contentId) {
        const commentsList = document.getElementById("commentsList");

        try {
            const comments = await getComments();

            const filmComments = comments.filter(function(comment) {
                return String(comment.contentId) === String(contentId);
            });

            commentsList.innerHTML = filmComments.map(function(comment) {
                return `
                    <div class="bg-gray-700 p-3 rounded-lg mb-2">
                        <p class="font-bold text-yellow-400">${comment.author}</p>
                        <p>${comment.text}</p>
                    </div>
                `;
            }).join("");
        } catch (error) {
            console.error(error);
            commentsList.textContent = "impossible de charger les commentaires";
        }
    }

    closeModal.addEventListener("click", function() {
        modal.classList.add("hidden");
    });
}
