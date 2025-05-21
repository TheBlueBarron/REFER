import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome back, {user?.name || "User"}!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/services" className="p-4 bg-blue-100 rounded shadow">
          🛠 My Services
        </Link>
        <Link to="/friends" className="p-4 bg-green-100 rounded shadow">
          👥 Friends' Services
        </Link>
        <Link to="/leads" className="p-4 bg-yellow-100 rounded shadow">
          📤 Leads I've Sent
        </Link>
        <Link to="/incoming-leads">
          📥 Incoming Leads</Link>

        <Link to="/wallet" className="p-4 bg-purple-100 rounded shadow">
          💰 My Wallet
        </Link>
        <Link to="/messages" className="p-4 bg-gray-100 rounded shadow">
          💬 Messages
        </Link>
      </div>
    </div>
  );
}
