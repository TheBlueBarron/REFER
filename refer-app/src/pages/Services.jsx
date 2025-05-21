import { useState, useEffect } from "react";
import axios from "../api/axiosClient";

export default function Services() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [reward, setReward] = useState("");

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/services/mine");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/services", {
        title,
        reward,
      });
      setTitle("");
      setReward("");
      fetchServices(); // refresh list
    } catch (err) {
      alert("Failed to create service");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Services</h1>

      <form onSubmit={handleCreate} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Service Title"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reward"
          className="border p-2 w-full"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2">Create</button>
      </form>

      <ul className="space-y-2">
        {services.map((s) => (
          <li key={s.id} className="border p-4 rounded shadow">
            <strong>{s.title}</strong> — Reward: ${s.reward}
          </li>
        ))}
      </ul>
    </div>
  );
}
