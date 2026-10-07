import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../lib/api";
import { AuthContext } from "../context/AuthContext";

export default function ChatBox({ role }) {
  const { id } = useParams();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const {user} = useContext(AuthContext)
  
  const fetchMessages = async () => {
    try {
      const res = await api.get(`/api/tickets/${id}/messages`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000)
    return () => clearInterval(interval)
  }, [id]);

  const handleSend = async () => {
    if (!messageText.trim()) return;

    try {
      await api.post(`/api/tickets/${id}/messages`, {
        text: messageText,
      });

      setMessageText("");

      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Messages</h2>
      <div className="flex-1">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((message, index) => {
            return (
              <div
                className={`flex ${
                  message.senderRole === user?.role ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${message.senderRole === user?.role ? "bg-indigo-100" : "bg-gray-100"} rounded-lg p-3 mb-2 inline-block max-w-[70%]`}
                  key={index}
                >
                  <p className="font-semibold">{message.senderRole}</p>
                  <p>{message.text}</p>
                  <small className="text-gray-500">
                    {new Date(message.timestamp).toLocaleString()}
                  </small>
                </div>
              </div>
            );
          })
        )}
        <div className="flex justify-between gap-2 mt-4">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full"
          />
          <button
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            type="submit"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
