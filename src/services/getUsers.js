const API_URL = import.meta.env.VITE_API_URL;


export async function getUsers() {

  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_URL}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return {
    response,
    data,
  };
}

export async function getUser(id) {

  const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}//${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return {
    response,
    data,
  };
}
