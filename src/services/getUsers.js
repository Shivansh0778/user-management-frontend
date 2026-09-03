export async function getUsers() {

  const token = localStorage.getItem("token");
  
  const response = await fetch("http://localhost:3000/", {
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
  const response = await fetch(`http://localhost:3000/${id}`, {
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
