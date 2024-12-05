import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@/styles/Header.css";

const Header = ({ setFilter }) => {
  const [searchQuery, setSearchQuery] = useState(""); // Состояние для текста поиска
  const [selectedOption, setSelectedOption] = useState(""); // Состояние для выбранного значения в списке
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/api/categories")
        .then(responce => setCategories(responce.data.data));
  }, [])

  // Обработчик отправки поиска
  const handleSearch = () => {
    console.log("Поиск:", searchQuery, "Категория:", selectedOption);
    // alert(`Поиск: "${searchQuery}", Категория: "${selectedOption}"`);
    const filter = {
      lastname: searchQuery != "" ? searchQuery : null,
      category: selectedOption != "" ? selectedOption : null,
    }
    if(setFilter == null){
      navigate("/", {state:filter});
    }
    else setFilter(filter);
  };

  return (
    <header className="header">
      <div className="search-container">
        <input
          type="search"
          placeholder="Фамилия"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
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
