import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function LandingPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋! How can I help you today?" },
  ]);

  // Image carousel for hero section
  const images = [
    "https://i.pinimg.com/1200x/26/57/6e/26576e68a11261e3945df1ec23cf1f78.jpg",
    "https://i.pinimg.com/1200x/87/6c/1b/876c1b73d4b7d92413e9cdee227a3411.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      // Example bot response, replace this with actual API call
      const reply = `You said: ${input}`;

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, I couldn’t process that. Try again." },
      ]);
    }

    setInput(""); // clear input
  };

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
            <span style={{ color: "#C0392B" }}>Fast Internet.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
            $75 <span style={{ fontWeight: 300 }}>/ per month</span>
          </p>
          <p style={{ fontSize: "1rem", marginBottom: "30px" }}>
            Streaming TV without a TV box. Includes 150+ channels with local news, live sports, and more.
          </p>
          <button
            style={{
              backgroundColor: "#C0392B",  // Red button
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
          animation: "fadeIn 1.5s ease-out",
        }}
      >
        <h2 style={{ fontSize: "2.5rem", color: "#C0392B", marginBottom: "30px" }}>Explore Our Services</h2>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Card
            title="Fast Internet"
            description="Experience lightning-fast speeds."
            style={{
              transition: "transform 0.3s ease",
            }}
          />
          <Card
            title="Reliable Support"
            description="24/7 customer support available."
            style={{
              transition: "transform 0.3s ease",
            }}
          />
          <Card
            title="Affordable Plans"
            description="Choose a plan that fits your needs."
            style={{
              transition: "transform 0.3s ease",
            }}
          />
        </div>
      </section>

      {/* Scrollable Page */}
      <section
        style={{
          height: "100vh",
          overflowY: "scroll",
          backgroundColor: "#FFFFFF",
          color: "#333",
          padding: "40px",
        }}
      >
        <h2
          style={{
            color: "#C0392B",  // Red title
            marginBottom: "20px",
            fontSize: "2.5rem",
            textAlign: "center",
          }}
        >
          Our Exciting New Features
        </h2>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "fadeIn 2s ease-out",
          }}
        >
          <div
            style={{
              maxWidth: "400px",
              textAlign: "center",
              padding: "10px",
              transform: "scale(1)",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <img
              src="https://via.placeholder.com/300"
              alt="Feature 1"
              style={{
                width: "100%",
                borderRadius: "12px",
                marginBottom: "20px",
                animation: "fadeIn 2s ease-out",
              }}
            />
            <h3>Super Fast Streaming</h3>
            <p>Stream in HD and 4K without interruptions, anywhere you go!</p>
          </div>
          <div
            style={{
              maxWidth: "400px",
              textAlign: "center",
              padding: "10px",
              transform: "scale(1)",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <img
              src="https://via.placeholder.com/300"
              alt="Feature 2"
              style={{
                width: "100%",
                borderRadius: "12px",
                marginBottom: "20px",
                animation: "fadeIn 2s ease-out",
              }}
            />
            <h3>Always On Support</h3>
            <p>Our team is always ready to assist you 24/7 for any issues.</p>
          </div>
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
                  background: "#C0392B",  // Red button
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
            background: "#C0392B",  // Red button
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
