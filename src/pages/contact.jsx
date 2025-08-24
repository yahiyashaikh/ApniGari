import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

// Icons for the contact section, using inline SVG
const MapPinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="m11.54 22.351.07.074a.75.75 0 0 0 1.06 0l.068-.07a8.96 8.96 0 0 0 8.046-8.694c0-4.96-4.04-8.994-9-8.994S2.5 8.397 2.5 13.357a8.96 8.96 0 0 0 8.046 8.694ZM12 14.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
  </svg>
);
const PhoneIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.611.557 1.932 1.328l.182.455a3 3 0 0 0 .848 1.51l2.43 2.43a3 3 0 0 1-.39 3.9L8.7 18.298c-.782.782-2.18.782-2.96 0l-3.23-3.23a3 3 0 0 1 0-4.242l.532-.532a.75.75 0 0 1 1.06 0l1.72 1.72-1.284 1.284c-.39.39-.39 1.024 0 1.414l3.23 3.23a1.5 1.5 0 0 0 2.122 0l4.242-4.243a1.5 1.5 0 0 0 0-2.12l-1.72-1.72-.532-.532a.75.75 0 0 1 0-1.06l1.284-1.284 1.72-1.72a3 3 0 0 1 4.243 0l3.23 3.23a3 3 0 0 1 0 4.242l-3.23 3.23c-.782.782-2.18.782-2.96 0l-1.284-1.284a.75.75 0 0 1 0-1.06l1.72-1.72a1.5 1.5 0 0 0 0-2.12l-3.23-3.23a1.5 1.5 0 0 0-2.122 0l-4.242 4.243a1.5 1.5 0 0 0 0 2.12L8.7 20.202c.782.782 2.18.782 2.96 0l3.23-3.23a3 3 0 0 1 4.242 0l3.23 3.23a3 3 0 0 1 0 4.242l-.532.532a.75.75 0 0 1-1.06 0l-1.72-1.72z" clipRule="evenodd" />
  </svg>
);
const EnvelopeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.58 4.77a3 3 0 0 1-2.84 0L1.5 8.67Z" />
    <path d="M19.5 3h-15a3 3 0 0 0-3 3v.074l9 5.004 9-5.004V6a3 3 0 0 0-3-3Z" />
  </svg>
);

