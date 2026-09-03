export const signup = async (user) => {
  const response = await fetch("http://localhost:3000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return { response, data };
};

export const login = async (user) => {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();

  return {
    response,
    data,
  };
};

export const getMe = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return {
    response,
    data,
  };
};

export const forgotPassword = async (email) => {
  const response = await fetch("http://localhost:3000/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  return { response, data };
};

export const resetPassword = async (resetData) => {
  const response = await fetch("http://localhost:3000/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resetData),
  })
  const data = await response.json();

  return { response, data };
}
