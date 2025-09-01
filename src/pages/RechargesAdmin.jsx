import React, { useState, useEffect } from "react";
import axios from "axios";

const tableContainerStyle = {
  padding: "20px",
  maxWidth: "1200px",
  margin: "auto",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};

const thStyle = {
  backgroundColor: "#C0392B", // Red color
  color: "white",
  padding: "14px 20px",
  textAlign: "left",
  fontSize: "1.1rem",
  fontWeight: "bold",
  letterSpacing: "1px",
  textTransform: "uppercase",
  borderRight: "2px solid white", // White border for separation
};

const tdStyle = {
  padding: "14px 20px",
  borderBottom: "1px solid #ddd", // Light grey border for row separation
  borderRight: "2px solid white", // White border for separation between columns
  fontSize: "1rem",
  color: "#333",
};

const trHoverStyle = {
  backgroundColor: "#f5f5f5", // Light white background on hover
  cursor: "pointer",
};

const RechargesAdmin = () => {
  const [recharges, setRecharges] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    fetchRecharges();
  }, []);

  const fetchRecharges = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/api/recharges");
      setRecharges(response.data);
    } catch (error) {
      console.error("Error fetching recharges:", error);
      alert("Failed to fetch recharges");
    }
  };

  return (
    <div style={tableContainerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2rem", color: "#C0392B" }}>
        All Recharges
      </h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>User Email</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Recharge Date</th>
            <th style={thStyle}>Payment Status</th>
            <th style={thStyle}>Payment Mode</th>
            <th style={thStyle}>Recharge Type</th>
          </tr>
        </thead>
        <tbody>
          {recharges.map((r, index) => (
            <tr
              key={r.id}
              style={hoveredRow === index ? trHoverStyle : {}}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td style={tdStyle}>{r.id}</td>
              <td style={tdStyle}>{r.user?.mail || "N/A"}</td>
              <td style={tdStyle}>${r.amount}</td>
              <td style={tdStyle}>{new Date(r.rechargeDate).toLocaleString()}</td>
              <td style={tdStyle}>{r.paymentStatus}</td>
              <td style={tdStyle}>{r.paymentMode}</td>
              <td style={tdStyle}>{r.rechargeType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RechargesAdmin;
