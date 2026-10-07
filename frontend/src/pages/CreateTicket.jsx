import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";
function CreateTicket({ fetchTickets }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !category || !priority || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/tickets", {
        title,
        category,
        priority,
        description,
      });
      await fetchTickets();
      navigate("/");
    } catch (err) {
      console.error(err);
      console.log(err.response?.data);
      console.log(err.response?.status);
    }
  }

  return (
    <div className="max-w-2xl mx-auto my-8 bg-white rounded-xl p-8 border border-gray-300">
      <form action="" onSubmit={handleSubmit}>
        <h3 className="text-3xl font-bold mb-2">Create New Ticket</h3>
        <p className="text-grey-500 mb-8">
          Please provide the details of your issue below, and our support team
          will assist you shortly.
        </p>
        <label className="block mb-2 font-medium">Title</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 mb-2 transition-colors duration-200"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="block mb-2 font-medium">Category</label>
        <select
          className="w-full
            border
            border-gray-300
            rounded-lg
            px-4
            py-2 mb-2 focus:outline-none focus:border-indigo-500 transition-colors duration-200"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Choose Category</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Billing">Billing</option>
          <option value="Network">Network</option>
          <option value="Other">Other</option>
        </select>
        <label className="block mb-2 font-medium">Priority</label>
        <select
          className="w-full
            border
            border-gray-300
            rounded-lg
            px-4
            py-2 mb-2 focus:outline-none focus:border-indigo-500 transition-colors duration-200"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Choose Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-4 py-2 transition-colors duration-200 focus:outline-none focus:border-indigo-500 mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg transition-colors duration-200 hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTicket;
