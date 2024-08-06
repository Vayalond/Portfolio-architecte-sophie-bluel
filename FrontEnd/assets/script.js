function displayworks(works) {
  let resultat = "";

  works.forEach(work => {
    resultat += `<figure>
      <img src="${work.imageUrl}" alt="${work.title}">
      <figcaption>${work.title}</figcaption>
    </figure>`;
  });

  return resultat;
}

async function backendworks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  return await reponse.json();
}

async function init() {
  try {
    let gallery = document.getElementById("gallery");
    let retourBackend = await backendworks();
    gallery.innerHTML = displayworks(retourBackend);
  } catch (error) {
    console.error("Erreur lors de la récupération coté backend :", error);
  }
}

init();