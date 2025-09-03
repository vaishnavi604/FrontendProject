import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ExplorePage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state from localStorage
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setIsLoggedIn(!!userInfo); // true if userInfo exists
  }, []);

  const plans = [
    {
      title: "Prepaid Plans",
      description: "Affordable monthly prepaid packs",
      color: "#FADBD8)",  // Light Peach background for prepaid
      icon: "📱",  // smartphone icon
      path: "/prepaid",
    },
    {
      title: "Postpaid Plans",
      description: "Premium postpaid offers",
      color: "rgba(251, 251, 251, 1)",  // Light Pink background for postpaid
      icon: "📶",  // signal icon
      path: "/postpaid",
    },
    ...(isLoggedIn
      ? [
          {
            title: "Complaints",
            description: "Create and check your complaints",
            color: "#FADBD8)",  // Pale Rose background for complaints
            icon: "🛠️",  // wrench icon
            path: "/complaints",
          },
        ]
      : []),
  ];

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: "#f9f9f9", padding: "40px" }}>
      <h2
        style={{
          fontSize: "3rem",
          marginBottom: "50px",
          color: "#C0392B",  // Red title
          textAlign: "center",
        }}
      >
        Explore Our Plans
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.title}
            style={{
              background: plan.color,  // Updated card background color
              borderRadius: "20px",
              width: "300px",
              padding: "40px 30px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              textAlign: "center",
              margin: "20px",
              overflow: "hidden",
              position: "relative",
            }}
            onClick={() => navigate(plan.path)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px hsla(355, 52%, 48%, 0.30)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.1)";
            }}
          >
            {/* Icon */}
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "15px",
                background: "#C0392B",  // Red background for icon
                padding: "15px",
                borderRadius: "50%",
                color: "#fff",
                width: "70px",
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              {plan.icon}
            </div>

            {/* Plan Title */}
            <h3
              style={{
                fontSize: "1.8rem",
                marginBottom: "10px",
                color: "#C0392B",  // Red title color
                fontWeight: "bold",
              }}
            >
              {plan.title}
            </h3>

            {/* Plan Description */}
            <p
              style={{
                fontSize: "1.2rem",
                marginBottom: "20px",
                color: "#333",
                lineHeight: "1.5",
                fontWeight: "300",
              }}
            >
              {plan.description}
            </p>

            {/* View Plans Button */}
            <button
              style={{
                background: "#6e1a1aff",  // Navy Blue button
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s",
                fontSize: "1.1rem",
              }}
            >
              VIEW
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExplorePage;
