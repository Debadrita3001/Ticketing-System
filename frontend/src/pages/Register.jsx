import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await register(name, email, password);
      console.log(user);
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 bg-white rounded-xl p-8 border border-gray-300">
      <form onSubmit={handleSubmit}>
        <h3 className="text-3xl font-bold mb-2">Register</h3>

        <label className="block mb-2 font-medium">Name</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 mb-2 transition-colors duration-200"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="block mb-2 font-medium">Email</label>

        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 mb-2 transition-colors duration-200"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block mb-2 font-medium">Password</label>

        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 mb-2 transition-colors duration-200"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg transition-colors duration-200 hover:bg-indigo-700"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <Link to='/login'>
        Already have an account? Login
      </Link>
    </div>
  );
}

export default Register;
