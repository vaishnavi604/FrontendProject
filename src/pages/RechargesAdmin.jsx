import React, { useState, useEffect } from "react";
import axios from "axios";

const RechargesAdmin = () => {
  const [recharges, setRecharges] = useState([]);

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
    <div style={{ padding: "20px" }}>
      <h1>All Recharges</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Email</th>
            <th>Amount</th>
            <th>Recharge Date</th>
            <th>Payment Status</th>
            <th>Payment Mode</th>
            <th>Recharge Type</th>
          </tr>
        </thead>
        <tbody>
          {recharges.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.user?.mail}</td>
              <td>{r.amount}</td>
              <td>{new Date(r.rechargeDate).toLocaleString()}</td>
              <td>{r.paymentStatus}</td>
              <td>{r.paymentMode}</td>
              <td>{r.rechargeType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RechargesAdmin;
