
import React from "react";
import EventCalendar from "@/components/Calendar/EventCalendar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/EventCalendar.css";

const CalendarPage = () => {
  
  return (
    <div className="calendar-page">
      <Header/>
      <h1>Календар подій</h1>
      <EventCalendar />
      <Footer/>
    </div>
  );
};

export default CalendarPage;
