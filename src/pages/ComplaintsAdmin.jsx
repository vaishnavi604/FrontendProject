import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8084"; // backend base URL

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

  // Fetch all complaints
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
    }
    setLoading(false);
  };

  // Edit handlers
  const handleEditClick = (complaint) => {
    setEditComplaintId(complaint.id);
    setEditFormData({
      category: complaint.category,
      subject: complaint.subject,
      description: complaint.description,
      priority: complaint.priority,
      status: complaint.status,
      assignee: complaint.assignee || "",
    });
  };

  const handleEditSave = async (id) => {
    try {
      const payload = { ...editFormData, userId: complaints.find(c => c.id === id).userId };
      await axios.put(`${BASE_URL}/api/complaints/updateComplaint/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComplaints();
      setEditComplaintId(null);
    } catch (error) {
      console.error("Error updating complaint:", error);
      alert("Failed to update complaint.");
    }
  };

  const handleCancelEdit = () => setEditComplaintId(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin - Complaints</h1>

      <button onClick={fetchComplaints} style={{ marginBottom: "20px" }}>
        View All Complaints
      </button>

      {loading ? (
        <p>Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p>No complaints found. Click "View All Complaints" to fetch.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Category</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assignee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.userId}</td>
                <td>
                  {editComplaintId === complaint.id ? (
                    <input
                      type="text"
                      value={editFormData.category}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, category: e.target.value })
                      }
                    />
                  ) : (
                    complaint.category
                  )}
                </td>
                <td>
                  {editComplaintId === complaint.id ? (
                    <input
                      type="text"
                      value={editFormData.subject}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, subject: e.target.value })
                      }
                    />
                  ) : (
                    complaint.subject
                  )}
                </td>
                <td>
                  {editComplaintId === complaint.id ? (
                    <input
                      type="text"
                      value={editFormData.description}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, description: e.target.value })
                      }
                    />
                  ) : (
                    complaint.description
                  )}
                </td>
                <td>
                  {editComplaintId === complaint.id ? (
                    <input
                      type="text"
                      value={editFormData.status}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, status: e.target.value })
                      }
                    />
                  ) : (
                    complaint.status
                  )}
                </td>
                <td>
                  {editComplaintId === complaint.id ? (
                    <input
                      type="text"
                      value={editFormData.priority}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, priority: e.target.value })
                      }
                    />
                  ) : (
                    complaint.priority
                  )}
                </td>
                <td>
                  {editComplaintId === complaint.id ? (
                    <input
                      type="text"
                      value={editFormData.assignee}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, assignee: e.target.value })
                      }
                    />
                  ) : (
                    complaint.assignee
                  )}
                </td>
                <td>
                  {editComplaintId === complaint.id ? (
                    <>
                      <button onClick={() => handleEditSave(complaint.id)}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditClick(complaint)}>Edit</button>
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

export default ComplaintsAdmin;
