import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ name: "", brand: "", year: "" });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const res = await axios.get("http://127.0.0.1:8000/cars/");
    setCars(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/cars/", form);
    setForm({ name: "", brand: "", year: "" });
    fetchCars(); // refresh list
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Cars</h1>

      {/* Add Car Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add Car
        </button>
      </form>

      {/* Car List */}
      <ul>
        {cars.map((car) => (
          <li key={car.id} className="border p-2 my-2">
            {car.name} - {car.brand} ({car.year})
          </li>
        ))}
      </ul>
    </div>
  );
}
