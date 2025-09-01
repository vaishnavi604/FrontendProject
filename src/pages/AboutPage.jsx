import React from "react";
import { FaEye, FaBullseye, FaHandsHelping } from "react-icons/fa";

function AboutPage() {
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "linear-gradient(to bottom, #C0392B 45%, #ffffff 55%)",
        minHeight: "100vh",
        padding: "60px 40px",
      }}
    >
      {/* Top Section */}
      <section style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1
          style={{
            fontSize: "3rem",
            color: "#1a1a1a",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          About Us
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#444",
            maxWidth: "750px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          At <b style={{ color: "#6A1DAZ" }}>Wezen Telecom</b>, we connect people
          with technology through seamless communication services. Our mission
          is simple: <b>innovation, reliability, and a customer-first approach.</b>
        </p>
      </section>

      {/* Images Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          flexWrap: "wrap",
          marginBottom: "70px",
        }}
      >
        {[
          {
            src: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
            alt: "Team Work",
          },
          {
            src: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
            alt: "Work Discussion",
          },
          {
            src: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
            alt: "Brainstorming",
          },
          {
            src: "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg",
            alt: "Online Meeting",
          },
        ].map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            style={{
              width: "240px",
              height: "160px",
              borderRadius: "16px",
              objectFit: "cover",
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.07)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
            }}
          />
        ))}
      </div>

      {/* Values Section */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "35px",
          padding: "20px",
        }}
      >
        {[
          {
            icon: <FaEye size={28} color="#fff" />,
            title: "Our Vision",
            desc: "To be the leading telecom provider delivering innovative and reliable solutions worldwide.",
          },
          {
            icon: <FaBullseye size={28} color="#fff" />,
            title: "Our Mission",
            desc: "Empowering communities and businesses through affordable and dependable networks.",
          },
          {
            icon: <FaHandsHelping size={28} color="#fff" />,
            title: "Our Values",
            desc: "Innovation, Reliability, and a Customer-first approach in everything we do.",
          },
        ].map((card, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "35px 25px",
              borderRadius: "18px",
              boxShadow: "0 8px 22px rgba(0,0,0,0.1)",
              textAlign: "center",
              width: "300px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 22px rgba(0,0,0,0.1)";
            }}
          >
            <div
              style={{
                background: "#721515ff",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
                boxShadow: "0 4px 12px rgba(214,54,108,0.4)",
              }}
            >
              {card.icon}
            </div>
            <h3
              style={{
                fontSize: "1.6rem",
                color: "#222",
                margin: "15px 0",
                fontWeight: "600",
              }}
            >
              {card.title}
            </h3>
            <p style={{ color: "#555", fontSize: "1rem", lineHeight: "1.6" }}>
              {card.desc}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AboutPage;
