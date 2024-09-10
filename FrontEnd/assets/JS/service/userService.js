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
  return await reponse.json();
}