
import React from "react";
import EventCalendar from "@/components/Calendar/EventCalendar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "@/styles/EventCalendar.css"; // Стили для страницы с календарем

const CalendarPage = () => {
  
  return (
    <div className="calendar-page">
      <Header/>
      <h1>Календарь событий</h1>
      <EventCalendar />
      <Footer/>
    </div>
  );
};

export default CalendarPage;
