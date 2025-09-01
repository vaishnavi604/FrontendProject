import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/admin/plans")}
          style={{ padding: "10px 20px", marginRight: "10px" }}
        >
          Plans
        </button>

        <button
          onClick={() => navigate("/admin/recharges")}
          style={{ padding: "10px 20px", marginRight: "10px" }}
        >
          RechargesAdmin
        </button>

        <button
          onClick={() => navigate("/admin/complaints")}
          style={{ padding: "10px 20px", marginRight: "10px" }}
        >
          ComplaintsAdmin
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
