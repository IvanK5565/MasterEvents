import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "@/styles/Header.css";

const Header = ({ setFilter }) => {
  const [nameInput, setNameInput] = useState(""); // Состояние для текста поиска
  const [categoryInput, setCategoryInput] = useState(""); // Состояние для выбранного значения в списке
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/api/categories")
        .then(responce => setCategories(responce.data));
  }, [])

  // Обработчик отправки поиска
  const handleSearch = () => {
    console.log("Поиск:", nameInput, "Категория:", categoryInput);
    // alert(`Поиск: "${searchQuery}", Категория: "${selectedOption}"`);
    const filter = {
      name: nameInput != "" ? nameInput : null,
      category: categoryInput != "" ? categoryInput : null,
    }
    if(setFilter == null){
      navigate("/", {state:filter});
      console.log("navigate to main")
    }
    else {
      setFilter(filter);
      console.log("setfilter")
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
          placeholder="Фамилия"
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
            Выберите категорию
          </option>
          {categories.map((option, index) => (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        <button onClick={handleSearch} className="search-button">
          Поиск
        </button>
      </div>
    </header>
  );
};

export default Header;
