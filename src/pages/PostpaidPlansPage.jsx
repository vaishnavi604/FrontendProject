import React from "react";
import { useNavigate } from "react-router-dom";

const postpaidPlans = [
  { id: 1, name: "Postpaid 499", price: "₹499", benefits: ["Unlimited Calls & SMS", "500GB Data", "Priority Support"] },
  { id: 2, name: "Postpaid 799", price: "₹799", benefits: ["Unlimited Calls & SMS", "1TB Data", "Premium Support + OTT"] },
  { id: 3, name: "Postpaid 999", price: "₹999", benefits: ["Unlimited Calls & SMS", "2TB Data", "All Benefits Included"] },
];

function PostpaidPlansPage() {
  const navigate = useNavigate();

  const handleChoose = (plan) => {
    navigate(`/postpaid-plan/${plan.id}`, { state: { plan } });
  };

  return (
    <div style={{ paddingTop: "120px", padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "3rem", marginBottom: "40px", color: "#d6366c", textAlign: "center" }}>Postpaid Plans</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
        {postpaidPlans.map((plan) => (
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
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <h3 style={{ fontSize: "1.8rem", marginBottom: "10px", color: "#9b287b" }}>{plan.name}</h3>
            <p style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "10px" }}>{plan.price}</p>
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
              onClick={() => handleChoose(plan)}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostpaidPlansPage;
