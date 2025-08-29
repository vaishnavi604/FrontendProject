import React from "react";
import { useLocation } from "react-router-dom";

function PlanDetailsPage() {
  const { state } = useLocation();
  const plan = state?.plan;

  if (!plan) return <h2 style={{ padding: "50px" }}>No plan selected!</h2>;

  return (
    <div style={{ paddingTop: "120px", padding: "40px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h2 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#9b287b" }}>{plan.name}</h2>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{plan.price}</p>
      <p>Validity: {plan.validity}</p>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {plan.benefits.map((b, i) => <li key={i}>✅ {b}</li>)}
      </ul>

      <div style={{ marginTop: "30px" }}>
        <h3>Payment Mode</h3>
        <select style={{ padding: "10px", borderRadius: "10px", margin: "10px" }}>
          <option>UPI</option>
          <option>Credit/Debit Card</option>
          <option>Net Banking</option>
          <option>Wallet</option>
        </select>
      </div>

      <button
        style={{
          background: "#d6366c",
          color: "#fff",
          border: "none",
          padding: "12px 25px",
          borderRadius: "25px",
          fontSize: "1.2rem",
          cursor: "pointer",
          marginTop: "20px"
        }}
        onClick={() => alert(`Recharge Successful for ${plan.name}`)}
      >
        Recharge Now
      </button>
    </div>
  );
}

export default PlanDetailsPage;
