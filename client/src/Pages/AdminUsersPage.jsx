import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import UsersTable from '@/components/Admin/UsersTable';
import AdminTabs from '@/components/Admin/AdminTabs';
import SearchBar from '@/components/Admin/SearchBar';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import '@/styles/AdminUsers.css';

const AdminUsersPage = () => {
  useAuthCheck();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async (currentPage, search) => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/users/all', {
        params: { page: currentPage, search },
        withCredentials: true
      });
      const { users, pages: totalPages } = response.data;
      setUsers(users);
      setPages(totalPages);
    } catch (error) {
      console.error('Помилка отримання користувачів:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUsers(page, searchTerm);
  }, [fetchUsers, page, searchTerm]);

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

  const handleAddUser = () => {
    navigate('/admin/users/create');
  };

  return (
    <div>
      <Header />
      <AdminTabs />
      <div className="admin-users-container">
        <div className="admin-users-header">
          <h1>Управління користувачами</h1>
          <button onClick={handleAddUser} className="add-user-button">
            Додати нового користувача
          </button>
        </div>
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Пошук за ім'ям користувача..."
        />
        <UsersTable 
          users={users}
          page={page}
          pages={pages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AdminUsersPage; 