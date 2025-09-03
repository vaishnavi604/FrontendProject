import { useEffect, useState } from "react";
import axios from "axios";
import "./ComplaintsDetails.css"; // We'll create this CSS file

export default function ComplaintDetails() {
  const [complaints, setComplaints] = useState([]);
  const [expandedComplaint, setExpandedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
    // Set up interval to check for status updates every 30 seconds
    const interval = setInterval(fetchComplaints, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      const info = JSON.parse(localStorage.getItem("userInfo"));
      const userId = info?.id || info?.userId;

      if (!userId) {
        console.error("No userId found in localStorage");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:8084/api/api/complaints/getComplaintsByUser/${userId}`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );

      setComplaints(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    if (expandedComplaint === id) {
      setExpandedComplaint(null);
    } else {
      setExpandedComplaint(id);
    }
  };

  const getStatusStep = (complaint) => {
    if (complaint.status === "CLOSED" || complaint.status === "RESOLVED") return 3;
    if (complaint.escalated) return 2;
    if (complaint.status === "IN_PROGRESS") return 1;
    return 0;
  };

  if (loading) return <div className="loading">Loading complaints...</div>;
  if (!complaints.length) return <p className="no-complaints">No complaints found for this user.</p>;

  return (
    <div className="complaints-container">
      <h2>My Complaints</h2>
      
      <div className="complaints-table">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="complaint-item">
            <div className="complaint-summary" onClick={() => toggleExpand(complaint.id)}>
              <div className="complaint-id">#{complaint.id}</div>
              <div className="complaint-title">{complaint.title}</div>
              <div className={`status-badge status-${complaint.status.toLowerCase()}`}>
                {complaint.status}
              </div>
              <div className="expand-icon">
                {expandedComplaint === complaint.id ? "▲" : "▼"}
              </div>
            </div>
            
            {expandedComplaint === complaint.id && (
              <div className="complaint-details">
                <div className="status-tracker">
                  <div className="tracker-container">
                    <div className="tracker-line">
                      <div 
                        className="tracker-progress" 
                        style={{ width: `${getStatusStep(complaint) * 33.33}%` }}
                      ></div>
                    </div>
                    <div className="tracker-points">
                      <div className={`tracker-point ${getStatusStep(complaint) >= 0 ? 'active' : ''}`}>
                        <span>Submitted</span>
                      </div>
                      <div className={`tracker-point ${getStatusStep(complaint) >= 1 ? 'active' : ''}`}>
                        <span>In Progress</span>
                      </div>
                      {complaint.escalated && (
                        <div className={`tracker-point ${getStatusStep(complaint) >= 2 ? 'active' : ''}`}>
                          <span>Escalated</span>
                        </div>
                      )}
                      <div className={`tracker-point ${getStatusStep(complaint) >= 3 ? 'active' : ''}`}>
                        <span>Resolved</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Description:</strong>
                    <p>{complaint.description}</p>
                  </div>
                  <div className="detail-item">
                    <strong>Created:</strong>
                    <p>{new Date(complaint.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="detail-item">
                    <strong>Last Updated:</strong>
                    <p>{new Date(complaint.updatedAt).toLocaleDateString()}</p>
                  </div>
                  {complaint.escalated && (
                    <div className="detail-item">
                      <strong>Escalated:</strong>
                      <p>This issue has been escalated to higher authorities</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
