import React, { useState } from "react";
import EventCard from "./EventCard"; // Импортируем EventCard
import "@/styles/EventsContainer.css"; // Стили для контейнера

const EventsContainer = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 10;

  const startIndex = currentPage * eventsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + eventsPerPage);

  const handleNext = () => {
    if (startIndex + eventsPerPage < events.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  

  return (
    <div className="events-container">
      <h1>События</h1>
      <div className="events-list">
        {currentEvents.map((event) => (
          <EventCard data={event} />
        ))}
      </div>
      <div className="navigation">
        <button
          className="nav-button"
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          ← Назад
        </button>
        <button
          className="nav-button"
          onClick={handleNext}
          disabled={startIndex + eventsPerPage >= events.length}
        >
          Вперед →
        </button>
      </div>
    </div>
  );
};

export default EventsContainer;
