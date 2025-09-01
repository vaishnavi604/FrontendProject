import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8085"; // backend base URL

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
        // Map plan_type from backend to planType for frontend
        const formattedPlans = response.data.map((plan) => ({
          ...plan,
          planType: plan.plan_type, // <-- mapping here
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
        plan_type: newPlanData.planType, // send as plan_type
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
        plan_type: editFormData.planType, // send as plan_type
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
    <div style={{ padding: "20px" }}>
      <h1>Admin - Plans</h1>

      {/* Add Plan Section */}
      <div style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "20px" }}>
        <h2>Add New Plan</h2>
        <input
          type="number"
          placeholder="Plan ID"
          value={newPlanData.plan_id}
          onChange={(e) => setNewPlanData({ ...newPlanData, plan_id: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Plan Type (Prepaid/Postpaid)"
          value={newPlanData.planType}
          onChange={(e) => setNewPlanData({ ...newPlanData, planType: e.target.value })}
        />
        <input
          type="number"
          placeholder="Validity Days"
          value={newPlanData.validityDays}
          onChange={(e) => setNewPlanData({ ...newPlanData, validityDays: Number(e.target.value) })}
        />
        <h4>Data Packs</h4>
        {newPlanData.dataPacks.map((row, idx) => (
          <div key={idx} style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
            <input
              type="text"
              placeholder="Price"
              value={row.price}
              onChange={(e) => updateDataPackRow(idx, "price", e.target.value, "new")}
            />
            <input
              type="number"
              placeholder="MB"
              value={row.mb}
              onChange={(e) => updateDataPackRow(idx, "mb", e.target.value, "new")}
            />
            <button onClick={() => removeDataPackRow(idx, "new")}>Remove</button>
          </div>
        ))}
        <button onClick={() => addDataPackRow("new")}>Add Data Pack</button>
        <br />
        <button onClick={handleAddPlan}>Add Plan</button>
      </div>

      <button onClick={fetchPlans} style={{ marginBottom: "20px" }}>
        View All Plans
      </button>

      {loading ? (
        <p>Loading plans...</p>
      ) : plans.length === 0 ? (
        <p>No plans found. Click "View All Plans" to fetch.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Plan ID</th>
              <th>Type</th>
              <th>Validity (Days)</th>
              <th>Data Packs</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.plan_id}>
                <td>{plan.plan_id}</td>
                <td>
                  {editPlanId === plan.plan_id ? (
                    <input
                      type="text"
                      value={editFormData.planType}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, planType: e.target.value })
                      }
                    />
                  ) : (
                    plan.planType // <-- now visible
                  )}
                </td>
                <td>
                  {editPlanId === plan.plan_id ? (
                    <input
                      type="number"
                      value={editFormData.validityDays}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, validityDays: e.target.value })
                      }
                    />
                  ) : (
                    plan.validityDays
                  )}
                </td>
                <td>
                  {editPlanId === plan.plan_id ? (
                    <>
                      {editFormData.dataPacks.map((row, idx) => (
                        <div key={idx} style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
                          <input
                            type="text"
                            placeholder="Price"
                            value={row.price}
                            onChange={(e) => updateDataPackRow(idx, "price", e.target.value, "edit")}
                          />
                          <input
                            type="number"
                            placeholder="MB"
                            value={row.mb}
                            onChange={(e) => updateDataPackRow(idx, "mb", e.target.value, "edit")}
                          />
                          <button onClick={() => removeDataPackRow(idx, "edit")}>Remove</button>
                        </div>
                      ))}
                      <button onClick={() => addDataPackRow("edit")}>Add Data Pack</button>
                    </>
                  ) : (
                    JSON.stringify(plan.dataPacks)
                  )}
                </td>
                <td>
                  {editPlanId === plan.plan_id ? (
                    <>
                      <button onClick={() => handleEditSave(plan.plan_id)}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(plan)}>Edit</button>
                      <button onClick={() => handleDelete(plan.plan_id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlansAdmin;
