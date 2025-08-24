import { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    fuel_type: "",
    condition: "",
    price: "",
    image_url: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/bikes/", formData); // backend route
      alert("Bike added successfully 🚀");
      setFormData({
        brand: "",
        model: "",
        year: "",
        mileage: "",
        fuel_type: "",
        condition: "",
        price: "",
        image_url: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add bike ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Add a Bike 🏍️</h2>

        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          type="text"
          placeholder="Brand"
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          name="model"
          value={formData.model}
          onChange={handleChange}
          type="text"
          placeholder="Model"
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          name="year"
          value={formData.year}
          onChange={handleChange}
          type="number"
          placeholder="Year"
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          name="mileage"
          value={formData.mileage}
          onChange={handleChange}
          type="number"
          step="0.1"
          placeholder="Mileage (km/l)"
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-600"
        />
        <select
          name="fuel_type"
          value={formData.fuel_type}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-600"
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
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-600"
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
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          type="text"
          placeholder="Image URL"
          className="w-full px-4 py-2 border rounded-lg bg-gray-50"
        />

        <button
          type="submit"
          className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Add Bike
        </button>
      </form>
    </div>
  );
}
