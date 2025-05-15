function displayworks(works) {
  let resultat = "";

  works.forEach(work => {
    resultat += `<figure>
      <img src="${work.imageUrl}" alt="${work.title}">
      <figcaption>${work.title}</figcaption>
      <button onclick=\"suprimerelement(${work.id})\"id="${work.id}" class=\"delete\"> delete </button> 
    </figure>`;
  });

  return resultat;
}

async function filters(idcategory) {
  try {
    let gallery = document.getElementById("gallery");
    let retourBackend = await getallworks();
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


let retourBackend = null;
let isModalOpen = false; // Indicateur d'état de la modale
async function init() {
  try {
    let gallery = document.getElementById("gallery");
    retourBackend = await getallworks();
    gallery.innerHTML = displayworks(retourBackend);
  } catch (error) {
    console.error("Erreur lors de la récupération coté backend :", error);
  }

  document.querySelectorAll(".filtre").forEach((bouton, index) =>
    bouton.addEventListener('click', () => filters(index))
  );
}


init();

function isconnected() {
  if (sessionStorage.getItem("token")) {
    document.getElementById("edition").innerHTML = `<p><i class="fa-solid fa-pen-to-square"></i>mode édition</p>`;
    document.getElementById("edition").classList.add("editheader");
    document.getElementById("projets").innerHTML = `<a href=\"#modal\" id=\"bouton-modif\"><i class="fa-solid fa-pen-to-square"></i>\"modifier\"</a>`;
    document.getElementById("loginheader").innerHTML = "<button onclick=\"deconnexion()\"> logout</button>";
  }
}

isconnected();

function deconnexion() {
  if (sessionStorage.getItem("token")) {
    sessionStorage.removeItem("token");
    document.getElementById("edition").classList.remove("editheader");
    document.getElementById("loginheader").innerHTML = "<a href=\"login.html\">login</a>";
    document.getElementById("projets").innerHTML = "<p></p>";
    document.getElementById("edition").innerHTML = "<p></p>";
  }
}

function resetModals() {
  const modal = document.getElementById("modal");

  if (modal.style.display != "flex") {
    modal.style.display = "flex";
  }
  if (!modal.classList.contains("modal")) {
    modal.classList.add("modal");
  }

  document.getElementById("modal-add-photo").style.display = "none";
  document.getElementById("modal-gallery").style.display = "block";
  isModalOpen = true;
}


function openModal() {
  resetModals();
  document.getElementById("galeriephoto").innerHTML = displayworks(retourBackend);
  
 

  // Ajoute les écouteurs pour la touche "Escape" et pour le clic en dehors
  window.addEventListener("keydown", closeOnEscape);
  document.getElementById("croix").addEventListener("click", closeModal);
  

}

function closeModal() {
  const modal = document.getElementById("modal");

  if (isModalOpen) {
    modal.style.display = "none";
    modal.classList.remove("modal");
    isModalOpen = false; // Désactive l'indicateur d'état

    // Retire les écouteurs seulement si la modale est ouverte
    window.removeEventListener("keydown", closeOnEscape);
    document.getElementById("croix").removeEventListener("click", closeModal);
  }
}

window.addEventListener('load', function () {
  document.addEventListener('click', event => {
    if (event.target.classList.contains('modal')) {
      closeModal();
    }
  });
});

function closeOnEscape(e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal();
  }
}

function closeOnClickOutside(event) {
  const modalGallery = document.getElementById("modal-gallery");
  if (isModalOpen && modalGallery && !modalGallery.contains(event.target)) {
    closeModal();
  }
}


function stopPropagation() {
  e.stopPropagation();
};

function afficherModaleAjouterUnePhoto() {
  document.getElementById("modal-gallery").style.display = "none";
  document.getElementById("modal-add-photo").style.display = "block";
}
function suprimerelement(idwork) {
  deleteWork(idwork);
}

document.getElementById("ajouter-une-photo").addEventListener("click", afficherModaleAjouterUnePhoto);

document.getElementById("bouton-modif").addEventListener("click", openModal);

document.getElementById("button-modal-return").addEventListener("click", resetModals);

document.getElementById("button-modal-close").addEventListener("click", closeModal);

