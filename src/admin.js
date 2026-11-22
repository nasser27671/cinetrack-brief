import {getContents,createContent,updateContent,deleteContent,} from "./api.js";

const form = document.getElementById("contentForm");
const table = document.getElementById("contentsTable");
const formMessage = document.getElementById("formMessage");
const tableMessage = document.getElementById("tableMessage");
const submitButton = document.getElementById("submitButton");
const cancelEdit = document.getElementById("cancelEdit");

let contents = [];
let editingId = null;

async function loadContents() {
  try {
    contents = await getContents();
    displayContents();
    tableMessage.textContent = "";
  } catch (error) {
    console.log(error);
    tableMessage.textContent = "Erreur de chargement.";
  }
}

function displayContents() {
  table.innerHTML = contents
    .map(function (content) {
      return `
        <tr class="border-b border-gray-700">
          <td class="p-3">
            <img src="${content.image}" class="w-16 h-20 object-cover rounded">
          </td>
          <td class="p-3">${content.title}</td>
          <td class="p-3">${content.type}</td>
          <td class="p-3">${content.releaseYear}</td>
          <td class="p-3">
            <button data-action="edit" data-id="${content.id}" class="bg-yellow-400 text-black px-3 py-2 rounded mb-1">
              Modifier
            </button>
            <button data-action="delete" data-id="${content.id}" class="bg-red-500 text-white px-3 py-2 rounded">
              Supprimer
            </button>
          </td>
        </tr>
      `;
    })
    .join("");
}

function getFormData() {
  const contentType = document.getElementById("type").value;

  return {
    title: document.getElementById("title").value,
    type: contentType,
    releaseYear: Number(document.getElementById("releaseYear").value),
    image: document.getElementById("image").value,
    description: document.getElementById("description").value,
    duration: contentType === "movie" ? Number(document.getElementById("duration").value) : null,
    seasons: contentType === "series" ? document.getElementById("seasons").value.split(",").map(Number) : [],
    genres: document.getElementById("genres").value.split(",").map(function (item) {
      return item.trim();
    }),
    directors: document.getElementById("directors").value.split(",").map(function (item) {
      return item.trim();
    }),
    productionCountries: document.getElementById("productionCountries").value.split(",").map(function (item) {
      return item.trim();
    }),
  };
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const data = getFormData();

  try {
    if (editingId !== null) {
      await updateContent(editingId, data);
      formMessage.textContent = "Contenu modifié avec succès.";
    } else {
      await createContent(data);
      formMessage.textContent = "Contenu ajouté avec succès.";
    }

    form.reset();
    editingId = null;
    submitButton.textContent = "Ajouter";
    cancelEdit.classList.add("hidden");
    await loadContents();
  } catch (error) {
    console.log(error);
    formMessage.textContent = "Erreur lors de l'enregistrement.";
  }
});

table.addEventListener("click", async function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  const id = button.dataset.id;
  const action = button.dataset.action;

  if (action === "delete") {
    if (!confirm("Voulez-vous supprimer ce contenu ?")) return;

    try {
      await deleteContent(id);
      await loadContents();
    } catch (error) {
      console.log(error);
      tableMessage.textContent = "Erreur lors de la suppression.";
    }
  }

  if (action === "edit") {
    const content = contents.find(function (item) {
      return String(item.id) === String(id);
    });

    if (!content) return;

    editingId = content.id;
    document.getElementById("title").value = content.title || "";
    document.getElementById("type").value = content.type || "";
    document.getElementById("releaseYear").value = content.releaseYear || "";
    document.getElementById("image").value = content.image || "";
    document.getElementById("description").value = content.description || "";
    document.getElementById("duration").value = content.duration || "";
    document.getElementById("seasons").value = (content.seasons || []).join(", ");
    document.getElementById("genres").value = (content.genres || []).join(", ");
    document.getElementById("directors").value = (content.directors || []).join(", ");
    document.getElementById("productionCountries").value = (content.productionCountries || []).join(", ");

    submitButton.textContent = "Modifier";
    cancelEdit.classList.remove("hidden");
    form.scrollIntoView({ behavior: "smooth" });
  }
});

cancelEdit.addEventListener("click", function () {
  form.reset();
  editingId = null;
  submitButton.textContent = "Ajouter";
  cancelEdit.classList.add("hidden");
  formMessage.textContent = "";
});

loadContents();