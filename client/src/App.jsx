import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import CalendarPage from "./Pages/CalendarPage";
import StatisticsPage from "./Pages/StatisticsPage";
import EventDetailsPage from "./Pages/EventDetailsPage";

const events = [
    {
      id: '1',
      name: "Событие 1",
      describe: "Описание 1",
      date: new Date(2024, 0, 15), // Январь
      category: "Спорт",
      attendeesYes: 50,
      attendeesNo: 20,
    },
    {
      id: '2',
      name: "Событие 2",
      describe: "Описание 2",
      date: new Date(2024, 1, 10), // Февраль
      category: "Музыка",
      attendeesYes: 30,
      attendeesNo: 15,
    },
    // Добавьте больше событий
  ];
   
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/statistics" element={<StatisticsPage events={events} />} />
        <Route path="/event/:id" element={<EventDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
