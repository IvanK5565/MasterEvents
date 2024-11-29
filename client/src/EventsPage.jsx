import React, { useState, useEffect } from 'react';
import axios from 'axios'

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async() => {
        try{
            await axios.get("http://localhost:8080/api/events")
            .then((responce)=>{
                const data = responce.data.data;
                setEvents(data);
            });
        }
        catch(err){
            console.error('Ошибка при загрузке событий:', error);
        }
        finally{
            setLoading(false);
        }
    }
    fetchEvents();
  }, []);
  console.log(events);
  if (loading) {
    return <p>Загрузка событий...</p>;
  }

  return (
    <div>
      <h1>События</h1>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <h2>{event.name}</h2>
              <p>{event.description}</p>
              <p>Дата: {new Date(event.date).toLocaleDateString()}</p>
              <p>Категория: {event.category || 'Без категории'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>События отсутствуют.</p>
      )}
    </div>
  );
};

export default EventsPage;
