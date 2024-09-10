async function login() {
  try {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    let retourBackend = await loguser(login, password);
    console.log(retourBackend);
   /* if (userId === 1) {

    }
    else {
      console.error("User not found :", error);
    } */
  }
  catch (error) {
    console.error("Erreur lors de la récupération coté backend :", error);
  }

}



document.getElementById("buttonlogin").addEventListener('click', (evenement) =>  {
  evenement.preventDefault();
  login(); 

});
