import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";

function UserDashboard({ tickets, role, setRole }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex-1 p-6 bg-grey-100">
        <div className="mb-8 flex flex-col lg:flex-row gap-4 justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Tickets</h1>
            <p className="text-gray-500">
              Manage and track your support requests.
            </p>
          </div>
          <div>
            <button
              className="bg-indigo-600 text-white p-3 rounded-xl mb-8 hover:bg-indigo-700 transition-colors duration-200"
              onClick={() => {
                navigate("/tickets/new");
              }}
            >
              Create New Ticket
            </button>
          </div>
        </div>
        <div>
          <div className="bg-white p-4 border border-gray-300">
            <input
              type="text"
              placeholder="Search tickets..."
              className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition-colors duration-200"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-300">
              <thead className="bg-gray-200">
                <th className="text-left p-4 text-gray-700 font-medium">ID</th>
                <th className="text-left p-4 text-gray-700 font-medium">
                  Title
                </th>
                <th className="hidden lg:table-cell text-left p-4 text-gray-700 font-medium">
                  Category
                </th>
                <th className="hidden lg:table-cell text-left p-4 text-gray-700 font-medium">
                  Status
                </th>
                <th className="hidden lg:table-cell text-left p-4 text-gray-700 font-medium">
                  Date
                </th>
                <th className="text-left p-4 text-gray-700 font-medium">
                  Action
                </th>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="p-4 text-gray-800">{ticket._id.slice(-6)}</td>

                    <td className="p-4">{ticket.title}</td>

                    <td className="hidden lg:table-cell p-4">
                      {ticket.category}
                    </td>

                    <td className="hidden lg:table-cell p-4">
                      <StatusBadge status={ticket.status} />
                    </td>

                    <td className="hidden lg:table-cell p-4">
                      {ticket.createdAt.split("T")[0]}
                    </td>

                    <td className="p-4 font-medium text-gray-800">
                      <Link to={`/tickets/${ticket._id}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
