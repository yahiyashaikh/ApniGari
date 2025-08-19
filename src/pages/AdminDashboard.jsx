// src/pages/AdminDashboard.jsx
export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li>📊 Dashboard</li>
          <li>🚗 Manage Cars</li>
          <li>🏍 Manage Bikes</li>
          <li>👤 Users</li>
          <li>⚙️ Settings</li>
        </ul>
      </div>

      {/* Main Dashboard */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, Admin 👋</h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold">Total Cars</h2>
            <p className="text-2xl">25</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold">Total Bikes</h2>
            <p className="text-2xl">40</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold">Users</h2>
            <p className="text-2xl">120</p>
          </div>
        </div>
      </div>
    </div>
  );
}
