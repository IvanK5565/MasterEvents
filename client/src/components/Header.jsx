import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "@/styles/Header.css";
import "@/styles/Universal.css";

const Header = ({ setFilter }) => {
  const [nameInput, setNameInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/categories")
      .then(responce => setCategories(responce.data));

    // Check for user info in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearch = () => {
    const filter = {}
    if(nameInput) filter.name = nameInput;
    if(categoryInput) filter.category = categoryInput;
    if (setFilter == null) {
      navigate("/", { state: filter });
    }
    else {
      setFilter(filter);
    }
  };

  const handleLogin = () => {
    navigate("/admin/login");
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/admin/logout", {}, {
        withCredentials: true
      });
      localStorage.removeItem('user');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header">
      <div className="nav-buttons">
        <Link to="/" className="white_button">Головна</Link>
        <Link to="/calendar" className="white_button">
          Календар
        </Link>
        <Link to="/statistics" className="white_button">
          Статистика
        </Link>
      </div>
      <div className="search-container">
        <input
          type="search"
          placeholder="Ім'я"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="search-input"
        />
        <select
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          className="dropdown"
        >
          <option value="">
            Оберіть категорію
          </option>
          {categories.map((option, index) => (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        <button onClick={handleSearch} className="white_button">
          Пошук
        </button>
      </div>
      <div className="auth-section">
        {user ? (
          <div className="user-info">
            {user.role === 'admin' ? (
              <Link to="/admin/users" className="user-email">
                {user.email}
              </Link>
            ) : (
              <span className="user-email guest-email">
                {user.email}
              </span>
            )}
            <button onClick={handleLogout} className="white_button">
              Вийти
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} className="white_button login-button">
            Вхід
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
