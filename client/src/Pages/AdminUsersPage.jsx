import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import UsersTable from '@/components/Admin/UsersTable';
import AdminTabs from '@/components/Admin/AdminTabs';
import SearchBar from '@/components/Admin/SearchBar';
import '@/styles/AdminUsers.css';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async (currentPage, search) => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/all', {
        params: { page: currentPage, search },
        withCredentials: true
      });
      const { users, pages, page: responsePage } = response.data;
      setUsers(users);
      setPage(responsePage);
      setLastPage(pages);
    } catch (error) {
      console.error('Помилка отримання користувачів:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  useEffect(() => {
    fetchUsers(page, searchTerm);
  }, [navigate, page, searchTerm]);

  const handleSearch = (search) => {
    setSearchTerm(search);
    setPage(1); // Reset to first page when searching
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
          lastPage={lastPage}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default AdminUsersPage; 