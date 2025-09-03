import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const redShade = "#C0392B";
  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  // Fetch userInfo from localStorage on component mount
  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserInfo(parsedUser);
      } catch (error) {
        console.error("Failed to parse userInfo from localStorage:", error);
      }
    }
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    navigate("/login");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "#FFFFFF",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: redShade }}>WeZen</h1>
        <Link
          to="/explore"
          style={{ textDecoration: "none", color: "#333333", fontWeight: "500" }}
        >
          Explore
        </Link>
      </div>

      {/* Right */}
      <nav style={{ display: "flex", gap: "20px", alignItems: "center", position: "relative" }} ref={dropdownRef}>
        <Link to="/about" style={{ textDecoration: "none", color: "#333333" }}>
          About
        </Link>
        <Link to="/contact" style={{ textDecoration: "none", color: "#333333" }}>
          Contact
        </Link>

        {/* Admin button (only visible if the user is an admin) */}
        {userInfo && userInfo.role === "admin" && (
          <Link
            to="/admin"
            style={{
              textDecoration: "none",
              background: redShade,
              color: "#FFFFFF",
              padding: "6px 18px",
              borderRadius: "20px",
              fontWeight: "600",
            }}
          >
            Admin Panel
          </Link>
        )}

        {/* User dropdown (if logged in) */}
        {userInfo ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
            <span style={{ fontSize: "1rem" }}>Hi, {userInfo.userName}</span>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "60px",
                  right: "0",
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  width: "220px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  zIndex: 9999,
                }}
              >
                <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                  <strong>User ID:</strong> {userInfo.userId}
                </p>
                <p style={{ marginBottom: "12px", fontSize: "14px" }}>
                  <strong>Username:</strong> {userInfo.userName}
                </p>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: redShade,
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "600",
                    width: "100%",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              background: redShade,
              color: "#FFFFFF",
              padding: "6px 18px",
              borderRadius: "20px",
              fontWeight: "600",
            }}
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
