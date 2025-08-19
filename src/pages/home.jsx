import { useState } from "react";
import { Link } from "react-router-dom"; // Add this import
import Header from "../components/Header";

export default function home() {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isUploadOpen, setUploadOpen] = useState(false);
  const [viewMode, setViewMode] = useState("car"); // "car" or "bike"

  const carData = [
    { price: "₹ 2,30,300", range: "1-5 lac", year: 2016, img: "/car1.png" },
    { price: "₹ 8,90,000", range: "5-10 lac", year: 2016, img: "/car2.png" },
    { price: "₹ 14,00,000", range: "10-20 lac", year: 2016, img: "/car3.png" },
    { price: "₹ 23,00,000", range: "20-30 lac", year: 2020, img: "/car4.png" },
  ];

  const bikeData = [
    { price: "₹ 85,000", range: "50k-1 lac", year: 2018, img: "/bike1.png" },
    { price: "₹ 1,50,000", range: "1-2 lac", year: 2020, img: "/bike2.jpg" },
    { price: "₹ 2,30,000", range: "2-3 lac", year: 2021, img: "/bike3.jpg" },
    { price: "₹ 3,80,000", range: "3-5 lac", year: 2023, img: "/bike4.png" },
  ];

  return (
    <>
      <div className="w-full min-h-screen flex flex-col font-sans">
      {/* ✅ Use Header */}
        <Header
          viewMode={viewMode}
          setViewMode={setViewMode}
          setSignInOpen={setSignInOpen}
          setRegisterOpen={setRegisterOpen}
        />

       {/* Hero Section */}
<section className="flex flex-col md:flex-row justify-between items-center px-10 py-16 bg-gray-50">
  <div className="md:w-1/2 space-y-6">
    <h2 className="text-4xl font-extrabold text-gray-900 leading-snug">
      Get every {viewMode} detail at fingertips.
    </h2>
    <p className="text-lg text-gray-700">
      Check Real Prices <br />
      With Our AI Feature. <br />
      Buy/Sell your dream {viewMode}.
    </p>
    <div className="flex gap-4">
      <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">
        Explore New {viewMode === "car" ? "Car" : "Bike"}
      </button>
      <button
        onClick={() => setUploadOpen(true)}
        className="px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50"
      >
        Upload {viewMode === "car" ? "Car" : "Bike"} Details
      </button>
    </div>
  </div>

  {/* Animated Image */}
  <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
    <img
      src={
        viewMode === "car"
          ? "/Screenshot 2025-08-17 074937.png"
          : "/bikelogo.png"
      }
      alt={viewMode}
      className="rounded-xl shadow-lg w-100 animate-pulse"
    />
  </div>
</section>

        {/* Features Section */}
        <section className="px-10 py-16 bg-white grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl shadow bg-gray-50 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Buy</h3>
            <p className="text-gray-600">Find the best experience with our AI</p>
          </div>
          <div className="p-6 rounded-xl shadow bg-gray-50 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Book with flexibility
            </h3>
            <p className="text-gray-600">Trusted and free, best & reliable</p>
          </div>
          <div className="p-6 rounded-xl shadow bg-gray-50 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Analyse</h3>
            <p className="text-gray-600">AI based fair {viewMode} price estimation</p>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-15 py-16 bg-gray-50">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            {viewMode === "car" ? "Car Price Suggestions" : "Bike Price Suggestions"}
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {(viewMode === "car" ? carData : bikeData).map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition text-center"
              >
                <img
                  src={item.img}
                  alt={viewMode}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900">{item.price}</h3>
                <p className="text-gray-600">{item.range}</p>
                <p className="text-gray-600">{item.year}</p>
                <p className="text-gray-600">15k • Auto</p>
                <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Analyse
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Brands Section */}
<section className="px-10 py-16 bg-white text-center">
  <h2 className="text-3xl font-bold text-gray-900 mb-8">
    Explore New {viewMode === "car" ? "Car" : "Bike"} Brands
  </h2>
  <div className="flex flex-wrap justify-center gap-10 text-lg font-semibold text-gray-700">
    {viewMode === "car" ? (
      <>
        <div className="flex flex-col items-center">
          <img src="audilogo.png" alt="Audi" className="w-20 h-20 object-contain hover:scale-110 transition" />
          <span className="mt-2">Audi</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="mercedes.png" alt="Mercedes" className="w-20 h-20 object-contain hover:scale-110 transition" />
          <span className="mt-2">Mercedes</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="Land-Rover-Logo.png" alt="Land Rover" className="w-20 h-20 object-contain hover:scale-110 transition" />
          <span className="mt-2">Land Rover</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="Ferrarilogo.png" alt="Ferrari" className="w-20 h-20 object-contain hover:scale-110 transition" />
          <span className="mt-2">Ferrari</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="teslalogo.png" alt="Tesla" className="w-20 h-20 object-contain hover:scale-110 transition" />
          <span className="mt-2">Tesla</span>
        </div>
      </>
    ) : (
      <>
        <div className="flex flex-col items-center">
          <img src="RE.png" alt="Royal Enfield" className="w-20 h-20 object-contain hover:scale-110 transition" />
          <span className="mt-2">Royal Enfield</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="ktm.jpg" alt="KTM" className="w-20 h-20 object-contain hover:scale-110 transition" />
          <span className="mt-2">KTM</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="Yamha.png" alt="Yamaha" className="w-20 h-20 object-contain hover:scale-110 transition" />
          <span className="mt-2">Yamaha</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="honda.png" alt="Honda" className="w-20 h-20 object-contain hover:scale-110 transition" />
          <span className="mt-2">Honda</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/bajaj.png" alt="Bajaj" className="w-20 h-20 object-contain hover:scale-110 transition" />
          <span className="mt-2">Bajaj</span>
        </div>
      </>
    )}
  </div>
  <button className="mt-10 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
    See the Store
  </button>
</section>

        {/* Footer */}
        <footer className="bg-black text-white px-10 py-12">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-3 text-red-600">
                APNIGARI.com
              </h3>
              <p className="text-gray-400">
                {viewMode === "car"
                  ? "Car Buy / Sell platform"
                  : "Bike Buy / Sell platform"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Career</li>
                <li>Blog</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help / FAQs</li>
                <li>Customer Service</li>
                <li>Reservation</li>
                <li>Report & Governance</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Subscribe</h3>
              <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="px-4 py-2 bg-transparent outline-none text-white w-full"
                />
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700">
                  Next
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-10">
            © 2025 APNIGARI - All rights reserved.
          </p>
        </footer>
      </div>

      {/* --------- UPLOAD MODAL (Dynamic) --------- */}
      {isUploadOpen && (
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
            <form className="space-y-4">
              <input type="text" placeholder={`${viewMode === "car" ? "Car" : "Bike"} Name / Brand`} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none" />
              <input type="number" placeholder="Price (₹)" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none" />
              <input type="text" placeholder="Model" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none" />
              <input type="number" placeholder="Year" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none" />
              
              {viewMode === "car" ? (
                <>
                  <input type="text" placeholder="Mileage (e.g. 15 km/l)" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none" />
                  <input type="text" placeholder="Driven Kilometers (e.g. 20,000 km)" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none" />
                </>
              ) : (
                <>
                  <input type="text" placeholder="Engine CC (e.g. 150cc)" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none" />
                  <input type="text" placeholder="Driven Kilometers (e.g. 10,000 km)" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none" />
                </>
              )}
              
              <input type="file" className="w-full px-4 py-3 border rounded-lg bg-gray-50" />
              <button type="submit" className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">
                Submit {viewMode === "car" ? "Car" : "Bike"} Details
              </button>
            </form>
          </div>
        </div>
      )}

     {/* --------- SIGN IN MODAL --------- */}
{isSignInOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
      <button
        onClick={() => setSignInOpen(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
      >
        ✕
      </button>
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Sign In
      </h2>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
        />

        {/* Role selection */}
        <select
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
          required
        >
          <option value="">Select Role</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
        >
          Sign In
        </button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Don’t have an account?{" "}
        <span
          onClick={() => {
            setSignInOpen(false);
            setRegisterOpen(true);
          }}
          className="text-red-600 cursor-pointer hover:underline"
        >
          Register
        </span>
      </p>
    </div>
  </div>
)}

{/* --------- REGISTER MODAL --------- */}
{isRegisterOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
      <button
        onClick={() => setRegisterOpen(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
      >
        ✕
      </button>
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Register
      </h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
        />

        {/* Role selection */}
        <select
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
          required
        >
          <option value="">Select Role</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
        >
          Register
        </button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <span
          onClick={() => {
            setRegisterOpen(false);
            setSignInOpen(true);
          }}
          className="text-red-600 cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>
    </div>
  </div>
)}

    </>
  );
}


