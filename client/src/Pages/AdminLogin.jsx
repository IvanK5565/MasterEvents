import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const navigate = useNavigate();

  const validateEmail = () => {
    if (!email) {
      setErrors({ email: "Email is required" });
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Email is invalid" });
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setErrors({ password: "Password is required" });
      return false;
    }
    return true;
  };

  const handleFindUser = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    try {
      const response = await axios.get("http://localhost:8080/api/users/", {
        params: { filter: { email } }
      });

      if (!response.data) {
        setServerError("User not found");
        return;
      }

      const user = response.data;
      setFoundUser(user);

      if (user.role === 'guest') {
        // Login as guest directly
        await handleGuestLogin(user);
      }
      // If admin, the password field will be shown for password entry
    } catch (error) {
      setServerError("User not found");
    }
  };

  const handleGuestLogin = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/login",
        { email: user.email, isGuest: true },
        { withCredentials: true }
      );

      if (response.status === 200 && response.data) {
        localStorage.setItem('user', JSON.stringify({ email: user.email, role: 'guest' }));
        navigate("/admin/users");
      }
    } catch (error) {
      setServerError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200 && response.data) {
        localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
        navigate("/admin/users");
      }
    } catch (error) {
      setServerError(error.response?.data?.message || "Invalid password");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({});
    setServerError("");
    setFoundUser(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({});
    setServerError("");
  };

  return (
    <div className="admin-login-container">
      <Link to="/" className="back-button">
        Назад
      </Link>
      <div className="login-box">
        <h2>Вхід</h2>
        {serverError && <div className="error-message">{serverError}</div>}
        
        {!foundUser || foundUser.role !== 'admin' ? (
          // Email form
          <form onSubmit={handleFindUser}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <button type="submit">Continue</button>
          </form>
        ) : (
          // Password form for admin
          <form onSubmit={handleAdminLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                disabled
                className="disabled"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>
            <div className="button-group">
              <button type="submit">Login</button>
              <button type="button" className="back-login-button" onClick={() => {
                setFoundUser(null);
                setPassword("");
                setErrors({});
              }}>
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
