async function getallworks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  return await reponse.json();
}

async function postWork(image, title, category) {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('title', title);
  formData.append('category', category);

  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function deleteWork(workId) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}