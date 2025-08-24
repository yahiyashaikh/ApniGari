import { useState } from "react";

function UploadModal({ isUploadOpen, setUploadOpen, viewMode, sellerEmail, onUploadSuccess }) {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    fuelType: "",
    condition: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("brand", formData.brand);
    data.append("model", formData.model);
    data.append("year", formData.year);
    data.append("mileage", formData.mileage);
    data.append("fuelType", formData.fuelType);
    data.append("condition", formData.condition);
    data.append("price", formData.price);
    data.append("image", formData.image);
    data.append("sellerEmail", sellerEmail);
    data.append("type", viewMode); // car or bike

    try {
      const response = await fetch("http://localhost:5000/add-vehicle", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert(`${viewMode === "car" ? "Car" : "Bike"} uploaded successfully!`);

        // ✅ instantly update seller dashboard
        if (onUploadSuccess) {
          onUploadSuccess({
            ...result.vehicle, // backend should return inserted vehicle
            image: URL.createObjectURL(formData.image), // temporary preview
          });
        }

        setUploadOpen(false);
        setFormData({
          brand: "",
          model: "",
          year: "",
          mileage: "",
          fuelType: "",
          condition: "",
          price: "",
          image: null,
        });
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading data!");
    }
  };

  if (!isUploadOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
        <button
          onClick={() => setUploadOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Upload {viewMode === "car" ? "Car" : "Bike"} Details
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            type="text"
            placeholder="Brand"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
          />

          <input
            name="model"
            value={formData.model}
            onChange={handleChange}
            type="text"
            placeholder="Model"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
          />

          <input
            name="year"
            value={formData.year}
            onChange={handleChange}
            type="number"
            placeholder="Year"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
          />

          <input
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            type="number"
            step="0.1"
            placeholder="Mileage (km/l)"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
          />

          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            placeholder="Price (₹)"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
          />

          <input
            name="image"
            onChange={handleChange}
            type="file"
            className="w-full px-4 py-3 border rounded-lg bg-gray-50"
          />

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
          >
            Submit {viewMode === "car" ? "Car" : "Bike"} Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;
