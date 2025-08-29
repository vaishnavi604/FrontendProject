import React from "react";
import { useLocation } from "react-router-dom";
import { FaClipboardCheck, FaSpinner, FaCheckCircle } from "react-icons/fa";

function ComplaintDetails() {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");
  const name = query.get("name");
  const category = query.get("category");

  const currentStage = "In Progress"; // Dummy stage for now

  const stages = [
    { name: "Submitted", icon: <FaClipboardCheck /> },
    { name: "In Progress", icon: <FaSpinner /> },
    { name: "Resolved", icon: <FaCheckCircle /> },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f6fa", // clean neutral background
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff, #fdf1f6)",
          padding: "40px",
          borderRadius: "25px",
          width: "100%",
          maxWidth: "650px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          textAlign: "center",
          border: "1px solid #eee",
        }}
      >
        <h2
          style={{
            color: "#d6366c",
            marginBottom: "25px",
            fontSize: "1.9rem",
            fontWeight: "600",
          }}
        >
          Complaint Details
        </h2>

        <div
          style={{
            background: "#fff",
            borderRadius: "15px",
            padding: "20px",
            textAlign: "left",
            marginBottom: "30px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            border: "1px solid #f0f0f0",
          }}
        >
          <p><strong>Complaint ID:</strong> {id}</p>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Category:</strong> {category}</p>
        </div>

        {/* Pipeline */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          {stages.map((stage, index) => {
            const isActive = stage.name === currentStage;
            const isCompleted = stages.findIndex(s => s.name === currentStage) >= index;

            return (
              <div
                key={stage.name}
                style={{
                  textAlign: "center",
                  flex: 1,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    background: isCompleted ? "#d6366c" : "#e0e0e0",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    fontSize: "1.3rem",
                    zIndex: 1,
                    boxShadow: isCompleted ? "0 6px 15px rgba(214,54,108,0.4)" : "none",
                    transition: "0.3s",
                  }}
                >
                  {stage.icon}
                </div>
                <p
                  style={{
                    marginTop: "10px",
                    color: isActive ? "#d6366c" : "#555",
                    fontWeight: isActive ? "bold" : "normal",
                  }}
                >
                  {stage.name}
                </p>
                {/* Connecting line */}
                {index < stages.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "27px",
                      left: "50%",
                      width: "100%",
                      height: "4px",
                      background: isCompleted ? "#d6366c" : "#ccc",
                      zIndex: 0,
                      transition: "0.3s",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;
