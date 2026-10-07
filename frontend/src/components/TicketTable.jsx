import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

export default function TicketTable({ tickets }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();
  const filteredTickets =
    statusFilter === "All"
      ? tickets
      : tickets.filter((ticket) => {
          return ticket.status === statusFilter;
        });
  return (
    <>
      <div className="border border-gray-300 inline-block p-2 rounded-md mb-2">
        <label for="status">Status: </label>
        <select
          id="status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="focus:outline-none"
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>
      <table className="w-full rounded-md bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left p-4 text-gray-700 font-medium">ID</th>
            <th className="text-left p-4 text-gray-700 font-medium">Title</th>
            <th className="hidden md:table-cell text-left p-4 text-gray-700 font-medium">Priority</th>
            <th className="text-left p-4 text-gray-700 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr
              className="border-b border-gray-300 transition-colors duration-200 hover:bg-gray-100"
              key={ticket._id}
              onClick={() => navigate(`/tickets/${ticket._id}`)}
            >
              <td className="p-3 hover:cursor-pointer">{ticket._id.slice(-6)}</td>
              <td className="p-3">{ticket.title}</td>
              <td className="hidden md:table-cell p-3">
                <PriorityBadge priority={ticket.priority} />
              </td>
              <td className="p-3">
                <StatusBadge status={ticket.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
