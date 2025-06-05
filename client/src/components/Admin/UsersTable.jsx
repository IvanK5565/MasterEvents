import React from 'react';
import '@/styles/AdminUsers.css';

const UsersTable = ({ users, page, lastPage, setPage }) => {
  const handleNext = () => {
    setPage(page + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlePrevious = () => {
    setPage(page - 1);
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
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
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
          ← Previous
        </button>
        <p>Page {page} of {lastPage}</p>
        <button
          className="nav-button"
          onClick={handleNext}
          disabled={page === lastPage}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default UsersTable; 