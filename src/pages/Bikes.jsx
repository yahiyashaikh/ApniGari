import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Bikes() {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/bikes") // 🔥 adjust path to your backend route
      .then((res) => setBikes(res.data))
      .catch((err) => console.error("Error fetching bikes:", err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Bikes 🏍️</h1>
      {bikes.length === 0 ? (
        <p>No bikes found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map((bike) => (
            <li
              key={bike.id}
              className="p-4 bg-white rounded-2xl shadow hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold">{bike.name}</h2>
              <p className="text-gray-600">{bike.brand}</p>
              <p className="text-gray-800 font-bold">₹{bike.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
