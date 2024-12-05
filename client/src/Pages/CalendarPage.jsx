
import React from "react";
import EventCalendar from "@/components/Calendar/EventCalendar";
import "@/styles/EventCalendar.css"; // Стили для страницы с календарем

const CalendarPage = () => {
  
  return (
    <div className="calendar-page">
      <h1>Календарь событий</h1>
      <EventCalendar />
    </div>
  );
};

export default CalendarPage;
