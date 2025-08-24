import { useState } from "react";

export default function SellerCarForm({ sellerEmail }) {
  const [carData, setCarData] = useState({
    name: "",
    model: "",
    price: "",
    year: "",
  });

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/add-car", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...carData, sellerEmail }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Car added successfully!");
        setCarData({ name: "", model: "", price: "", year: "" });
      } else {
        alert(data.message || "Failed to add car.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <form className="space-y-4 max-w-md mx-auto p-4 border rounded-lg shadow" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Add a Car</h2>
      <input
        type="text"
        placeholder="Car Name"
        name="name"
        value={carData.name}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Model"
        name="model"
        value={carData.model}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        value={carData.price}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Year"
        name="year"
        value={carData.year}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <button type="submit" className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700">
        Add Car
      </button>
    </form>
  );
}
