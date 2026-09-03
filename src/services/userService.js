const API_URL = import.meta.env.VITE_API_URL;

export async function createUser(user) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  return {
    response,
    data,
  };
}

export async function updateUser(id, user) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  return {
    response,
    data,
  };
}

export async function deleteUser(id){
  const token = localStorage.getItem("token");
    const response = await  fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
    })

    const data = await response.json();

    return {
        response,
        data,
    }
}
