import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "@/styles/Header.css";

const Header = ({ setFilter }) => {
  const [nameInput, setNameInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/categories")
      .then(responce => setCategories(responce.data));
  }, [])


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

  return (
    <header className="header">
      <Link to="/" className="button">Головна</Link>
      <Link to="/calendar" className="button">
        Календар
      </Link>
      <Link to="/statistics" className="button">
        Статистика
      </Link>
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
        <button onClick={handleSearch} className="search-button">
          Пошук
        </button>
      </div>
    </header>
  );
};

export default Header;
