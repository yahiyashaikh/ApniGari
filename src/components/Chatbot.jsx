// Chatbot.jsx
import React, { useState, useEffect } from "react";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState("chat"); // chat | car | bike
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [carData, setCarData] = useState([]);
  const [bikeData, setBikeData] = useState([]);

  // Fetch cars/bikes when switching tabs
  useEffect(() => {
    if (viewMode === "car") {
      fetch("http://localhost:5000/cars")
        .then((res) => res.json())
        .then((data) => setCarData(data))
        .catch(() => setCarData([]));
    }
    if (viewMode === "bike") {
      fetch("http://localhost:5000/bikes")
        .then((res) => res.json())
        .then((data) => setBikeData(data))
        .catch(() => setBikeData([]));
    }
  }, [viewMode]);

  // Send message to Python backend
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: "user", type: "text", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "model", type: data.type, content: data.content },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "model", type: "text", content: "⚠ Error connecting to server." },
      ]);
    }
  };

  return (
    <div className="text-white font-sans">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 p-4 bg-purple-500 text-white rounded-full shadow-lg"
        >
          Open Chat
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 w-screen h-screen flex flex-col p-4 md:p-8 bg-gray-900 z-50">
          {/* Header */}
          <header className="flex justify-between items-center mb-4">
            {/* ApniGari Bot Logo - Adjusted Size and Alignment */}
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              ApniGari Bot
            </h1>
            {/* Buttons - Adjusted Spacing and Sizing */}
            <div className="space-x-1 ml-auto">
              <button
                onClick={() => setViewMode("chat")}
                className={`px-3 py-2 rounded text-base ${
                  viewMode === "chat" ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setViewMode("car")}
                className={`px-3 py-2 rounded text-base ${
                  viewMode === "car" ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                Cars
              </button>
              <button
                onClick={() => setViewMode("bike")}
                className={`px-3 py-2 rounded text-base ${
                  viewMode === "bike" ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                Bikes
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 bg-red-500 rounded text-sm"
              >
                Close
              </button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-800 rounded-lg shadow-inner">
            {/* Chat Mode */}
            {viewMode === "chat" && (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-2">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-lg ${
                        msg.role === "user"
                          ? "bg-purple-600 ml-auto max-w-xs"
                          : "bg-gray-600 w-fit max-w-full"
                      }`}
                    >
                      {msg.type === "text" ? (
                        msg.content
                      ) : (
                        <div className="overflow-x-auto">
                          {/* Table Styling Adjustments for more compactness */}
                          <table className="w-full text-xs text-left text-white table-auto">
                            <thead className="text-xs text-gray-200 uppercase bg-gray-700">
                              <tr>
                                {msg.content.length > 0 && Object.keys(msg.content[0]).map((key) => (
                                  <th scope="col" key={key} className="px-2 py-1 font-bold whitespace-nowrap">
                                    {key.replace('_', ' ')}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {msg.content.map((row, rowIndex) => (
                                <tr key={rowIndex} className="bg-gray-800 border-b border-gray-700">
                                  {Object.values(row).map((value, colIndex) => (
                                    <td key={colIndex} className="px-2 py-1">
                                      {value}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex mt-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded-l-lg bg-gray-700 text-white outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-purple-500 rounded-r-lg"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}

            {/* Car Mode */}
            {viewMode === "car" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {carData.length > 0 ? (
                  carData.map((car, i) => (
                    <div
                      key={i}
                      className="bg-gray-700 p-4 rounded-xl shadow-lg text-center"
                    >
                      <img
                        src={car.img}
                        alt={car.name}
                        className="w-full h-60 object-cover rounded-lg mb-2"
                      />
                      <h2 className="text-lg font-bold">{car.name}</h2>
                      <p className="text-gray-300">{car.price}</p>
                    </div>
                  ))
                ) : (
                  <p>No car data available.</p>
                )}
              </div>
            )}

            {/* Bike Mode */}
            {viewMode === "bike" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bikeData.length > 0 ? (
                  bikeData.map((bike, i) => (
                    <div
                      key={i}
                      className="bg-gray-700 p-4 rounded-xl shadow-lg text-center"
                    >
                      <img
                        src={bike.img}
                        alt={bike.name}
                        className="w-full h-60 object-cover rounded-lg mb-2"
                      />
                      <h2 className="text-lg font-bold">{bike.name}</h2>
                      <p className="text-gray-300">{bike.price}</p>
                    </div>
                  ))
                ) : (
                  <p>No bike data available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;