
import { getContents } from "./api.js";
import {setupFilter,setupFavorites} from "./movie.js";
import { setupModal } from "./modal.js";

async function affichage() {

    const list = document.getElementById("list");

    try {
        const data = await getContents();
        setupFilter(data);
        setupFavorites(data);
        setupModal(data);
    } catch (error) {
        list.innerHTML = `
            <p class="text-red-400">
                Impossible de charger les films et séries.
            </p>
        `;
        console.error(error);
    }
}

affichage();
