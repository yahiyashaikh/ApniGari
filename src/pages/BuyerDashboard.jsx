import { useNavigate } from "react-router-dom";

function BuyerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Buyer Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold">Welcome, {user?.name || user?.email} 👋</h2>
        <p className="text-gray-600 mt-2">Here are your latest activities.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition">
          <h3 className="text-lg font-semibold text-gray-700">Saved Cars</h3>
          <p className="text-3xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition">
          <h3 className="text-lg font-semibold text-gray-700">Recent Searches</h3>
          <p className="text-3xl font-bold text-green-600">5</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition">
          <h3 className="text-lg font-semibold text-gray-700">Offers</h3>
          <p className="text-3xl font-bold text-green-600">3</p>
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
