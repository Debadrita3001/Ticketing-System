import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import api from "../lib/api";

function TicketDetails({ role, fetchTickets }) {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const navigate = useNavigate();

  const fetchTicket = async () => {
    try {
      console.log("Fetching ticket:", id);

      const res = await api.get(`/tickets/${id}`);

      setTicket(res.data);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  if (!ticket) {
    return <h1>Loading...</h1>;
  }

  const handleResolve = async () => {
    try {
      const res = await api.patch(`/tickets/${id}`, {
        status: "Resolved",
      });

      setTicket(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async () => {
    try {
      await api.delete(`/tickets/${id}`);
      await fetchTickets();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  const handleStatusChange = async (e) => {
    try {
      const res = await api.patch(`/tickets/${id}`, {
        status: e.target.value,
      });

      setTicket(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCategoryChange = async (e) => {
    try {
      const res = await api.patch(`/tickets/${id}`, {
        category: e.target.value,
      });

      setTicket(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-grey-100 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="bg-white rounded-xl border border-gray-300 p-6 col-span-1">
            <h1 className="text-2xl font-bold mb-4">{ticket.title}</h1>
            <div className="flex justify-between mb-3">
              <span className="text-indigo-700">
                {role === "user" && ticket.status}
                {role === "admin" && (
                  <select
                    value={ticket.status}
                    onChange={handleStatusChange}
                    className="w-full
                        border
                        border-gray-300
                        rounded-lg
                        px-4
                        py-2 mb-2 focus:outline-none transition-colors duration-200 focus:border-indigo-500"
                  >
                    <option value="Open">Open</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                )}
              </span>
              {role === "user" && (
                <button
                  className=""
                  onClick={handleDelete}
                  className="px-3 py-1 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors duration-200"
                >
                  Delete
                </button>
              )}
            </div>
            <p className="mb-2">
              <strong className="font-semibold">ID: </strong>
              {ticket._id}
            </p>
            <p className="mb-2">
              <strong className="font-semibold">Category: </strong>
              {role === "admin" && (
                <select
                  value={ticket.category}
                  onChange={handleCategoryChange}
                  className="
                    border
                    border-gray-300
                    rounded-lg
                    px-4
                    py-2 mb-2 focus:outline-none focus:border-indigo-500 transition-colors duration-200"
                >
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Billing">Billing</option>
                  <option value="Network">Network</option>
                  <option value="Other">Other</option>
                </select>
              )}
              {role === "user" && ticket.category}
            </p>
            <p className="mb-2">
              <strong className="font-semibold">Priority: </strong>
              {ticket.priority}
            </p>
            <p className="mb-2">
              <strong className="font-semibold">Created at: </strong>
              {new Date(ticket.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-6">
              <h3 className="font-semibold mb-1">Description</h3>
              <p className="text-gray-600 mb-4">{ticket.description}</p>
            </div>
            {role === "user" && (
              <div className="flex justify-center">
                <button
                  onClick={handleResolve}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
                >
                  Mark as resolved
                </button>
              </div>
            )}
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-300 p-6 flex flex-col">
            <ChatBox role={role} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketDetails;
