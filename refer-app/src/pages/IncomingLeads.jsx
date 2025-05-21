import { useState, useEffect } from "react";
import axios from "../api/axiosClient";

export default function IncomingLeads() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("/leads/for-me");
      setLeads(res.data);
    } catch (err) {
      console.error("Failed to load incoming leads", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.post(`/leads/${id}/status`, { status });
      fetchLeads(); // refresh
    } catch (err) {
      alert("Failed to update lead");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Incoming Leads</h1>

      {leads.length === 0 ? (
        <p>No incoming leads yet.</p>
      ) : (
        <ul className="space-y-4">
          {leads.map((lead) => (
            <li key={lead.id} className="border p-4 rounded shadow bg-white">
              <p><strong>Service:</strong> {lead.service_title}</p>
              <p><strong>Sender:</strong> {lead.sender_name}</p>
              <p><strong>Note:</strong> {lead.note}</p>
              <p><strong>Status:</strong> <span className="font-semibold">{lead.status}</span></p>
              <p className="text-xs text-gray-500">
                Sent on {new Date(lead.created_at).toLocaleString()}
              </p>

              {lead.status === "pending" && (
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => updateStatus(lead.id, "converted")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Mark Converted
                  </button>
                  <button
                    onClick={() => updateStatus(lead.id, "not_converted")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Not Converted
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
