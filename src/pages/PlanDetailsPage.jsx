import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { rechargePlan } from "../services/rechargeService";

function PlanDetailsPage() {
  const { state } = useLocation();
  const plan = state?.plan;

  const [paymentMode, setPaymentMode] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!plan) return <h2 style={{ padding: "50px", textAlign: "center" }}>No plan selected!</h2>;

  const handleRecharge = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo || !userInfo.userId) {
        console.error("User info not found in localStorage");
        setLoading(false);
        return;
      }

      const rechargeData = {
        userId: userInfo.userId,
        planId: plan.plan_id,
        amount: Object.keys(plan.dataPacks)[0],
        rechargeDate: new Date().toISOString(),
        paymentStatus: "SUCCESS",
        paymentMode: paymentMode.toUpperCase().replace(/\s/g, "_"),
        rechargeType: "VOICE",
      };

      console.log("Recharge Data Payload:", rechargeData);
      console.log("Plan object:", plan);

      await rechargePlan(rechargeData);
      setSuccess(true);
      alert("Recharge successful!");
    } catch (error) {
      console.error("Recharge failed", error);
      alert("Recharge failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Styling objects
  const containerStyle = {
    maxWidth: "700px",
    margin: "80px auto 40px",
    padding: "30px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    borderRadius: "12px",
    backgroundColor: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#007bff",
  };

  const priceStyle = {
    fontSize: "2rem",
    fontWeight: "600",
    marginBottom: "8px",
  };

  const validityStyle = {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "25px",
  };

  const detailsBox = {
    textAlign: "left",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
    boxShadow: "inset 0 0 10px #ddd",
  };

  const detailItem = {
    marginBottom: "12px",
    fontSize: "1rem",
  };

  const labelStyle = {
    fontWeight: "600",
    marginRight: "8px",
    color: "#555",
  };

  const selectStyle = {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "30px",
    cursor: "pointer",
  };

  const buttonStyle = {
    width: "100%",
    padding: "15px",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "1.2rem",
    cursor: loading ? "not-allowed" : "pointer",
    transition: "background-color 0.3s ease",
  };

  const successToastStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "linear-gradient(135deg, #28a745, #6fdc6f)",
    color: "#fff",
    padding: "15px 25px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    fontWeight: "600",
    fontSize: "1.1rem",
    display: success ? "block" : "none",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{plan.name}</h2>
      <p style={priceStyle}>₹{plan.price}</p>
      <p style={validityStyle}>Validity: {plan.validity}</p>

      {/* Plan Details */}
      <div style={detailsBox}>
        <div style={detailItem}>
          <span style={labelStyle}>Plan ID:</span> {plan.plan_id}
        </div>
        <div style={detailItem}>
          <span style={labelStyle}>Description:</span> {plan.description || "No description available."}
        </div>
        <div style={detailItem}>
          <span style={labelStyle}>Data Packs:</span>{" "}
          {plan.dataPacks
            ? Object.entries(plan.dataPacks).map(([key, value]) => (
                <div key={key}>
                  {key} MB - {value} days
                </div>
              ))
            : "No data packs available."}
        </div>
        <div style={detailItem}>
          <span style={labelStyle}>Recharge Type:</span> VOICE
        </div>
      </div>

      <div>
        <h3>Payment Mode</h3>
        <select
          style={selectStyle}
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
        >
          <option value="UPI">UPI</option>
          <option value="CREDIT_CARD">Credit Card</option>
          <option value="DEBIT_CARD">Debit Card</option>
          <option value="CASH">Cash</option>
          <option value="WALLET">Wallet</option>
        </select>
      </div>

      <button onClick={handleRecharge} disabled={loading} style={buttonStyle}>
        {loading ? "Processing..." : "Recharge Now"}
      </button>

      {success && (
        <div style={successToastStyle}>
          ✅ Recharge Successful for {plan.name}!
        </div>
      )}
    </div>
  );
}

export default PlanDetailsPage;
