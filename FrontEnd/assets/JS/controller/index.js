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

async function filters(idcategory) {
  try {
    let gallery = document.getElementById("gallery");
    let retourBackend = await backendworks();
    if (idcategory === 1) {
      retourBackend = retourBackend.filter((work) => work.category.id === 1)
    }
    else if (idcategory === 2) {
      retourBackend = retourBackend.filter((work) => work.category.id === 2)
    }
    else if (idcategory === 3) {
      retourBackend = retourBackend.filter((work) => work.category.id === 3)
    }
    gallery.innerHTML = displayworks(retourBackend);
  } catch (error) {
    console.error("Erreur lors de la récupération coté backend :", error);
  }
}


async function init() {
  try {
    let gallery = document.getElementById("gallery");
    let retourBackend = await backendworks();
    gallery.innerHTML = displayworks(retourBackend);
  } catch (error) {
    console.error("Erreur lors de la récupération coté backend :", error);
  }

  document.querySelectorAll(".filtre").forEach((bouton, index) =>
    bouton.addEventListener('click', () => filters(index))
  );
}


init();

