import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // adjust the path
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import icons from react-icons

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Reset error on each input change
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setFormValid(false);
      return false;
    }
    setFormValid(true);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Don't submit if form is invalid

    setError(""); // Reset error
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
      navigate("/"); // redirect wherever you want
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
          font-weight: 600;
        }

        .login-form {
          display: flex;
          flex-direction: column;
        }

        .login-form label {
          font-size: 14px;
          color: #333;
          margin-bottom: 6px;
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
          border-color: #C0392B;
          box-shadow: 0 0 6px rgba(192, 57, 43, 0.3);
        }

        .login-form .input-container {
          display: flex;
          align-items: center;
        }

        .login-form .input-container input {
          flex: 1;
        }

        .login-form .input-container svg {
          color: #C0392B;
          margin-right: 10px;
        }

        .login-form button {
          padding: 12px;
          background-color: #C0392B; /* Red color */
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .login-form button:hover {
          background-color: #a03226;
        }

        .login-links {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
          font-size: 14px;
        }

        .login-links a {
          color: #C0392B;
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
          color: #C0392B;
          text-decoration: none;
          margin-left: 5px;
          font-weight: 500;
        }

        .signup-prompt a:hover {
          text-decoration: underline;
        }

        .error-message {
          color: #e74c3c;
          text-align: center;
          margin-top: 15px;
          font-size: 14px;
        }

        .form-valid input {
          border-color: #28a745; /* Green border if valid */
        }
        
        .form-invalid input {
          border-color: #e74c3c; /* Red border if invalid */
        }

        .form-valid button {
          background-color: #28a745; /* Green button if valid */
        }

        .form-invalid button {
          background-color: #e74c3c; /* Red button if invalid */
        }
      `}</style>

      <div className="login-container">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className={`form-group ${formValid ? 'form-valid' : 'form-invalid'}`}>
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <FaEnvelope size={20} />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <label htmlFor="password">Password</label>
            <div className="input-container">
              <FaLock size={20} />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={!formValid}>
            Login
          </button>
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
