import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8084"; // backend base URL

const containerStyle = {
  padding: "0px",
  maxWidth: "900px", // Reduced the max width
  margin: "auto",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  overflow: "hidden",
};

const thStyle = {
  backgroundColor: "#C0392B", // Red color
  color: "white",
  padding: "10px 15px", // Reduced padding
  textAlign: "left",
  fontSize: "0.95rem", // Smaller font size
  fontWeight: "bold",
  letterSpacing: "1px",
  textTransform: "uppercase",
  borderRight: "2px solid white", // White border for column separation
};

const tdStyle = {
  padding: "10px 15px", // Reduced padding
  borderBottom: "1px solid #ddd", // Light grey row separation
  borderRight: "2px solid white", // White border for column separation
  fontSize: "0.9rem", // Smaller font size
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "4px 6px", // Reduced padding
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "13px", // Smaller font size
};

const actionButtonStyle = {
  marginRight: "8px",
  padding: "4px 10px", // Reduced padding
  fontSize: "13px", // Smaller font size
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const saveButtonStyle = {
  ...actionButtonStyle,
  backgroundColor: "#28a745",
  color: "white",
};

const cancelButtonStyle = {
  ...actionButtonStyle,
  backgroundColor: "#dc3545",
  color: "white",
};

const editButtonStyle = {
  ...actionButtonStyle,
  backgroundColor: "#ffc107",
  color: "black",
};

const trHoverStyle = {
  backgroundColor: "#f9f9f9", // Light white background on hover
  cursor: "pointer",
};

const ComplaintsAdmin = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editComplaintId, setEditComplaintId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    category: "",
    subject: "",
    description: "",
    priority: "",
    status: "",
    assignee: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchComplaints = async () => {
    if (!token) {
      alert("You are not logged in!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/api/complaints/getComplaints`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(response.data || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      alert("Failed to fetch complaints. Make sure your token is valid.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (complaint) => {
    setEditComplaintId(complaint.id);
    setEditFormData({
      category: complaint.category || "",
      subject: complaint.subject || "",
      description: complaint.description || "",
      priority: complaint.priority || "",
      status: complaint.status || "",
      assignee: complaint.assignee || "",
    });
  };

  const handleInputChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSave = async (id) => {
    try {
      const complaint = complaints.find((c) => c.id === id);
      if (!complaint) {
        alert("Complaint not found");
        return;
      }

      const payload = {
        ...editFormData,
        userId: complaint.userId,
        id: complaint.id, // Include id in payload
      };

      console.log("Updated payload:", payload); // Check the payload to ensure `status` is there

      // Send the update request to the backend
      await axios.put(`${BASE_URL}/api/api/complaints/updateComplaint/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchComplaints(); // Refresh the complaints after the update
      setEditComplaintId(null);
    } catch (error) {
      console.error("Error updating complaint:", error.response || error);
      alert("Failed to update complaint.");
    }
  };

  const handleCancelEdit = () => {
    setEditComplaintId(null);
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "1.8rem", color: "#C0392B" }}>
        Admin - Complaints
      </h1>

      {loading ? (
        <p>Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>User ID</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Subject</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Priority</th>
              <th style={thStyle}>Assignee</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => {
              const isEditing = editComplaintId === complaint.id;
              return (
                <tr
                  key={complaint.id}
                  style={isEditing ? trHoverStyle : {}}
                >
                  <td style={tdStyle}>{complaint.id}</td>
                  <td style={tdStyle}>{complaint.userId}</td>
                  <td style={tdStyle}>
                    {isEditing ? (
                      <input
                        style={inputStyle}
                        type="text"
                        value={editFormData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                      />
                    ) : (
                      complaint.category
                    )}
                  </td>
                  <td style={tdStyle}>
                    {isEditing ? (
                      <input
                        style={inputStyle}
                        type="text"
                        value={editFormData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                      />
                    ) : (
                      complaint.subject
                    )}
                  </td>
                  <td style={tdStyle}>
                    {isEditing ? (
                      <input
                        style={inputStyle}
                        type="text"
                        value={editFormData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                      />
                    ) : (
                      complaint.description
                    )}
                  </td>
                  <td style={tdStyle}>
                    {isEditing ? (
                      <select
                        style={inputStyle}
                        value={editFormData.status}
                        onChange={(e) => handleInputChange("status", e.target.value)}
                      >
                        <option value="OPEN">OPEN</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="ESCALATED">ESCALATED</option>
                        <option value="RESOLVED">RESOLVED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    ) : (
                      complaint.status
                    )}
                  </td>
                  <td style={tdStyle}>
                    {isEditing ? (
                      <select
                        style={inputStyle}
                        value={editFormData.priority}
                        onChange={(e) => handleInputChange("priority", e.target.value)}
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                        <option value="URGENT">Urgent</option>
                      </select>
                    ) : (
                      complaint.priority
                    )}
                  </td>
                  <td style={tdStyle}>
                    {isEditing ? (
                      <input
                        style={inputStyle}
                        type="text"
                        value={editFormData.assignee}
                        onChange={(e) => handleInputChange("assignee", e.target.value)}
                      />
                    ) : (
                      complaint.assignee
                    )}
                  </td>
                  <td style={tdStyle}>
                    {isEditing ? (
                      <>
                        <button style={saveButtonStyle} onClick={() => handleEditSave(complaint.id)}>
                          Save
                        </button>
                        <button style={cancelButtonStyle} onClick={handleCancelEdit}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button style={editButtonStyle} onClick={() => handleEditClick(complaint)}>
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComplaintsAdmin;
