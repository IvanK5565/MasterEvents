import React from 'react';
import '@/styles/AdminEvents.css';

const EventsTable = ({ events, page, pages, onPageChange }) => {
  const handleNext = () => {
    onPageChange(page + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlePrevious = () => {
    onPageChange(page - 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="events-table-wrapper">
      <div className="events-table-container">
        <table className="events-table">
          <thead>
            <tr>
              <th>Назва</th>
              <th>Опис</th>
              <th>Категорія</th>
              <th>Дата</th>
              <th>Створено</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>{event.category?.name || 'Без категорії'}</td>
                <td>{new Date(event.date).toLocaleString('uk-UA')}</td>
                <td>{new Date(event.createdAt).toLocaleDateString('uk-UA')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="navigation">
        <button
          className="nav-button"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          ← Попередня
        </button>
        <p>Сторінка {page} з {pages}</p>
        <button
          className="nav-button"
          onClick={handleNext}
          disabled={page === pages}
        >
          Наступна →
        </button>
      </div>
    </div>
  );
};

export default EventsTable; 