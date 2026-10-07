import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <aside className="hidden md:flex w-64 min-w-64 min-h-screen bg-white border-r border-gray-300 flex flex-col p-6">
      {user?.role !== "admin" && (
        <button
          className="w-full bg-indigo-600 text-white py-3 rounded-xl mb-8"
          onClick={() => navigate("/tickets/new")}
        >
          Create Ticket
        </button>
      )}
      <nav className="space-y-2">
        <button
          className="w-full text-center px-4 py-2 rounded-lg transition-colors duration-200  hover:cursor-pointer hover:bg-gray-200"
          onClick={() => {
            if (user?.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/");
            }
          }}
        >
          Dashboard
        </button>
        <button className="w-full text-center px-4 py-2 rounded-lg transition-colors duration-200  hover:cursor-pointer hover:bg-gray-200">
          Tickets
        </button>
        <button className="w-full text-center px-4 py-2 rounded-lg transition-colors duration-200  hover:cursor-pointer hover:bg-gray-200">
          Analytics
        </button>
        <button className="w-full text-center px-4 py-2 rounded-lg transition-colors duration-200  hover:cursor-pointer hover:bg-gray-200">
          Settings
        </button>
      </nav>
      <div className="mt-auto space-y-2">
        <button className="block text-gray-700 text-sm hover:cursor-pointer ">
          Help
        </button>
        <button
          className="block text-gray-700 text-sm hover:cursor-pointer"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
