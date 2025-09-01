import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PrepaidPlansPage() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8084/api/api/plans/type/prepaid")
      .then((res) => setPlans(res.data))
      .catch((err) => console.error("Error fetching prepaid plans:", err));
  }, []);

  const handleChoosePlan = async (plan) => {
    
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

// Extract the id
const userId = userInfo?.userId; // or however you store it

    // 1. Call PATCH API to update user plan
    const response = await axios.patch(`http://localhost:8084/api/api/users/${userId}`, {
      plan_id: plan.plan_id
    });

    // 2. Navigate with updated user (or plan) details
    navigate(`/plan-details`, { state: { plan, user: response.data } });
  } catch (error) {
    console.error("Error updating user plan:", error);
    alert("Could not update plan. Please try again.");
  }
};
  return (
    <div style={{ paddingTop: "120px", padding: "40px", fontFamily: "Poppins, sans-serif" }}>
      <h2 style={{ fontSize: "3rem", marginBottom: "40px", color: "#d6366c", textAlign: "center" }}>
        Prepaid Plans
      </h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
        {plans.length === 0 ? (
          <p>No prepaid plans available</p>
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
      </div>
    </div>
  );
}

export default PrepaidPlansPage;
