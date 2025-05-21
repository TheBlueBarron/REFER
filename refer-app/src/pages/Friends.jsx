import { useState, useEffect } from "react";
import axios from "../api/axiosClient";

export default function Friends() {
  const [email, setEmail] = useState("");
  const [friends, setFriends] = useState([]);
  const [services, setServices] = useState([]);
  const [leadNote, setLeadNote] = useState({});
  const [showForm, setShowForm] = useState({});

  const fetchFriends = async () => {
    const res = await axios.get("/friends");
    setFriends(res.data);
  };

  const fetchFriendServices = async () => {
    const res = await axios.get("/friends/services");
    setServices(res.data);
  };

  const handleAddFriend = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/friends", { email });
      setEmail("");
      fetchFriends();
      fetchFriendServices();
    } catch (err) {
      alert("Failed to add friend");
    }
  };

  const toggleForm = (serviceId) => {
    setShowForm((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const handleNoteChange = (serviceId, value) => {
    setLeadNote((prev) => ({
      ...prev,
      [serviceId]: value,
    }));
  };

  const handleSendLead = async (serviceId) => {
    try {
      await axios.post("/leads", {
        service_id: serviceId,
        note: leadNote[serviceId] || "",
      });
      alert("Lead sent!");
      setLeadNote((prev) => ({ ...prev, [serviceId]: "" }));
      setShowForm((prev) => ({ ...prev, [serviceId]: false }));
    } catch (err) {
      alert("Failed to send lead");
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchFriendServices();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Friends</h1>

      <form onSubmit={handleAddFriend} className="mb-6 flex gap-2">
        <input
          type="email"
          placeholder="Friend's email"
          className="border p-2 flex-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Friend
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6 mb-2">Friends' Services</h2>
      {services.map((s) => (
        <div key={s.id} className="border p-4 rounded shadow mb-4">
          <div className="flex justify-between items-center">
            <div>
              <strong>{s.title}</strong> — Reward: ${s.reward}
              <br />
              <span className="text-sm text-gray-600">Posted by: {s.owner_name}</span>
            </div>
            <button
              className="text-blue-600 underline text-sm"
              onClick={() => toggleForm(s.id)}
            >
              {showForm[s.id] ? "Cancel" : "Send Lead"}
            </button>
          </div>

          {showForm[s.id] && (
            <div className="mt-2">
              <textarea
                className="border p-2 w-full mb-2"
                placeholder="Lead note"
                value={leadNote[s.id] || ""}
                onChange={(e) => handleNoteChange(s.id, e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded"
                onClick={() => handleSendLead(s.id)}
              >
                Submit Lead
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
