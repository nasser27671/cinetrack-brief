async function affichage() {
  const res = await fetch('https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json');
  if (!res.ok) {
    throw new Error("Erreur API");
  }
  const data = await res.json();
  console.log(data);
}
affichage();