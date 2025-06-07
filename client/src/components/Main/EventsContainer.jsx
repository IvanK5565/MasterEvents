import React, { useState } from "react";
import EventCard from "./EventCard";
import "@/styles/EventsContainer.css";

const EventsContainer = ({ events, page, last, setPage }) => {
    const ScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // плавная прокрутка
      });
    };
  const handleNext = () => {
      setPage(page + 1);
      ScrollToTop();
  };

  const handlePrevious = () => {
      setPage(page - 1);
      ScrollToTop();
  };

  

  return (
    <div className="events-container">
      <h1>Події</h1>
      <div className="events-list">
        {events.map((event, i) => (
          <EventCard key={i} data={event} />
        ))}
      </div>
      <div className="navigation">
        <button
          className="nav-button"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          ← Назад
        </button>
        <p> {page} </p>
        <button
          className="nav-button"
          onClick={handleNext}
          disabled={page === last}
        >
          Уперед →
        </button>
      </div>
    </div>
  );
};

export default EventsContainer;
