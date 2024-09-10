 async function backendworks() {
    const reponse = await fetch("http://localhost:5678/api/works");
    return await reponse.json();
  }