// A simple custom message box to replace native browser alerts
const MessageBox = ({ title, message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 relative text-center">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

// Main ContactUs component with integrated auth modals
export default function ContactUs() {
  const navigate = useNavigate();

  // State for the contact form
  const [formDataContact, setFormDataContact] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  // --- START OF NEW CODE ---
  // Auth Modal States
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [messageBox, setMessageBox] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  // Register Form State
  const [formDataRegister, setFormDataRegister] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  // Login Form State
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  });
  // --- END OF NEW CODE ---

  // Handlers for the Contact Form
  const handleChangeContact = (e) => {
    const { name, value } = e.target;
    setFormDataContact((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form Data:", formDataContact);
      setStatus("success");
      setFormDataContact({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  // --- START OF NEW CODE ---
  // Handlers for Auth Modals
  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setSignInOpen(false);
    setMessageBox({
      isOpen: true,
      title: "Login Successful",
      message: "You have been logged in successfully.",
    });
    if (userData.role === "buyer") {
      navigate("/buyer-dashboard");
    } else if (userData.role === "seller") {
      navigate("/seller-dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMessageBox({
      isOpen: true,
      title: "Logged Out",
      message: "You have been logged out successfully.",
    });
    navigate("/");
  };

  const handleChangeRegister = (e) => {
    setFormDataRegister({ ...formDataRegister, [e.target.name]: e.target.value });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (formDataRegister.password !== formDataRegister.confirmPassword) {
      setMessageBox({
        isOpen: true,
        title: "Registration Failed",
        message: "Passwords do not match!",
      });
      return;
    }
    try {
      // Simulate API call to a non-existent backend
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ ok: true, json: () => ({ message: "Registration successful!", user: { id: 1, name: formDataRegister.name, role: formDataRegister.role } }) }), 1000)
      );
      const data = await response.json();
      if (response.ok) {
        setMessageBox({
          isOpen: true,
          title: "Success",
          message: "Registration successful! You can now sign in.",
        });
        setRegisterOpen(false);
        setSignInOpen(true);
      } else {
        setMessageBox({
          isOpen: true,
          title: "Registration Failed",
          message: data.message || "Registration failed.",
        });
      }
    } catch (err) {
      console.error(err);
      setMessageBox({
        isOpen: true,
        title: "Error",
        message: "Something went wrong! Please try again later.",
      });
    }
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call to a non-existent backend
      const response = await new Promise((resolve, reject) => {
        if (loginData.email === "test@example.com" && loginData.password === "password") {
          resolve({ ok: true, json: () => ({ message: "Login successful!", user: { name: "Test User", role: loginData.role } }) });
        } else {
          reject({ ok: false, json: () => ({ message: "Invalid credentials." }) });
        }
      });
      const data = await response.json();
      if (response.ok) {
        handleLogin(data.user);
      } else {
        setMessageBox({
          isOpen: true,
          title: "Login Failed",
          message: data.message || "Login failed.",
        });
      }
    } catch (err) {
      console.error(err);
      setMessageBox({
        isOpen: true,
        title: "Error",
        message: "Something went wrong! Please try again later.",
      });
    }
  };
  // --- END OF NEW CODE ---

  return (
    <div className="w-full min-h-screen flex flex-col font-sans">
      {/* --- START OF NEW CODE --- */}
      <Header
        isLoggedIn={!!user}
        userRole={user?.role}
        setSignInOpen={setSignInOpen}
        setRegisterOpen={setRegisterOpen}
        handleLogout={handleLogout}
      />
      {/* --- END OF NEW CODE --- */}

      {/* Main Content */}
      <main className="flex-grow">
        <section className="relative py-16 px-6 sm:px-10 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Get in Touch with APNIGARI
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have a question about our platform, need support, or have feedback, feel free to reach out.
            </p>
          </div>
        </section>

        {/* Contact form section */}
        <section className="relative py-16 px-6 sm:px-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a message</h2>
              <form onSubmit={handleSubmitContact} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formDataContact.name}
                    onChange={handleChangeContact}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formDataContact.email}
                    onChange={handleChangeContact}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formDataContact.subject}
                    onChange={handleChangeContact}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formDataContact.message}
                    onChange={handleChangeContact}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Submit"}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-100 p-8 rounded-xl shadow-inner">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPinIcon className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                    <p className="mt-1 text-gray-600">
                      1234 Vehicle Lane, <br />
                      Automotive City, <br />
                      State 56789, Country
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <PhoneIcon className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                    <p className="mt-1 text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <EnvelopeIcon className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                    <p className="mt-1 text-gray-600">support@apnigari.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- START OF NEW CODE --- */}
      {/* SIGN IN MODAL */}
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
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
              <select
                name="role"
                value={loginData.role}
                onChange={handleLoginChange}
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

      {/* REGISTER MODAL */}
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
            <form className="space-y-4" onSubmit={handleSubmitRegister}>
              <input
                type="text"
                name="name"
                value={formDataRegister.name}
                onChange={handleChangeRegister}
                placeholder="Full Name"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
              <input
                type="email"
                name="email"
                value={formDataRegister.email}
                onChange={handleChangeRegister}
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
              <input
                type="tel"
                name="phoneNumber"
                value={formDataRegister.phoneNumber}
                onChange={handleChangeRegister}
                placeholder="Phone Number"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
              <input
                type="password"
                name="password"
                value={formDataRegister.password}
                onChange={handleChangeRegister}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={formDataRegister.confirmPassword}
                onChange={handleChangeRegister}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
              <select
                name="role"
                value={formDataRegister.role}
                onChange={handleChangeRegister}
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
      {/* --- END OF NEW CODE --- */}

      {/* Footer */}
      <footer className="bg-black text-white px-10 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-3 text-red-600">
              APNIGARI.com
            </h3>
            <p className="text-gray-400">
              Car Buy / Sell platform
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
  );
}