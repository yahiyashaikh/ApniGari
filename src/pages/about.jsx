import { useState } from "react";
import Header from "../components/Header"; // Make sure your Header component is imported

export default function About() {
  const [viewMode, setViewMode] = useState("car"); // "car" or "bike"
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  // Define your team members with real or placeholder data
  const teamMembers = [
    {
      name: "Priya Singh",
      role: "Co-Founder & CTO",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Amit Patel",
      role: "Head of Product",
      img: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Kavita Rao",
      role: "Lead Designer",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Vikram Kumar",
      role: "Marketing Director",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        setSignInOpen={setSignInOpen}
        setRegisterOpen={setRegisterOpen}
      />

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 px-10 text-center">
        <h1 className="text-5xl font-extrabold text-red-600 mb-6">
          About APNIGARI
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          We're on a mission to bring{" "}
          <span className="text-red-600 font-semibold">trust</span>,{" "}
          <span className="text-red-600 font-semibold">transparency</span>, and{" "}
          <span className="text-red-600 font-semibold">fairness</span> to the vehicle market. Our AI-driven platform connects genuine buyers and sellers, making it easier than ever to buy or sell your dream car or bike.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="px-10 py-16 bg-white grid md:grid-cols-2 gap-8 text-center">
        <div className="p-8 rounded-2xl shadow-lg bg-gray-50 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🚀 Our Mission</h2>
          <p className="text-gray-600">
            To provide AI-driven solutions that bring trust and fairness in
            vehicle pricing, making it easier for people to make informed
            decisions when buying or selling cars and bikes.
          </p>
        </div>
        <div className="p-8 rounded-2xl shadow-lg bg-gray-50 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🌍 Our Vision</h2>
          <p className="text-gray-600">
            To become the #1 trusted platform for automobile deals, empowering
            millions of customers to experience a smarter and safer way to own
            their dream vehicle.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base text-gray-400">Vehicles Sold Annually</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                440,000+
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base text-gray-400">Total Value of Transactions</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                ₹119+ Crore
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base text-gray-400">Happy Users</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                1.2M+
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-10 py-20 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              step: "01",
              title: "Upload Vehicle",
              desc: "Post your Car/Bike details with just a few clicks.",
            },
            {
              step: "02",
              title: "AI Price Estimation",
              desc: "Get instant and fair pricing suggestions.",
            },
            {
              step: "03",
              title: "Buy / Sell",
              desc: "Connect with genuine buyers & sellers hassle-free.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 flex flex-col items-center"
            >
              <span className="text-5xl font-bold text-red-600">{item.step}</span>
              <h3 className="mt-4 text-2xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Section - Now with square cards */}
      <section className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Meet Our Leadership
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              We're a team of passionate innovators dedicated to the future of mobility.
            </p>
          </div>
          
          {/* Team Leader Section */}
          <div className="max-w-xl mx-auto mb-16 text-center">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <img
                src="src/assets/Yahiya.jpg"
                alt="MOHAMMAD YAHIYA SHAIKH"
                className="w-full aspect-square object-cover rounded-lg mx-auto border-4 border-red-500 hover:border-red-700 transition-all duration-300"
              />
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-white">
                  MOHAMMAD YAHIYA SHAIKH
                </h3>
                <p className="text-lg font-semibold text-red-400">
                  FullStack Developer & TEAM LEADER
                </p>
                <p className="mt-4 text-gray-400">
                  Rohan brings over a decade of experience in the automotive industry, pioneering our AI-driven approach to ensure every transaction is transparent and trustworthy.
                </p>
              </div>
            </div>
          </div>
          
          {/* Other Team Members */}
<ul
  role="list"
  className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 sm:gap-y-16"
>
  {[
    {
      name: "Nilesh Roy",
      role: "Backend Developer",
      img: "src/assets/n.jpg",
    },
    {
      name: "Addil Ahmed",
      role: "UI/UX Designer",
      img: "src/assets/aa.jpg",
    },
    {
      name: "RUDRA PRATAP SINGH",
      role: "Data Scientist",
      img: "src/assets/ru.jpg",
    },
    {
      name: "MD AYAAN ",
      role: "CLOUD ENGINEER",
      img: "src/assets/a.jpg",
    },
  ].map((member, idx) => (
    <li key={idx}>
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg text-center">
        <img
          src={member.img}
          alt={member.name}
          className="w-full aspect-square object-cover rounded-lg mx-auto border-2 border-red-500 hover:border-red-700 transition-all duration-300"
        />
        <div className="mt-4">
          <h3 className="text-base font-semibold text-white">
            {member.name}
          </h3>
          <p className="text-sm font-semibold text-red-400">
            {member.role}
          </p>
        </div>
      </div>
    </li>
  ))}
</ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-10 py-20 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "MOHAMMAD YAHIYA",
              review:
                "APNIGARI helped me sell my bike at the best price within days! The process was so simple and transparent.",
            },
            {
              name: "NILESH ROY",
              review:
                "I found my dream car with a genuine seller. The AI pricing gave me peace of mind that I was getting a fair deal.",
            },
            {
              name: "ADDIL",
              review:
                "Finally, a platform I can trust! The AI price estimation is spot on and the user experience is flawless.",
            },
          ].map((user, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <p className="text-gray-700 italic">“{user.review}”</p>
              <h4 className="mt-4 font-semibold text-red-600">{user.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white px-10 py-12 mt-auto">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-3 text-red-600">APNIGARI.com</h3>
            <p className="text-gray-400">
              {viewMode === "car"
                ? "India's #1 Car Buy / Sell Platform"
                : "India's #1 Bike Buy / Sell Platform"}
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
          © 2025 APNIGARI - Driving the Future of Mobility 🚗🏍️
        </p>
      </footer>
    </div>
  );
}