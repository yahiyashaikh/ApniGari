import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer"); // default role
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const loggedInUser = { email, role };

    // Save user in global state
    setUser(loggedInUser);

    // Redirect based on role
    navigate(role === "buyer" ? "/buyer" : "/seller");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded-xl bg-gray-700 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded-xl bg-gray-700 outline-none"
        />

        {/* Role selection */}
        <div className="mb-4">
          <label className="block mb-2">Login as</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-700 outline-none"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
