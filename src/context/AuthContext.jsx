import { createContext, useContext, useState, useEffect } from "react";

// 1️⃣ Create context
const AuthContext = createContext();

// 2️⃣ AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // optional: store user info
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Safely check localStorage on initial load
    const token = localStorage.getItem("token");
    const storedUserInfo = localStorage.getItem("userInfo");

    let parsedUser = null;
    try {
      if (storedUserInfo && storedUserInfo !== "undefined") {
        parsedUser = JSON.parse(storedUserInfo);
      }
    } catch (error) {
      console.error("Failed to parse userInfo from localStorage:", error);
      localStorage.removeItem("userInfo"); // cleanup if corrupted
    }

    if (token) {
      setIsAuthenticated(true);
      setUser(parsedUser);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }

    setLoading(false);
  }, []);

  // 🔑 login function
  const login = (token, userInfo) => {
    localStorage.setItem("token", token);

    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setUser(userInfo);
    } else {
      localStorage.removeItem("userInfo");
      setUser(null);
    }

    setIsAuthenticated(true);
  };

  // 🚪 logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 3️⃣ Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
