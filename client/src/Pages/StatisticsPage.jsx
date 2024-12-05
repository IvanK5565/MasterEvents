import React, { useState, useEffect } from "react";
import Statistics from "../components/Statistics/Statistics";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import "@/styles/StatisticsPage.css";

const StatisticsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [votes, setVotes] = useState([]);

  const [filteredCategory, setFilteredCategory] = useState("");
  const [statistics, setStatistics] = useState([]);
  const [years, setYears] = useState([]);
  const [currentYear, setCurYear] = useState("");
  const months = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
  // const categories = ["Все категории", ...new Set(events.map((e) => e.category))];

  // Фильтруем данные по выбранной категории
  useEffect(() => {
    try {
      axios.get("http://localhost:8080/api/events")
        .then(responce => setEvents(responce.data.data));
      axios.get("http://localhost:8080/api/categories")
        .then(responce => setCategories(responce.data.data));
      axios.get("http://localhost:8080/api/votes")
        .then(responce => setVotes(responce.data));
    }
    catch (err) {
      console.error('Ошибка при загрузке данных:', err);
    }


    const filteredEvents = events.filter((event) => {
      const categoryCheck = filteredCategory == "" || event.category == filteredCategory;
      const yearCheck = currentYear == "" || new Date(event.date).getFullYear() == currentYear;
      return categoryCheck && yearCheck;
    });

    const monthlyStats = Array.from({ length: 12 }, (_, i) => ({
      month: i,
      totalEvents: 0,
      attendeesYes: 0,
      attendeesNo: 0,
    }));

    filteredEvents.forEach((event) => {

      const month = new Date(event.date).getMonth(); // месяц (0-11)
      monthlyStats[month].totalEvents += 1;
      monthlyStats[month].attendeesYes += votes.filter(vote => vote.vote == true).length || 0;
      monthlyStats[month].attendeesNo += votes.filter(vote => vote.vote == false).length || 0;

      setYears(events.map((e) => new Date(e.date).getFullYear()))
    });

    setStatistics(monthlyStats);
  }, [filteredCategory, events]);


  return (
    <>
      <Header />
      <div className="statistics-page">
        <h1>Статистика событий</h1>

        {/* Фильтр по категориям */}
        <div className="filter-container">
          <label htmlFor="categoryFilter">Выберите категорию:</label>
          <select
            id="categoryFilter"
            value={filteredCategory}
            onChange={(e) => setFilteredCategory(e.target.value)}
          >
            <option value="">
              Выберите категорию
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="yearFilter">Выберите год:</label>
          <select
            id="yearFilter"
            value={currentYear}
            onChange={(e) => setCurYear(e.target.value)}
          >
            <option value="">
              Выберите год
            </option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <Statistics statistics={statistics} months={months} year={currentYear} />
      </div>
      <Footer />
    </>
  );
};

export default StatisticsPage;
