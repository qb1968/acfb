const API_URL = "http://localhost:5000/api";

export const api = async (endpoint, method = "GET", body) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return res.json();
};
