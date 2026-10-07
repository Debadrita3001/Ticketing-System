import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import UserDashboard from "./pages/UserDashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";
import AdminDashboard from "./pages/AdminDashboard";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import api from "./lib/api";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useLocation } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  const { user, login } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await api.get("/api/tickets");
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        {!isAuthPage && <Sidebar />}
        <div className="flex-1 flex flex-col">
          {!isAuthPage && <Header />}
          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <UserDashboard tickets={tickets} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard tickets={tickets} setTickets={setTickets} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tickets/new"
                element={
                  <ProtectedRoute>
                    <CreateTicket fetchTickets={fetchTickets} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tickets/:id"
                element={
                  <ProtectedRoute>
                    <TicketDetails
                      role={user?.role}
                      fetchTickets={fetchTickets}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
