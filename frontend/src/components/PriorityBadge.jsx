import React from "react";

export default function PriorityBadge({ priority }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        priority === "High"
          ? "bg-red-100 text-red-500"
          : priority === "Medium"
            ? "bg-amber-100 text-amber-500"
            : "bg-green-100 text-green-500"
      }`}
    >
      {priority}
    </span>
  );
}
