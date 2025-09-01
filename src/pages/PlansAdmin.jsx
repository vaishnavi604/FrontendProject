import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8084"; // backend base URL

const PlansAdmin = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editPlanId, setEditPlanId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    plan_id: "",
    planType: "",
    validityDays: "",
    dataPacks: [],
  });
  const [newPlanData, setNewPlanData] = useState({
    plan_id: "",
    planType: "",
    validityDays: "",
    dataPacks: [],
  });

  const token = localStorage.getItem("token");

  // Fetch all plans
  const fetchPlans = async () => {
    if (!token) {
      alert("You are not logged in!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/api/plans`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(response.data)) {
        const formattedPlans = response.data.map((plan) => ({
          ...plan,
          planType: plan.plan_type,
          dataPacks: Object.entries(plan.dataPacks || {}).map(([price, mb]) => ({
            price,
            mb,
          })),
        }));
        setPlans(formattedPlans);
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      alert("Failed to fetch plans. Make sure your token is valid.");
    }
    setLoading(false);
  };

  // Convert dataPack array to object for backend
  const convertDataPacksToObj = (dataPacksArray) => {
    const obj = {};
    dataPacksArray.forEach((row) => {
      if (row.price && row.mb) obj[row.price] = Number(row.mb);
    });
    return obj;
  };

  // Add new plan
  const handleAddPlan = async () => {
    try {
      const payload = {
        plan_id: newPlanData.plan_id,
        plan_type: newPlanData.planType,
        validityDays: newPlanData.validityDays,
        dataPacks: convertDataPacksToObj(newPlanData.dataPacks),
      };
      await axios.post(`${BASE_URL}/api/api/plans/addplan`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Plan added successfully!");
      fetchPlans();
      setNewPlanData({ plan_id: "", planType: "", validityDays: "", dataPacks: [] });
    } catch (error) {
      console.error("Error adding plan:", error);
      alert("Failed to add plan. Make sure all fields are valid.");
    }
  };

  // Delete a plan
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/api/plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlans(plans.filter((plan) => plan.plan_id !== id));
    } catch (error) {
      console.error("Error deleting plan:", error);
      alert("Failed to delete plan.");
    }
  };

  // Edit handlers
  const handleEditClick = (plan) => {
    setEditPlanId(plan.plan_id);
    setEditFormData({
      ...plan,
    });
  };

  const handleEditSave = async (id) => {
    try {
      const payload = {
        plan_id: editFormData.plan_id,
        plan_type: editFormData.planType,
        validityDays: editFormData.validityDays,
        dataPacks: convertDataPacksToObj(editFormData.dataPacks),
      };
      await axios.put(`${BASE_URL}/api/api/plans/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPlans();
      setEditPlanId(null);
    } catch (error) {
      console.error("Error updating plan:", error);
      alert("Failed to update plan.");
    }
  };

  const handleCancelEdit = () => setEditPlanId(null);

  // Handle adding/removing/updating dataPack rows
  const addDataPackRow = (planType) => {
    if (planType === "new") {
      setNewPlanData({
        ...newPlanData,
        dataPacks: [...newPlanData.dataPacks, { price: "", mb: "" }],
      });
    } else {
      setEditFormData({
        ...editFormData,
        dataPacks: [...editFormData.dataPacks, { price: "", mb: "" }],
      });
    }
  };

  const removeDataPackRow = (index, planType) => {
    if (planType === "new") {
      setNewPlanData({
        ...newPlanData,
        dataPacks: newPlanData.dataPacks.filter((_, i) => i !== index),
      });
    } else {
      setEditFormData({
        ...editFormData,
        dataPacks: editFormData.dataPacks.filter((_, i) => i !== index),
      });
    }
  };

  const updateDataPackRow = (index, field, value, planType) => {
    if (planType === "new") {
      const updatedRows = [...newPlanData.dataPacks];
      updatedRows[index][field] = value;
      setNewPlanData({ ...newPlanData, dataPacks: updatedRows });
    } else {
      const updatedRows = [...editFormData.dataPacks];
      updatedRows[index][field] = value;
      setEditFormData({ ...editFormData, dataPacks: updatedRows });
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "auto", fontFamily: "'Poppins', sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#C0392B", marginBottom: "30px" }}>Admin - Plans</h1>

      {/* Add Plan Section */}
      <div
        style={{
          marginBottom: "40px",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(107,15,186,0.2)",
          backgroundColor: "white",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#C0392B" }}>Add New Plan</h2>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "20px" }}>
          <input
            type="number"
            placeholder="Plan ID"
            value={newPlanData.plan_id}
            onChange={(e) => setNewPlanData({ ...newPlanData, plan_id: Number(e.target.value) })}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Plan Type (Prepaid/Postpaid)"
            value={newPlanData.planType}
            onChange={(e) => setNewPlanData({ ...newPlanData, planType: e.target.value })}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Validity Days"
            value={newPlanData.validityDays}
            onChange={(e) => setNewPlanData({ ...newPlanData, validityDays: Number(e.target.value) })}
            style={inputStyle}
          />
        </div>

        <h4 style={{ marginBottom: "10px", color: "#C0392B" }}>Data Packs</h4>
        {newPlanData.dataPacks.map((row, idx) => (
          <div key={idx} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Price"
              value={row.price}
              onChange={(e) => updateDataPackRow(idx, "price", e.target.value, "new")}
              style={{ ...inputStyle, width: "120px" }}
            />
            <input
              type="number"
              placeholder="MB"
              value={row.mb}
              onChange={(e) => updateDataPackRow(idx, "mb", e.target.value, "new")}
              style={{ ...inputStyle, width: "120px" }}
            />
            <button
              onClick={() => removeDataPackRow(idx, "new")}
              style={removeBtnStyle}
              title="Remove data pack"
            >
              &times;
            </button>
          </div>
        ))}
        <button onClick={() => addDataPackRow("new")} style={addBtnStyle}>
          + Add Data Pack
        </button>
        <br />
        <button onClick={handleAddPlan} style={submitBtnStyle}>
          Add Plan
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button onClick={fetchPlans} style={fetchBtnStyle}>
          View All Plans
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading plans...</p>
      ) : plans.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No plans found. Click "View All Plans" to fetch.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.plan_id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(107,15,186,0.15)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(107,15,186,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(107,15,186,0.15)";
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <strong>Plan ID:</strong>{" "}
                {editPlanId === plan.plan_id ? (
                  <input
                    type="number"
                    value={editFormData.plan_id}
                    onChange={(e) => setEditFormData({ ...editFormData, plan_id: Number(e.target.value) })}
                    style={inputStyle}
                    disabled
                  />
                ) : (
                  plan.plan_id
                )}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <strong>Type:</strong>{" "}
                {editPlanId === plan.plan_id ? (
                  <input
                    type="text"
                    value={editFormData.planType}
                    onChange={(e) => setEditFormData({ ...editFormData, planType: e.target.value })}
                    style={inputStyle}
                  />
                ) : (
                  plan.planType
                )}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <strong>Validity (Days):</strong>{" "}
                {editPlanId === plan.plan_id ? (
                  <input
                    type="number"
                    value={editFormData.validityDays}
                    onChange={(e) => setEditFormData({ ...editFormData, validityDays: Number(e.target.value) })}
                    style={inputStyle}
                  />
                ) : (
                  plan.validityDays
                )}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <strong>Data Packs:</strong>
                {editPlanId === plan.plan_id ? (
                  <>
                    {editFormData.dataPacks.map((row, idx) => (
                      <div
                        key={idx}
                        style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "center" }}
                      >
                        <input
                          type="text"
                          placeholder="Price"
                          value={row.price}
                          onChange={(e) => updateDataPackRow(idx, "price", e.target.value, "edit")}
                          style={{ ...inputStyle, width: "120px" }}
                        />
                        <input
                          type="number"
                          placeholder="MB"
                          value={row.mb}
                          onChange={(e) => updateDataPackRow(idx, "mb", e.target.value, "edit")}
                          style={{ ...inputStyle, width: "120px" }}
                        />
                        <button
                          onClick={() => removeDataPackRow(idx, "edit")}
                          style={removeBtnStyle}
                          title="Remove data pack"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <button onClick={() => addDataPackRow("edit")} style={addBtnStyle}>
                      + Add Data Pack
                    </button>
                  </>
                ) : (
                  <ul style={{ marginTop: "5px", paddingLeft: "20px", color: "#555" }}>
                    {plan.dataPacks.length > 0 ? (
                      plan.dataPacks.map(({ price, mb }, i) => (
                        <li key={i}>
                          Price: ₹{price}, Data: {mb} MB
                        </li>
                      ))
                    ) : (
                      <li>No Data Packs</li>
                    )}
                  </ul>
                )}
              </div>
              <div style={{ marginTop: "15px", display: "flex", gap: "12px" }}>
                {editPlanId === plan.plan_id ? (
                  <>
                    <button onClick={() => handleEditSave(plan.plan_id)} style={saveBtnStyle}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit} style={cancelBtnStyle}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(plan)} style={editBtnStyle}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(plan.plan_id)} style={deleteBtnStyle}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Shared input styling
const inputStyle = {
  padding: "8px 12px",
  fontSize: "14px",
  borderRadius: "6px",
  border: "1.8px solid #ddd",
  outline: "none",
  transition: "border-color 0.3s ease",
  flex: "1",
};

const addBtnStyle = {
  backgroundColor: "#C0392B",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "background-color 0.3s ease",
};

const removeBtnStyle = {
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  padding: "4px 10px",
  borderRadius: "50%",
  fontWeight: "bold",
  cursor: "pointer",
  lineHeight: "1",
  fontSize: "16px",
};

const submitBtnStyle = {
  marginTop: "20px",
  backgroundColor: "#C0392B",
  color: "white",
  border: "none",
  padding: "12px 25px",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "700",
  boxShadow: "0 5px 15px rgba(107,15,186,0.4)",
  transition: "background-color 0.3s ease",
};

const fetchBtnStyle = {
  backgroundColor: "#C0392B",
  color: "white",
  border: "none",
  padding: "10px 22px",
  borderRadius: "10px",
  fontSize: "15px",
  cursor: "pointer",
  fontWeight: "600",
  boxShadow: "0 4px 10px rgba(107,15,186,0.3)",
  transition: "background-color 0.3s ease",
};

const editBtnStyle = {
  backgroundColor: "#C0392B",
  border: "none",
  padding: "8px 18px",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
  flex: 1,
  transition: "background-color 0.3s ease",
};

const saveBtnStyle = {
  backgroundColor: "#2ecc71",
  border: "none",
  padding: "8px 18px",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
  flex: 1,
  transition: "background-color 0.3s ease",
};

const cancelBtnStyle = {
  backgroundColor: "#95a5a6",
  border: "none",
  padding: "8px 18px",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
  flex: 1,
  transition: "background-color 0.3s ease",
};

const deleteBtnStyle = {
  backgroundColor: "#e74c3c",
  border: "none",
  padding: "8px 18px",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
  flex: 1,
  transition: "background-color 0.3s ease",
};

export default PlansAdmin;
