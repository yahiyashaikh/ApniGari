import React, { useState } from "react";

const App = () => {
  const [isOpen, setIsOpen] = useState(false); // window closed by default
  const [viewMode, setViewMode] = useState("chat"); // chat | car | bike
  const [messages, setMessages] = useState([]); // chat history
  const [input, setInput] = useState(""); // input text

  // Example data
  const carData = [
    {
      name: "Tesla Model S",
      img: "https://www.tesla.com/sites/default/files/modelsx-new/social/model-s-hero-social.jpg",
      price: "$85,000",
    },
    {
      name: "BMW i8",
      img: "car.jpg",
      price: "$140,000",
    },
    {
      name: "BMW i8",
      img: "car.jpg",
      price: "$140,000",
    },
    {
      name: "BMW i8",
      img: "car.jpg",
      price: "$140,000",
    },
  ];

  const bikeData = [
    {
      name: "Kawasaki Ninja",
      img: "bike2.jpg",
      price: "$6,000",
    },
    {
      name: "Yamaha R1",
      img: "bike4.png",
      price: "$18,000",
    },
    {
      name: "Yamaha R1",
      img: "bike4.png",
      price: "$18,000",
    },
    {
      name: "Yamaha R1",
      img: "bike4.png",
      price: "$18,000",
    },
  ];

  // handle sending messages
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    let botReply = "🤖 This is a demo reply.";

    // greeting check (case-insensitive + partial match)
    const lower = input.toLowerCase();
    if (lower.includes("hi") || lower.includes("hello")) {
      botReply = "👋 Welcome to Apni Gari 🚗! How can I help you?";
    }

    setMessages([...messages, newMessage, { role: "model", content: botReply }]);
    setInput("");
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
          {/* Header with buttons */}
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              ApniGari Bot
            </h1>
            <div className="space-x-2">
              <button
                onClick={() => setViewMode("chat")}
                className={`px-3 py-1 rounded ${
                  viewMode === "chat" ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setViewMode("car")}
                className={`px-3 py-1 rounded ${
                  viewMode === "car" ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                Cars
              </button>
              <button
                onClick={() => setViewMode("bike")}
                className={`px-3 py-1 rounded ${
                  viewMode === "bike" ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                Bikes
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 bg-red-500 rounded"
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
                      className={`p-2 rounded-lg max-w-xs ${
                        msg.role === "user"
                          ? "bg-purple-600 ml-auto"
                          : "bg-gray-600"
                      }`}
                    >
                      {msg.content}
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
                {carData.map((car, i) => (
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
                ))}
              </div>
            )}

            {/* Bike Mode */}
            {viewMode === "bike" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bikeData.map((bike, i) => (
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
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
