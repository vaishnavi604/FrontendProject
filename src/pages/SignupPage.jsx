import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // adjust the path
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mail: "",      // ✅ backend expects 'mail'
    password: "",
    phoneNo: ""    // ✅ backend expects 'phoneNo'
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8084/api/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Signup failed");
      }

      const data = await res.json();
      login(data.token); 
      localStorage.setItem("userInfo", JSON.stringify(data.userInfo)); 
      navigate("/explore");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
  <>
    <style>{`
      .signup-container {
        max-width: 400px;
        margin: 60px auto;
        padding: 30px;
        background-color: #f7f7f7;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
      }

      .signup-container h2 {
        text-align: center;
        margin-bottom: 25px;
        color: #333;
      }

      .signup-form {
        display: flex;
        flex-direction: column;
      }

      .signup-form label {
        margin-bottom: 15px;
        font-weight: 500;
        color: #444;
        font-size: 14px;
      }

      .signup-form input {
        padding: 10px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 14px;
      }

      .signup-form input:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
      }

      .signup-form button {
        padding: 12px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        margin-top: 10px;
        transition: background-color 0.3s ease;
      }

      .signup-form button:hover {
        background-color: #0056b3;
      }

      .error-message {
        color: red;
        text-align: center;
        margin-top: 15px;
        font-size: 14px;
      }

      .login-prompt {
        text-align: center;
        margin-top: 20px;
        font-size: 14px;
        color: #555;
      }

      .login-prompt a {
        color: #007bff;
        text-decoration: none;
        font-weight: 600;
        margin-left: 5px;
      }

      .login-prompt a:hover {
        text-decoration: underline;
      }
    `}</style>

    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Full Name
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="mail"
            placeholder="example@mail.com"
            value={formData.mail}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone Number
          <input
            type="text"
            name="phoneNo"
            placeholder="1234567890"
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Sign Up</button>
      </form>

      <div className="login-prompt">
        Already have an account?
        <Link to="/login">Login</Link>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  </>
);
}
