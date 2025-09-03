import React, { useState } from "react";
import { FaCog, FaCreditCard, FaExclamationCircle } from "react-icons/fa"; // FontAwesome Icons
import PlansAdmin from "./PlansAdmin";
import RechargesAdmin from "./RechargesAdmin";
import ComplaintsAdmin from "./ComplaintsAdmin";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("plans");

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Poppins, sans-serif" }}>
      {/* Sidebar */}
      <nav
        style={{
          width: "250px",
          backgroundColor: "#C0392B",
          color: "white",
          display: "flex",
          flexDirection: "column",
          padding: "30px 20px",
          boxSizing: "border-box",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <h2 style={{ marginBottom: "40px", textAlign: "center", fontWeight: "bold", fontSize: "2rem" }}>
          Admin Panel
        </h2>

        {[
          { tab: "plans", icon: "🛠️", color: "#dedddbff" }, // Orange wrench
          { tab: "recharges", icon: "💳", color: "#dedddbff" }, // Blue credit card
          { tab: "complaints", icon: "⚠️", color: "#dedddbff" }, // Red warning sign
        ].map(({ tab, icon, color }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? "#A93226" : "transparent", // Darker shade for active tab
              color: "white",
              border: "none",
              padding: "15px 25px",
              borderRadius: "8px",
              marginBottom: "20px",
              cursor: "pointer",
              fontWeight: activeTab === tab ? "bold" : "normal",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              fontSize: "1.1rem",
              transition: "background-color 0.3s ease, transform 0.2s ease",
              border: activeTab === tab ? `2px solid ${color}` : "none", // Border for active tab
            }}
          >
            <span style={{ fontSize: "1.5rem", color: color }}>{icon}</span> {/* Emoji color */}
            {tab}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main
        style={{
          flexGrow: 1,
          background: "#f9f9f9",
          padding: "30px",
          overflowY: "auto",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {activeTab === "plans" && <PlansAdmin />}
        {activeTab === "recharges" && <RechargesAdmin />}
        {activeTab === "complaints" && <ComplaintsAdmin />}
      </main>
    </div>
  );
};

export default AdminDashboard;
