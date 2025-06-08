import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "@/styles/Header.css";
import "@/styles/Universal.css";

const Header = ({ setFilter }) => {
  const [nameInput, setNameInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
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

    // Add click outside listener
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
      setIsDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="nav-buttons">
        <Link to="/" className="white_button">Головна</Link>
        <Link to="/calendar" className="white_button">
          Календар
        </Link>
        {user?.role === 'admin' && (
          <Link to="/statistics" className="white_button">
            Статистика
          </Link>
        )}
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
          <div className="user-info" ref={dropdownRef}>
            <div 
              className={`user-email ${isDropdownOpen ? 'active' : ''}`}
              onClick={toggleDropdown}
            >
              {user.email}
            </div>
            <div className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
              {user.role === 'admin' && (
                <Link to="/admin/users" className="dropdown-item">
                  Управління користувачами
                </Link>
              )}
              {user.role === 'admin' && (
                <Link to="/admin/events" className="dropdown-item">
                Управління подіями
                </Link>
              )}
              <button onClick={handleLogout} className="dropdown-item logout">
                Вийти
              </button>
            </div>
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
