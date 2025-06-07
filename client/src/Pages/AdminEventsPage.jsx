import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import EventsTable from '@/components/Admin/EventsTable';
import AdminTabs from '@/components/Admin/AdminTabs';
import '@/styles/AdminEvents.css';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events/admin', {
          params: { page },
          withCredentials: true
        });
        const { events, pages, page: currentPage } = response.data;
        setEvents(events);
        setPage(currentPage);
        setLastPage(pages);
      } catch (error) {
        console.error('Помилка отримання подій:', error);
        if (error.response?.status === 401) {
          navigate('/admin/login');
        }
      }
    };

    fetchEvents();
  }, [navigate, page]);

  const handleAddEvent = () => {
    navigate('/admin/events/create');
  };

  return (
    <div>
      <Header />
      <AdminTabs />
      <div className="admin-events-container">
        <div className="admin-events-header">
          <h1>Управління подіями</h1>
          <button onClick={handleAddEvent} className="add-event-button">
            Додати нову подію
          </button>
        </div>
        <EventsTable 
          events={events}
          page={page}
          lastPage={lastPage}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default AdminEventsPage; 