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
    document.getElementById("edition").innerHTML = "<p>mode édition</p>";
    document.getElementById("edition").classList.add("editheader");
    document.getElementById("projets").innerHTML = "<a href=\"#modal\" id=\"bouton-modif\">\"modifier\"</a>";
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

function resetModals(){
  document.getElementById("modal-gallery").style.display = "block";
  document.getElementById("modal-add-photo").style.display = "none";
}



let modal = null;

function openModal() {
  resetModals();
  document.getElementById("modal").style.display = "flex";
  document.getElementById("modal").classList.add("modal");
  modal = document.getElementById("modal");

  document.getElementById("galeriephoto").innerHTML = displayworks(retourBackend);

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal();
    }
  })

  document.getElementById("croix").addEventListener("click", closeModal);
  document.addEventListener('click', (event) => {
    if (!modal.contains(event.target) && !openModalButton.contains(event.target)) {
      closeModal();
    }
  });
};

function closeModal() {
  if (modal === null) {
    return;
  }

  document.getElementById("croix").removeEventListener("click", closeModal);
  document.getElementById("modal").classList.remove("modal");
  document.getElementById("modal").style.display = "none";

  /* modal.removeEventListener("click", closemodal);
   modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);*/

  modal = null;
};

function stopPropagation() {
  e.stopPropagation();
};

function afficherModaleAjouterUnePhoto() {
  document.getElementById("modal-gallery").style.display = "none";
  document.getElementById("modal-add-photo").style.display = "block";
}

document.getElementById("ajouter-une-photo").addEventListener("click", afficherModaleAjouterUnePhoto)

document.getElementById("bouton-modif").addEventListener("click", openModal);

document.getElementById("button-modal-return").addEventListener("click", resetModals);