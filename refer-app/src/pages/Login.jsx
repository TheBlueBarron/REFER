import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axiosClient";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      login(res.data.user, res.data.token); // assumes your backend returns { user }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          className="w-full border p-2 mb-2"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-4"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white py-2">Login</button>
      </form>
    </div>
  );
}
