import React from "react";

export default function KpiCards({ tickets }) {
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open",
  ).length;
  const pendingTickets = tickets.filter(
    (ticket) => ticket.status === "Pending",
  ).length;
  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved",
  ).length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-md border border-gray-300 p-6 text-center md:text-left lg:max-w-xs">
        <p className="text-gray-600 font-medium mb-8">TOTAL TICKETS</p>
        <h2 className="text-5xl font-bold">{totalTickets}</h2>
      </div>
      <div className="bg-white rounded-md border border-gray-300 p-6 text-center md:text-left lg:max-w-xs">
        <p className="text-gray-600 font-medium mb-8">OPEN</p>
        <h2 className="text-5xl font-bold">{openTickets}</h2>
      </div>
      <div className="bg-white rounded-md border border-gray-300 p-6 text-center md:text-left lg:max-w-xs">
        <p className="text-gray-600 font-medium mb-8">PENDING</p>
        <h2 className="text-5xl font-bold">{pendingTickets}</h2>
      </div>
      <div className="bg-white rounded-md border border-gray-300 p-6 text-center md:text-left lg:max-w-xs">
        <p className="text-gray-600 font-medium mb-8">RESOLVED</p>
        <h2 className="text-5xl font-bold">{resolvedTickets}</h2>
      </div>
    </div>
  );
}
