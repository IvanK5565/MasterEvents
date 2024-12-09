import React, { useState } from "react";
import EventCard from "./EventCard";
import "@/styles/EventsContainer.css";

const EventsContainer = ({ events, page, last, setPage }) => {

  const handleNext = () => {
      setPage(page + 1);
  };

  const handlePrevious = () => {
      setPage(page - 1);
  };

  

  return (
    <div className="events-container">
      <h1>Події</h1>
      <div className="events-list">
        {events.map((event) => (
          <EventCard data={event} />
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
