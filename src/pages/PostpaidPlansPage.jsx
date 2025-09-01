<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PostpaidPlansPage() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8084/api/api/plans/type/postpaid")
      .then((res) => setPlans(res.data))
      .catch((err) => console.error("Error fetching postpaid plans:", err));
  }, []);

  const handleChoosePlan = (plan) => {
    navigate(`/plan/:id`, { state: { plan } });
  };

  return (
    <div style={{ paddingTop: "120px", padding: "40px", fontFamily: "Poppins, sans-serif" }}>
      <h2 style={{ fontSize: "3rem", marginBottom: "40px", color: "#d6366c", textAlign: "center" }}>
        Postpaid Plans
      </h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
        {plans.length === 0 ? (
          <p>No postpaid plans available</p>
        ) : (
          plans.map((plan) => (
            <div
              key={plan.plan_id}
              style={{
                background: "#fff",
                borderRadius: "20px",
                width: "300px",
                padding: "30px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "10px", color: "#9b287b" }}>
                {plan.planType} {plan.validityDays}d
              </h3>
              <p style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "10px" }}>
                ₹{Object.keys(plan.dataPacks || {})[0]}
              </p>
              <p style={{ marginBottom: "10px" }}>Validity: {plan.validityDays} days</p>
              <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
                {Object.entries(plan.dataPacks || {}).map(([price, mb], i) => (
                  <li key={i}>
                    {mb}MB @ ₹{price}
                  </li>
                ))}
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
          ))
        )}
=======
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
>>>>>>> origin/master
      </div>
    </div>
  );
}

export default PostpaidPlansPage;
