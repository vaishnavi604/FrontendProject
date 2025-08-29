import React from "react";
import { useNavigate } from "react-router-dom";

const prepaidPlans = [
  { id: 1, name: "Unlimited 199", price: "₹199", validity: "28 days", benefits: ["Unlimited Calls", "100GB Data", "Free OTT"] },
  { id: 2, name: "Unlimited 299", price: "₹299", validity: "28 days", benefits: ["Unlimited Calls", "200GB Data", "Free OTT + Music"] },
  { id: 3, name: "Unlimited 399", price: "₹399", validity: "56 days", benefits: ["Unlimited Calls", "300GB Data", "Free OTT + Music + Gaming"] },
];

function PrepaidPlansPage() {
  const navigate = useNavigate();

  const handleChoosePlan = (plan) => {
    navigate(`/plan/${plan.id}`, { state: { plan } });
  };

  return (
    <div style={{ paddingTop: "120px", padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "3rem", marginBottom: "40px", color: "#d6366c", textAlign: "center" }}>Prepaid Plans</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
        {prepaidPlans.map((plan) => (
          <div
            key={plan.id}
            style={{
              background: "#fff",
              borderRadius: "20px",
              width: "300px",
              padding: "30px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ fontSize: "1.8rem", marginBottom: "10px", color: "#9b287b" }}>{plan.name}</h3>
            <p style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "10px" }}>{plan.price}</p>
            <p style={{ marginBottom: "10px" }}>Validity: {plan.validity}</p>
            <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
              {plan.benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <button
              style={{
                background: "#d6366c",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
              onClick={() => handleChoosePlan(plan)}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrepaidPlansPage;
