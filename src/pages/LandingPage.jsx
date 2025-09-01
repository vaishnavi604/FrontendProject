import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function LandingPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // ✅ Chatbot states
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  // ✅ Gemini API setup (use .env key)
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      // Call Gemini
      const result = await model.generateContent(input);
      const reply = result.response.text();

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, I couldn’t process that. Try again." },
      ]);
    }

    setInput(""); // clear input
  };

  const images = [
    "https://i.pinimg.com/1200x/26/57/6e/26576e68a11261e3945df1ec23cf1f78.jpg",
    "https://i.pinimg.com/1200x/68/82/6a/68826ab01b6ee5ba9a6f1ee9cc1f6598.jpg",
    "https://i.pinimg.com/1200x/87/6c/1b/876c1b73d4b7d92413e9cdee227a3411.jpg",
    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#FFFFFF", color: "#333" }}>
      <Header />

      {/* Hero Section */}
      <section
        style={{
          height: "100vh",
          backgroundImage: `url(${images[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0 5vw",
          transition: "background-image 1s ease-in-out",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />

        {/* Hero Text */}
        <div style={{ zIndex: 2, maxWidth: "600px" }}>
          <h1 style={{ fontSize: "3.5rem", fontWeight: "bold", marginBottom: "20px" }}>
            TV on Every Screen. <br />
            <span style={{ color: "#FF4C4C" }}>Fast Internet.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
            $75 <span style={{ fontWeight: 300 }}>/ per month</span>
          </p>
          <p style={{ fontSize: "1rem", marginBottom: "30px" }}>
            Streaming TV without a TV box. Includes 150+ channels with local news, live sports, and more.
          </p>
          <button
            style={{
              backgroundColor: "#FF4C4C",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "25px",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section
        style={{
          padding: "60px 20px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "2.5rem", color: "#C0392B", marginBottom: "30px" }}>
          Explore Our Services
        </h2>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <Card title="Fast Internet" description="Experience lightning-fast speeds." />
          <Card title="Reliable Support" description="24/7 customer support available." />
          <Card title="Affordable Plans" description="Choose a plan that fits your needs." />
        </div>
      </section>

      {/* Chatbot */}
      <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 10 }}>
        {chatOpen && (
          <div
            style={{
              width: "300px",
              height: "400px",
              background: "#1A1F2A",
              border: "1px solid #444",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              color: "#fff",
            }}
          >
            <div
              style={{
                background: "#C0392B",
                color: "#FFFFFF",
                padding: "10px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                fontWeight: "bold",
              }}
            >
              Chatbot
            </div>
            <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
              {messages.map((msg, idx) => (
                <p
                  key={idx}
                  style={{
                    textAlign: msg.sender === "user" ? "right" : "left",
                    background: msg.sender === "user" ? "#C0392B" : "#2C3E50",
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    margin: "5px 0",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </p>
              ))}
            </div>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                style={{
                  flex: 1,
                  border: "none",
                  borderTop: "1px solid #444",
                  padding: "10px",
                  background: "#0B0F1A",
                  color: "#fff",
                  outline: "none",
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  background: "#C0392B",
                  border: "none",
                  color: "#fff",
                  padding: "0 15px",
                  cursor: "pointer",
                }}
              >
                ➤
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            background: "#C0392B",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "1.5rem",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
          }}
        >
          💬
        </button>
      </div>

      <Footer />
    </div>
  );
}


