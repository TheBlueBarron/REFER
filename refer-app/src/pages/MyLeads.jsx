import { useState, useEffect } from "react";
import axios from "../api/axiosClient";

export default function MyLeads() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("/leads/mine");
      setLeads(res.data);
    } catch (err) {
      console.error("Failed to load leads", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Sent Leads</h1>

      {leads.length === 0 ? (
        <p>No leads sent yet.</p>
      ) : (
        <ul className="space-y-4">
          {leads.map((lead) => (
            <li
              key={lead.id}
              className="border p-4 rounded shadow bg-white"
            >
              <p><strong>Service:</strong> {lead.service_title}</p>
              <p><strong>Owner:</strong> {lead.owner_name}</p>
              <p><strong>Note:</strong> {lead.note}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                  lead.status === "converted"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {lead.status}
                </span>
              </p>
              <p className="text-xs text-gray-500">
                Sent on {new Date(lead.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
