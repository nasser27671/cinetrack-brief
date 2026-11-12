
import { cards, setupFilter } from "./movie.js";

async function affichage() {
    try {
        const res = await fetch('https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json');

        if (!res.ok) {
            throw new Error("Erreur API");
        }

        const data = await res.json();

        console.log(data);

        cards(data);
        setupFilter(data);

    } catch (error) {
        console.log(error);
    }
}

affichage();
