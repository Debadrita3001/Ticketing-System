import React from "react";
import TicketTable from "../components/TicketTable";
import { ResponsiveContainer } from "recharts";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import Header from "../components/Header";
import KpiCards from "../components/KpiCards";

export default function AdminDashboard({ tickets, role, setRole }) {
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open",
  ).length;
  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "Pending",
  ).length;
  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved",
  ).length;
  const COLORS = ["#4F46E5", "#06B6D4", "#8B5CF6"];
  const pieData = [
    {
      name: "Open",
      value: openTickets,
    },
    {
      name: "In Progress",
      value: inProgressTickets,
    },
    {
      name: "Resolved",
      value: resolvedTickets,
    },
  ];
  const grouped = {};

  tickets.forEach((ticket) => {
    const date = new Date(ticket.createdAt).toISOString().split("T")[0];

    grouped[date] = (grouped[date] || 0) + 1;
  });
  const lineData = Object.entries(grouped).map(([date, count]) => ({
    date,
    count,
  }));
  return (
    <>
      <div className="flex-1 p-2 lg:p-6 bg-grey-100">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-gray-500">Real-time support metrics</p>
        </div>
        <KpiCards tickets={tickets}></KpiCards>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="col-span-1 bg-white rounded-md border border-gray-300 p-6">
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <div className="flex flex-col items-center ">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white rounded-md border border-gray-300 p-6">
            <h3 className="text-xl font-semibold mb-4">Ticket Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />

                <Line type="monotone" dataKey="count" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="overflow-x-auto mb-8 bg-white rounded-md border border-gray-300 p-6">
          <h3 className="text-xl font-semibold mb-4">Global Ticket Queue</h3>
          <TicketTable tickets={tickets} />
        </div>
      </div>
    </>
  );
}
