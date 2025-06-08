import React from 'react';
import '@/styles/AdminUsers.css';

const UsersTable = ({ users, page, pages, onPageChange }) => {
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
    <div className="users-table-wrapper">
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Ім'я</th>
              <th>Електронна пошта</th>
              <th>Роль</th>
              <th>Дата створення</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleDateString('uk-UA')}</td>
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

export default UsersTable; 