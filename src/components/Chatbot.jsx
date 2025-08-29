import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Show user message
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      const reply = result.response.text();

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, something went wrong." },
      ]);
    }

    setInput("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        background: "#111",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0px 0px 15px rgba(0,0,0,0.3)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ background: "#e63946", padding: "10px", fontWeight: "bold" }}>
        Chatbot
      </div>

      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              background: msg.sender === "user" ? "#e63946" : "#333",
              padding: "8px 12px",
              borderRadius: "15px",
              maxWidth: "80%",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", borderTop: "1px solid #444" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          style={{
            flex: 1,
            border: "none",
            padding: "10px",
            outline: "none",
            background: "#222",
            color: "#fff",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            background: "#e63946",
            border: "none",
            padding: "10px 15px",
            cursor: "pointer",
            color: "white",
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
