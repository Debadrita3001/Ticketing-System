import React from "react";

export default function StatusBadge({ status }) {
  return (
    <span
      className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
        status === "Open"
          ? "bg-red-100 text-red-500"
          : status === "Pending"
            ? "bg-amber-100 text-amber-500"
            : "bg-green-100 text-green-500"
      }`}
    >
      {status}
    </span>
  );
}
