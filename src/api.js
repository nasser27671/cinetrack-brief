import { cards, setupFilter } from "./movie.js";
import { setupModal } from "./modal.js";

async function affichage() {

    const res = await fetch("https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json");

    if (!res.ok) {
        throw new Error("Erreur API");
    }

    const data = await res.json();

    cards(data);

    setupFilter(data);

    setupModal(data);
}

affichage();
