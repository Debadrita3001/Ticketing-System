import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="bg-gray-100 flex justify-between px-2 md:px-6 py-3 border-b border-gray-300 overflow-x-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
        SupportFlow
      </h1>
      {!user ? (
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Hello, {user.name}</span>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
