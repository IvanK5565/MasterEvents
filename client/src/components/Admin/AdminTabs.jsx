import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '@/styles/AdminTabs.css';

const AdminTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define tabs - easy to extend by adding new items
  const tabs = [
    { path: '/admin/users', label: 'Користувачі' },
    { path: '/admin/events', label: 'Події' },
    // Add new tabs here in the future
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-tabs">
      <div className="admin-tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            className={`admin-tab ${isActive(tab.path) ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminTabs; 