import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import UsersTable from '@/components/Admin/UsersTable';
import '@/styles/AdminUsers.css';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/all', {
          params: { page },
          withCredentials: true
        });
        const { users, pages, page: currentPage } = response.data;
        setUsers(users);
        setPage(currentPage);
        setLastPage(pages);
      } catch (error) {
        console.error('Error fetching users:', error);
        // If unauthorized, redirect to login
        if (error.response?.status === 401) {
          navigate('/admin/login');
        }
      }
    };

    fetchUsers();
  }, [navigate, page]);

  const handleAddUser = () => {
    navigate('/admin/users/create');
  };

  return (
    <div>
      <Header />
      <div className="admin-users-container">
        <div className="admin-users-header">
          <h1>User Management</h1>
          <button onClick={handleAddUser} className="add-user-button">
            Add New User
          </button>
        </div>
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