import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { rechargePlan } from "../services/rechargeService";

function PlanDetailsPage() {
  const { state } = useLocation();
  const plan = state?.plan;

  const [paymentMode, setPaymentMode] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // TODO: get userId dynamically (from auth context, redux, localStorage)
  

// Extract the id

  if (!plan) return <h2 style={{ padding: "50px" }}>No plan selected!</h2>;

  

    const handleRecharge = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || !userInfo.userId) {
      console.error("User info not found in localStorage");
      return;
    }

    const rechargeData = {
       userId: userInfo.userId,
  planId: plan.plan_id,  // ✅ correct key
  amount: Object.keys(plan.dataPacks)[0], // ✅ price is the key of dataPacks
  rechargeDate: new Date().toISOString(),
  paymentStatus: "SUCCESS",
  paymentMode: paymentMode.toUpperCase().replace(/\s/g, "_"),
  rechargeType: "VOICE"    // make sure `plan` has planId
    };
    console.log("Recharge Data Payload:", rechargeData);
console.log("Plan object:", plan);
    await rechargePlan(rechargeData);
    alert("Recharge successful!");
  } catch (error) {
    console.error("Recharge failed", error);
  }
};

  return (
    <div style={{ paddingTop: "120px", padding: "40px", textAlign: "center" }}>
      <h2>{plan.name}</h2>
      <p>₹{plan.price}</p>
      <p>Validity: {plan.validity}</p>

      <div style={{ marginTop: "30px" }}>
        <h3>Payment Mode</h3>
        <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
          <option>UPI</option>
          <option>credit_card</option>
          <option>debit_card</option>
          <option> cash</option>
          <option>wallet</option>
        </select>
      </div>

      <button onClick={handleRecharge} disabled={loading}>
        {loading ? "Processing..." : "Recharge Now"}
      </button>

      {success && (
        <div style={{
          position: "fixed", bottom: "20px", right: "20px",
          background: "linear-gradient(135deg, #28a745, #6fdc6f)",
          color: "#fff", padding: "15px 25px", borderRadius: "15px"
        }}>
          ✅ Recharge Successful for {plan.name}!
        </div>
      )}
    </div>
  );
}

export default PlanDetailsPage;
