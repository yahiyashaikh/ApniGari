import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("car");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showContactDetails, setShowContactDetails] = useState(false);

  // Get logged-in user from localStorage and manage state
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setSignInOpen(false);
    if (userData.role === "buyer") {
      navigate("/buyer-dashboard");
    } else if (userData.role === "seller") {
      navigate("/seller-dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("http://localhost:5000/get-vehicles");
        const data = await res.json();
        setVehicles(data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
    };

    fetchVehicles();
    const interval = setInterval(fetchVehicles, 5000);
    return () => clearInterval(interval);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        setRegisterOpen(false);
        setSignInOpen(true);
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        handleLogin(data.user);
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  // ✅ New function to handle the Connect with Seller button click
  const handleConnectClick = () => {
    if (user) {
      // If the user is logged in, show contact details
      setShowContactDetails(true);
    } else {
      // If not logged in, show an alert and open the sign-in modal
      alert("Please sign in first to view seller contact details.");
      setSelectedVehicle(null); // Close the details modal first
      setSignInOpen(true); // Open the sign-in modal
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col font-sans">
        {/* ✅ Header */}
        <Header
          viewMode={viewMode}
          setViewMode={setViewMode}
          isLoggedIn={!!user}
          userRole={user?.role}
          setSignInOpen={setSignInOpen}
          setRegisterOpen={setRegisterOpen}
          handleLogout={handleLogout}
        />

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row justify-between items-center px-10 py-16 bg-gray-50">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl font-extrabold text-gray-900 leading-snug">
              Get every {viewMode} detail at fingertips.
            </h2>
            <p className="text-lg text-gray-700">
              Check Real Prices <br />
              With Our AI Feature. <br />
              Buy/Sell your dream {viewMode}.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">
                Explore New {viewMode === "car" ? "Car" : "Bike"}
              </button>

              <button
                onClick={() => setSignInOpen(true)}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900"
              >
                Upload {viewMode === "car" ? "Car" : "Bike"}
              </button>
            </div>
          </div>

          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src={
                viewMode === "car"
                  ? "/Screenshot 2025-08-17 074937.png"
                  : "/bikelogo.png"
              }
              alt={viewMode}
              className="rounded-xl shadow-lg w-100 animate-pulse"
            />
          </div>
        </section>

        {/* --- */}

        {/* ✅ Live Vehicles Section */}
        <section className="px-15 py-16 bg-gray-50">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Latest {viewMode === "car" ? "Cars" : "Bikes"} on Sale
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {vehicles
              .filter((v) => v.type === viewMode)
              .map((v) => (
                <div
                  key={v.id}
                  className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition text-center"
                >
                  {v.image ? (
                    <img
                      src={`http://localhost:5000${v.image}`}
                      alt={v.brand}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900">
                    {v.brand} {v.model}
                  </h3>
                  <p className="text-gray-600">₹ {v.price}</p>
                  <p className="text-gray-600">{v.year}</p>
                  <p className="text-gray-600 line-clamp-2">
                    {v.description}
                  </p>
                  <button
                    type="button"
                    className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                      setSelectedVehicle(v);
                      setShowContactDetails(false);
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))}
          </div>
        </section>

        {/* --- */}

        {/* ✅ Vehicle Details Modal (Corrected to show all data) */}
        {selectedVehicle && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
                onClick={() => setSelectedVehicle(null)}
                aria-label="Close"
              >
                ✖
              </button>

              {/* Image */}
              {selectedVehicle.image ? (
                <img
                  src={`http://localhost:5000${selectedVehicle.image}`}
                  alt={`${selectedVehicle.brand} ${selectedVehicle.model}`}
                  className="w-full h-56 object-cover rounded-xl mb-4"
                />
              ) : (
                <div className="w-full h-56 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* ✅ Full details from backend */}
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                {selectedVehicle.brand} {selectedVehicle.model}
              </h2>

              <div className="grid grid-cols-2 gap-3 text-gray-700">
                <p>
                  <span className="font-semibold">Vehicle ID:</span>{" "}
                  {selectedVehicle.id}
                </p>
                <p>
                  <span className="font-semibold">Type:</span>{" "}
                  {selectedVehicle.vehicle_type}
                </p>
                <p>
                  <span className="font-semibold">Brand:</span>{" "}
                  {selectedVehicle.brand}
                </p>
                <p>
                  <span className="font-semibold">Model:</span>{" "}
                  {selectedVehicle.model}
                </p>
                <p>
                  <span className="font-semibold">Year:</span>{" "}
                  {selectedVehicle.year}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ₹{" "}
                  {selectedVehicle.price}
                </p>
              </div>

              <div className="mt-3 text-gray-700">
                <p className="font-semibold mb-1">Description:</p>
                <p className="text-gray-600">
                  {selectedVehicle.description || "—"}
                </p>
              </div>

              {/* ✅ Contact Details Section */}
              {showContactDetails && (
                <div className="mt-5 p-4 bg-gray-100 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-800">
                    Seller Details
                  </h3>
                  <p className="mt-2 text-gray-700">
                    <span className="font-semibold">Name:</span>{" "}
                    {selectedVehicle.seller_name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span>{" "}
                    {selectedVehicle.seller_email}
                  </p>
                </div>
              )}

              <div className="mt-5 flex gap-3">
                {/* REPLACED CLOSE BUTTON WITH CONNECT BUTTON */}
                <button
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
                  // ✅ Use the new handler function here
                  onClick={handleConnectClick}
                >
                  Connect with Seller
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- */}

        {/* Brands Section */}
        <section className="px-10 py-16 bg-white text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Explore New {viewMode === "car" ? "Car" : "Bike"} Brands
          </h2>
          <div className="flex flex-wrap justify-center gap-10 text-lg font-semibold text-gray-700">
            {viewMode === "car" ? (
              <>
                <div className="flex flex-col items-center">
                  <img
                    src="audilogo.png"
                    alt="Audi"
                    className="w-20 h-20 object-contain hover:scale-110 transition"
                  />
                  <span className="mt-2">Audi</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="mercedes.png"
                    alt="Mercedes"
                    className="w-20 h-20 object-contain hover:scale-110 transition"
                  />
                  <span className="mt-2">Mercedes</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="Land-Rover-Logo.png"
                    alt="Land Rover"
                    className="w-20 h-20 object-contain hover:scale-110 transition"
                  />
                  <span className="mt-2">Land Rover</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="Ferrarilogo.png"
                    alt="Ferrari"
                    className="w-20 h-20 object-contain hover:scale-110 transition"
                  />
                  <span className="mt-2">Ferrari</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="teslalogo.png"
                    alt="Tesla"
                    className="w-20 h-20 object-contain hover:scale-110 transition"
                  />
                  <span className="mt-2">Tesla</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center">
                  <img
                    src="RE.png"
                    alt="Royal Enfield"
                    className="w-20 h-20 object-contain hover:scale-110 transition"
                  />
                  <span className="mt-2">Royal Enfield</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="ktm.jpg"
                    alt="KTM"
                    className="w-20 h-20 object-contain hover:scale-110 transition"
                  />
                  <span className="mt-2">KTM</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="Yamha.png"
                    alt="Yamaha"
                    className="w-20 h-20 object-contain hover:scale-110 transition"
                  />
                  <span className="mt-2">Yamaha</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="honda.png"
                    alt="Honda"
                    className="w-20 h-20 object-contain hover:scale-110 transition"
                  />
                  <span className="mt-2">Honda</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="/bajaj.png"
                    alt="Bajaj"
                    className="w-20 h-20 object-contain hover:scale-110 transition"
                  />
                  <span className="mt-2">Bajaj</span>
                </div>
              </>
            )}
          </div>
          <button className="mt-10 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
            See the Store
          </button>
        </section>

        {/* --- */}

        {/* Footer */}
        <footer className="bg-black text-white px-10 py-12">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-3 text-red-600">
                APNIGARI.com
              </h3>
              <p className="text-gray-400">
                {viewMode === "car"
                  ? "Car Buy / Sell platform"
                  : "Bike Buy / Sell platform"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Career</li>
                <li>Blog</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help / FAQs</li>
                <li>Customer Service</li>
                <li>Reservation</li>
                <li>Report & Governance</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Subscribe</h3>
              <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="px-4 py-2 bg-transparent outline-none text-white w-full"
                />
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700">
                  Next
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-10">
            © 2025 APNIGARI - All rights reserved.
          </p>
        </footer>
      </div>

      {/* --- */}

      {/* --------- SIGN IN MODAL --------- */}
      {isSignInOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setSignInOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Sign In
            </h2>
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
              {/* Role selection */}
              <select
                name="role"
                value={loginData.role}
                onChange={handleLoginChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              >
                <option value="">Select Role</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
              >
                Sign In
              </button>
            </form>
            <p className="text-sm text-center text-gray-600 mt-4">
              Don’t have an account?{" "}
              <span
                onClick={() => {
                  setSignInOpen(false);
                  setRegisterOpen(true);
                }}
                className="text-red-600 cursor-pointer hover:underline"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      )}
      {/* --- */}

      {/* --------- REGISTER MODAL --------- */}
      {isRegisterOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setRegisterOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Register
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              >
                <option value="">Select Role</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
              >
                Register
              </button>
            </form>
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setRegisterOpen(false);
                  setSignInOpen(true);
                }}
                className="text-red-600 cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}