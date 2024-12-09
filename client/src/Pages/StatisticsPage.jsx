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

  useEffect(() => {
    try {
      axios.get("http://localhost:8080/api/events/all")
        .then(responce => setEvents(responce.data));
    }
    catch (err) {
      console.error('Помилка завантаження:', err);
    }
  },[])

  useEffect(() => {
    try {
      axios.get("http://localhost:8080/api/categories")
        .then(responce => setCategories(responce.data));
      axios.get("http://localhost:8080/api/votes")
        .then(responce => setVotes(responce.data));
    }
    catch (err) {
      console.error('Помилка завантаження:', err);
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

      const month = new Date(event.date).getMonth(); // (0-11)
      monthlyStats[month].totalEvents += 1;
      monthlyStats[month].attendeesYes += votes.filter(vote => vote.vote == true && vote.event_id == event._id).length || 0;
      monthlyStats[month].attendeesNo += votes.filter(vote => vote.vote == false && vote.event_id == event._id).length || 0;

      console.log(votes);

      const rawYears = events.map((e) => new Date(e.date).getFullYear());

      setYears(rawYears.filter((value, index, array) => {
        return array.indexOf(value) === index;
      }))
    });

    setStatistics(monthlyStats);
  }, [events, filteredCategory, currentYear]);


  return (
    <>
      <Header />
      <div className="statistics-page">
        <h1>Статистика подій</h1>

        {/* Фільтрація по категоріям */}
        <div className="filter-container">
          <label htmlFor="categoryFilter">Оберіть категорію:</label>
          <select
            id="categoryFilter"
            value={filteredCategory}
            onChange={(e) => setFilteredCategory(e.target.value)}
          >
            <option value="">
              Оберіть категорію
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="yearFilter">Оберіть рік:</label>
          <select
            id="yearFilter"
            value={currentYear}
            onChange={(e) => setCurYear(e.target.value)}
          >
            <option value="">
              Оберіть рік
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
