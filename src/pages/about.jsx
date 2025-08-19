import { useState } from "react";
import Header from "../components/Header"; // Make sure your Header component is imported

export default function About() {
  const [viewMode, setViewMode] = useState("car"); // "car" or "bike"
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

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
          We are revolutionizing the way people{" "}
          <span className="text-red-600 font-semibold">buy</span>,{" "}
          <span className="text-red-600 font-semibold">sell</span>, and{" "}
          <span className="text-red-600 font-semibold">analyze</span> Cars & Bikes. Powered by AI, APNIGARI ensures transparency, fair pricing,
          and a seamless experience for every vehicle enthusiast.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="px-10 py-16 bg-white grid md:grid-cols-2 gap-8 text-center">
        <div className="p-8 rounded-2xl shadow bg-gray-50 hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🚀 Our Mission</h2>
          <p className="text-gray-600">
            To provide AI-driven solutions that bring trust and fairness in
            vehicle pricing, making it easier for people to make informed
            decisions when buying or selling cars and bikes.
          </p>
        </div>
        <div className="p-8 rounded-2xl shadow bg-gray-50 hover:shadow-xl transition">
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
              <dt className="text-base text-gray-400">Transactions every 24 hours</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                44 million
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base text-gray-400">Assets under holding</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                $119 trillion
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base text-gray-400">New users annually</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                46,000
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
              className="p-8 bg-white rounded-2xl shadow hover:shadow-xl transition flex flex-col items-center"
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

      {/* Leadership Section */}
      <section className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Meet our leadership
            </h2>
            <p className="mt-6 text-lg text-gray-400">
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our clients.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {[
              {
                name: "Leslie Alexander",
                role: "Co-Founder / CEO",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              },
              {
                name: "Michael Foster",
                role: "Co-Founder / CTO",
                img: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              },
              {
                name: "Dries Vincent",
                role: "Business Relations",
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              },
              {
                name: "Lindsay Walton",
                role: "Front-end Developer",
                img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              },
              {
                name: "Courtney Henry",
                role: "Designer",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              },
              {
                name: "Tom Cook",
                role: "Director of Product",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              },
            ].map((member, idx) => (
              <li key={idx}>
                <div className="flex items-center gap-x-6">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-16 h-16 rounded-full outline outline-1 outline-white/10"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-indigo-400">
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
              name: "Arjun Mehta",
              review:
                "APNIGARI helped me sell my bike at the best price within days!",
            },
            {
              name: "Neha Kapoor",
              review:
                "I found my dream car with genuine sellers. Super smooth process.",
            },
            {
              name: "Rohit Singh",
              review:
                "AI price estimation is spot on. Finally a platform I can trust!",
            },
          ].map((user, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition"
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
          © 2025 APNIGARI - Driving the Future of Mobility 🚗🏍️
        </p>
      </footer>
    </div>
  );
}
