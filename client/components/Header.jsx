import React, { useState, useEffect } from "react";
import "../styles/Header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Состояние для текста поиска
  const [dropdownOptions, setDropdownOptions] = useState([]); // Состояние для данных из запроса
  const [selectedOption, setSelectedOption] = useState(""); // Состояние для выбранного значения в списке

  // Эффект для загрузки данных в выпадающий список
  useEffect(() => {
    // Эмуляция загрузки данных
    const fetchData = async () => {
      const data = ["Учитель", "Студент", "Администратор", "Технический персонал"];
      setDropdownOptions(data); // Установка данных
    };

    fetchData();
  }, []);

  // Обработчик отправки поиска
  const handleSearch = () => {
    console.log("Поиск:", searchQuery, "Категория:", selectedOption);
    alert(`Поиск: "${searchQuery}", Категория: "${selectedOption}"`);
  };

  return (
    <header className="header">
      <div className="search-container">
        <input
          type="text"
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
          <option value="" disabled>
            Выберите категорию
          </option>
          {dropdownOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
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
