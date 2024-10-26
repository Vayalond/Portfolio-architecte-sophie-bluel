async function loguser(email, password) {
  const reponse = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      "email": email,
      "password": password
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (reponse.status === 200) {
    return await reponse.json();
  } else if (reponse.status === 404) {
    window.alert("Utilisateur non trouvé");
    throw new Error("Erreur 404 : utilisateur non trouvé");
    
  } else if (reponse.status === 401) {
    window.alert("Mot de passe incorrect");
    throw new Error("Erreur 401 : mot de passe incorrect");
  }
}