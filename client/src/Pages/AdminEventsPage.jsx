import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import EventsTable from '@/components/Admin/EventsTable';
import AdminTabs from '@/components/Admin/AdminTabs';
import SearchBar from '@/components/Admin/SearchBar';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import '@/styles/AdminEvents.css';

const AdminEventsPage = () => {
  useAuthCheck();
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchEvents = async (currentPage, search) => {
    try {
      const response = await axios.get('http://localhost:8080/api/events/admin', {
        params: { page: currentPage, search },
        withCredentials: true
      });
      const { events, pages, page: responsePage } = response.data;
      setEvents(events);
      setPage(responsePage);
      setLastPage(pages);
    } catch (error) {
      console.error('Помилка отримання подій:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  useEffect(() => {
    fetchEvents(page, searchTerm);
  }, [navigate, page, searchTerm]);

  const handleSearch = (search) => {
    setSearchTerm(search);
    setPage(1); // Reset to first page when searching
  };

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
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Пошук за назвою події..."
        />
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