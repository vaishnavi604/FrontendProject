import React from "react";
import { useLocation } from "react-router-dom";

function PostpaidPlanDetailsPage() {
  const location = useLocation();
  const plan = location.state?.plan;

  if (!plan) {
    return <h2 style={{ textAlign: "center", marginTop: "100px" }}>No Plan Selected</h2>;
  }

  return (
    <div style={{ paddingTop: "120px", padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "2.5rem", marginBottom: "30px", color: "#d6366c", textAlign: "center" }}>
        {plan.name} - {plan.price}
      </h2>
      <div style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "30px",
        maxWidth: "600px",
        margin: "auto",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      }}>
        <h3 style={{ marginBottom: "15px", color: "#9b287b" }}>Benefits:</h3>
        <ul style={{ marginBottom: "25px" }}>
          {plan.benefits.map((b, i) => <li key={i}>{b}</li>)}
        </ul>

        <h3 style={{ marginBottom: "10px", color: "#9b287b" }}>Payment Options:</h3>
        <select style={{ width: "100%", padding: "10px", borderRadius: "10px", marginBottom: "20px" }}>
          <option>UPI</option>
          <option>Credit/Debit Card</option>
          <option>Net Banking</option>
          <option>Wallet</option>
        </select>

        <button style={{
          background: "#d6366c",
          color: "#fff",
          border: "none",
          padding: "15px",
          borderRadius: "20px",
          width: "100%",
          fontSize: "1.2rem",
          cursor: "pointer"
        }}>
          Recharge Now
        </button>
      </div>
    </div>
  );
}

export default PostpaidPlanDetailsPage;
