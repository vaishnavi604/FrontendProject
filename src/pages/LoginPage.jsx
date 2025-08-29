import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // adjust the path
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8084/api/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await res.json();
      login(data.token); // ✅ call from AuthContext
      localStorage.setItem("userInfo", JSON.stringify(data.userInfo)); // optional
      navigate("/explore"); // redirect wherever you want
    } catch (err) {
      setError(err.message);
    }
  };

return (
  <>
    <style>{`
      .login-container {
        max-width: 400px;
        margin: 60px auto;
        padding: 40px 30px;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }

      .login-container h2 {
        text-align: center;
        margin-bottom: 30px;
        color: #333;
        font-size: 28px;
      }

      .login-form {
        display: flex;
        flex-direction: column;
      }

      .login-form input {
        padding: 12px 14px;
        margin-bottom: 18px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 15px;
        transition: 0.2s ease-in-out;
      }

      .login-form input:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 6px rgba(0, 123, 255, 0.2);
      }

      .login-form button {
        padding: 12px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .login-form button:hover {
        background-color: #0056b3;
      }

      .login-links {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        font-size: 14px;
      }

      .login-links a {
        color: #007bff;
        text-decoration: none;
      }

      .login-links a:hover {
        text-decoration: underline;
      }

      .signup-prompt {
        text-align: center;
        margin-top: 20px;
        font-size: 14px;
        color: #555;
      }

      .signup-prompt a {
        color: #007bff;
        text-decoration: none;
        margin-left: 5px;
        font-weight: 500;
      }

      .signup-prompt a:hover {
        text-decoration: underline;
      }

      .error-message {
        color: red;
        text-align: center;
        margin-top: 15px;
        font-size: 14px;
      }
    `}</style>

    <div className="login-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <div className="login-links">
        <a href="#">Forgot Password?</a>
        <Link to="/signup">Create Account</Link>
      </div>

      <div className="signup-prompt">
        Don't have an account?
        <Link to="/signup">Sign up</Link>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  </>
);
}