async function login() {
  try {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    let retourBackend = await loguser(login, password);
    sessionStorage.setItem("token", retourBackend.token);
    window.location.replace("index.html")
  }
  catch (error) {
    console.log("Erreur lors de l'appel au backend : ", error)
  }
}

document.getElementById("buttonlogin").addEventListener('click', (evenement) => {
  evenement.preventDefault();
  login();
});


