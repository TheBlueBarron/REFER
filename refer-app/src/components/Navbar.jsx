import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
      <Link to="/">Home</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={logout} className="text-red-400">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
