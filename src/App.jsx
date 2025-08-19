import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import ChatBot from "./components/Chatbot.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import Header from "./components/Header.jsx"; // Make sure the path is correct
// You can also import other pages like Contact if you have them
// import Contact from "./pages/contact.jsx";

function App() {
  return (
    <div className="App">
       {/* Your header should be outside the Routes component */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* Add more routes here as you create them */}
      </Routes>
       <ChatBot />
    </div>
  );
}

export default App;