export default function SellerDashboard({ user }) {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-green-600">
        Welcome, {user?.name || user?.email} (Seller)
      </h1>
      <p className="mt-4">This is your Seller Dashboard.</p>
    </div>
  );
}
