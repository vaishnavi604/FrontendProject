import React, { useState } from "react";
import { FaUser, FaEnvelope, FaTag, FaCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ComplaintsPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    description: "",
    priority: "LOW", // default
  });
  // handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userId = userInfo.userId; // ✅ get from storage

    if (!userId) {
      alert("User not logged in. Please login first.");
      return;
    }

    const complaintPayload = {
      userId: parseInt(userId), // make sure it’s a number
      category: formData.category,
      subject: formData.subject,
      description: formData.description,
      priority: formData.priority,
    };

    try {
      const response = await fetch("http://localhost:8084/api/api/complaints/addComplaint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(complaintPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to create complaint");
      }

      // ✅ success → redirect to complaint details page
      navigate("/complaint-details");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  return (
    <div style={{
      paddingTop: "120px",
      padding: "40px",
      fontFamily: "'Poppins', sans-serif",
      display: "flex",
      justifyContent: "center"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "20px",
        width: "100%",
        maxWidth: "550px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
      }}>
        <h2 style={{ textAlign: "center", color: "#d6366c", marginBottom: "30px" }}>📝 Submit a Complaint</h2>

        
        
        
        <div style={inputWrapper}>
          <FaTag style={iconStyle} />
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Category (e.g., Network, Billing)" style={inputStyle} />
        </div>
        
        <div style={inputWrapper}>
          <FaCommentDots style={iconStyle} />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe your issue" style={{ ...inputStyle, height: "100px" }} />
        </div>

        <button type="submit" style={buttonStyle}>🚀 Submit</button>
      </form>
    </div>
  );
}

const inputWrapper = {
  display: "flex",
  alignItems: "center",
  background: "#f9f9f9",
  borderRadius: "12px",
  padding: "10px 15px",
  margin: "12px 0",
  border: "1px solid #ddd"
};

const iconStyle = { marginRight: "10px", color: "#d6366c", fontSize: "1.2rem" };

const inputStyle = {
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: "1rem",
  background: "transparent"
};

const buttonStyle = {
  background: "linear-gradient(135deg, #d6366c, #ff758c)",
  color: "#fff",
  padding: "14px",
  width: "100%",
  borderRadius: "25px",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "20px",
  fontSize: "1rem"
};

export default ComplaintsPage;
