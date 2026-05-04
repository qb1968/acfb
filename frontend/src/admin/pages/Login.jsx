// src/admin/pages/Login.jsx
import { useState } from "react";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await api("/auth/login", "POST", { email, password });

    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/admin/events");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 border p-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 border p-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-accent py-2 rounded">Login</button>
      </form>
    </div>
  );
}
