import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Friends from "./pages/Friends";
import MyLeads from "./pages/MyLeads";
import IncomingLeads from "./pages/IncomingLeads";


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="sticky top-0 z-50 bg-gray-800 text-white p-4 shadow-md">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<Services />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/leads" element={<MyLeads />} />
            <Route path="/incoming-leads" element={<IncomingLeads />} />


          </Routes>
        </div>
        </nav>
      </div>
    </Router>
  );
}

export default App;
