import axios from "axios"
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "@/styles/EventCalendar.css";

const EventCalendar = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [events, setEvents] = useState([]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await axios.get("http://localhost:8080/api/events/all")
          .then((responce) => {
            const data = responce.data;
            setEvents(data);
          });
      }
      catch (err) {
        console.error('Помилка завантаження даних:', err);
      }
    }
    fetchEvents();
  }, [])

  const handleMonthChange = (offset) => {
    const newDate = new Date(currentYear, currentMonth + offset, 1);
    setCurrentYear(newDate.getFullYear());
    setCurrentMonth(newDate.getMonth());
  };

  const getEventsForDay = (day) => {
    return events.filter((event) => {
      const eventDate = event.date;
      return (
        (new Date(eventDate)).getFullYear() === currentYear &&
        (new Date(eventDate)).getMonth() === currentMonth &&
        (new Date(eventDate)).getDate() === day
      );
    });
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)}>&lt;</button>
        <h2>
          {currentYear} - {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })}
        </h2>
        <button onClick={() => handleMonthChange(1)}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((day, index) => (
          <div key={index} className="calendar-day-header">
            {day}
          </div>
        ))}
        {Array.from({ length: startDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day empty"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, day) => {
          const dayNumber = day + 1;
          const dayEvents = getEventsForDay(dayNumber);
          const brightness = dayEvents.length * 20; // Яскравість

          return (
            <div
              key={dayNumber}
              className="calendar-day"
              style={{
                backgroundColor: `rgba(0, 128, 0, ${Math.min(brightness / 100, 1)})`,
              }}
            >
              <div className="day-number">{dayNumber}</div>
              {dayEvents.map((event, index) => (


                <Link  key={index} className="event-title" to={`/event/${event._id}`} state={event}>
                    <strong>{event.name}</strong>
                    <p>{event.category}</p>
                </Link>

              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
