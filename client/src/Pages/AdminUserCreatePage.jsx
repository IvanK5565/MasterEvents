import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import '@/styles/AdminUserCreate.css';

const AdminUserCreatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'guest', // Default role
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ім'я обов'язкове";
    }

    if (!formData.email) {
      newErrors.email = "Email обов'язковий";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email недійсний';
    }

    // Only validate password for admin role
    if (formData.role === 'admin') {
      if (!formData.password) {
        newErrors.password = "Пароль обов'язковий";
      } else if (formData.password.length < 6) {
        newErrors.password = 'Пароль має бути не менше 6 символів';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const dataToSend = {
        ...formData,
        password: formData.role === 'guest' ? null : formData.password,
      };

      await axios.post(
        'http://localhost:8080/api/users/store',
        dataToSend,
        { withCredentials: true }
      );
      navigate('/admin/users');
    } catch (error) {
      setServerError(error.response?.data?.message || 'Не вдалося створити користувача');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCancel = () => {
    navigate('/admin/users');
  };

  return (
    <div>
      <Header />
      <div className="admin-user-create-container">
        <div className="admin-user-create-card">
          <h1>Створити нового користувача</h1>
          {serverError && (
            <div className="error-message">{serverError}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Ім'я</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && (
                <span className="error-text">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="role">Роль</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={errors.role ? 'error' : ''}
              >
                <option value="">Оберіть роль</option>
                <option value="user">Користувач</option>
                <option value="admin">Адміністратор</option>
              </select>
              {errors.role && (
                <span className="error-text">{errors.role}</span>
              )}
            </div>

            {formData.role === 'admin' && (
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>
            )}

            <div className="button-group">
              <button type="submit" className="submit-button">
                Створити
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Скасувати
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUserCreatePage; 