import React, { useState, useEffect, useCallback } from 'react';
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
  const [pages, setPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = useCallback(async (currentPage, search) => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/events/admin', {
        params: { page: currentPage, search },
        withCredentials: true
      });
      const { events, pages: totalPages } = response.data;
      setEvents(events);
      setPages(totalPages);
    } catch (error) {
      console.error('Помилка отримання подій:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchEvents(page, searchTerm);
  }, [fetchEvents, page, searchTerm]);

  const handlePageChange = useCallback((newPage) => {
    if (!isLoading) {
      setPage(newPage);
    }
  }, [isLoading]);

  const handleSearch = (search) => {
    if (search !== searchTerm) {
      setSearchTerm(search);
      if (search || (!search && page > 1)) {
        setPage(1);
      }
    }
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
          pages={pages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AdminEventsPage; 