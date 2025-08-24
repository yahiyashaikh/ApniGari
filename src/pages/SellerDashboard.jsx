import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadModal from "../components/UploadModal"; // ensure correct path

// Updated component for the prediction modal
const PredictPriceModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    type: "car",
    brand: "",
    model: "",
    year: "",
  });
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState({ car: [], bike: [] });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-brands");
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'type') {
      setFormData({ ...formData, [e.target.name]: e.target.value, brand: "" });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPredictedPrice(null);

    try {
      const response = await fetch("http://localhost:5000/predict-price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to get price prediction.");
      }

      const data = await response.json();
      setPredictedPrice(data.predicted_price);
    } catch (error) {
      console.error("Error predicting price:", error);
      alert("Failed to predict price. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const brandList = brands[formData.type] || [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Predict Your Vehicle Price
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600"
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>
          
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600"
            required
          >
            <option value="" disabled>Select a brand</option>
            {brandList.map((brand, index) => (
              <option key={index} value={brand}>
                {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Model (e.g., Alto, Splendor)"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600"
            required
          />
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year (e.g., 2020)"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600"
            min="1900"
            max="2025"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-red-400"
            disabled={isLoading}
          >
            {isLoading ? "Predicting..." : "Get Price Prediction"}
          </button>
        </form>

        {predictedPrice !== null && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center">
            <p className="text-lg font-semibold">
              Predicted Price: ₹{predictedPrice.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main SellerDashboard component (remains mostly unchanged)
function SellerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [isUploadOpen, setUploadOpen] = useState(false);
  const [isPredictOpen, setPredictOpen] = useState(false);
  const [viewMode, setViewMode] = useState("car");
  const [cars, setCars] = useState([]);
  const [bikes, setBikes] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!user || user.role !== "seller") {
      alert("You must be logged in as a seller to access this page.");
      navigate("/");
    }
  }, [user, navigate]);

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`http://localhost:5000/get-vehicles/${user.email}`);
      const data = await res.json();
      const carList = data.filter((v) => v.type === "car");
      const bikeList = data.filter((v) => v.type === "bike");
      setCars(carList);
      setBikes(bikeList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchVehicles();
    }
  }, [user?.email]);

  const handleUploadSuccess = () => {
    fetchVehicles();
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const res = await fetch(`http://localhost:5000/delete-vehicle/${vehicleId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Listing deleted successfully!");
          fetchVehicles();
        } else {
          alert("Failed to delete the listing.");
        }
      } catch (err) {
        console.error("Error deleting vehicle:", err);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const activeList = viewMode === "car" ? cars : bikes;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Seller Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={handleBackToHome}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back to Home
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold">
          Welcome, {user?.name || user?.email} 👋
        </h2>
        <p className="text-gray-600 mt-2">
          Manage your listings and sales here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition">
          <h3 className="text-lg font-semibold text-gray-700">Active Cars</h3>
          <p className="text-3xl font-bold text-blue-600">{cars.length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition">
          <h3 className="text-lg font-semibold text-gray-700">Active Bikes</h3>
          <p className="text-3xl font-bold text-blue-600">{bikes.length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition">
          <h3 className="text-lg font-semibold text-gray-700">Earnings</h3>
          <p className="text-3xl font-bold text-blue-600">₹2.4L</p>
        </div>
      </div>

      <div className="mb-6 flex gap-4 flex-wrap">
        <button
          onClick={() => setViewMode("car")}
          className={`py-2 px-4 rounded ${
            viewMode === "car"
              ? "bg-red-600 text-white"
              : "bg-white border border-gray-300"
          }`}
        >
          Cars
        </button>
        <button
          onClick={() => setViewMode("bike")}
          className={`py-2 px-4 rounded ${
            viewMode === "bike"
              ? "bg-red-600 text-white"
              : "bg-white border border-gray-300"
          }`}
        >
          Bikes
        </button>
        <button
          onClick={() => setUploadOpen(true)}
          className="py-2 px-6 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Add {viewMode === "car" ? "Car" : "Bike"} Details
        </button>
        <button
          onClick={() => setPredictOpen(true)}
          className="py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Predict Your Price
        </button>
      </div>

      {isUploadOpen && (
        <UploadModal
          isUploadOpen={isUploadOpen}
          setUploadOpen={setUploadOpen}
          viewMode={viewMode}
          sellerEmail={user.email}
          onUploadSuccess={handleUploadSuccess}
        />
      )}

      <PredictPriceModal
        isOpen={isPredictOpen}
        onClose={() => setPredictOpen(false)}
      />

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Your Uploaded {viewMode === "car" ? "Cars" : "Bikes"}
        </h2>
        {activeList.length === 0 ? (
          <p className="text-gray-500">No {viewMode}s uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {activeList.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white shadow-lg rounded-xl p-4 relative"
              >
                <button
                  onClick={() => handleDeleteVehicle(vehicle.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition"
                  aria-label="Delete listing"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {vehicle.image && (
                  <img
                    src={`http://localhost:5000${vehicle.image}`}
                    alt={vehicle.model}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold">
                  {vehicle.brand} {vehicle.model}
                </h3>
                <p className="text-gray-600">Year: {vehicle.year}</p>
                <p className="text-gray-600 capitalize">Type: {vehicle.type}</p>
                <p className="text-green-600 font-bold">₹ {vehicle.price}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {vehicle.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerDashboard;