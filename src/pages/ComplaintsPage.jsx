import React, { useState } from "react";
import { FaUser, FaEnvelope, FaTag, FaCommentDots } from "react-icons/fa";

function ComplaintsPage() {
  const [form, setForm] = useState({ name: "", email: "", category: "", description: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect with state
    window.location.href = `/complaint-details?id=12345&name=${form.name}&category=${form.category}`;
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
          <FaUser style={iconStyle} />
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" style={inputStyle} />
        </div>
        
        <div style={inputWrapper}>
          <FaEnvelope style={iconStyle} />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" style={inputStyle} />
        </div>
        
        <div style={inputWrapper}>
          <FaTag style={iconStyle} />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category (e.g., Network, Billing)" style={inputStyle} />
        </div>
        
        <div style={inputWrapper}>
          <FaCommentDots style={iconStyle} />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe your issue" style={{ ...inputStyle, height: "100px" }} />
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
