import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import '@/styles/AdminEventCreate.css';

const AdminEventCreatePage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    describe: '',
    date: '',
    time: '',
    category: '',
    venue: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Помилка отримання категорій:', error);
      }
    };

    fetchCategories();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Назва події обов\'язкова';
    }

    if (!formData.describe.trim()) {
      newErrors.describe = 'Опис події обов\'язковий';
    }

    if (!formData.date) {
      newErrors.date = 'Дата обов\'язкова';
    }

    if (!formData.time) {
      newErrors.time = 'Час обов\'язковий';
    }

    if (!formData.category) {
      newErrors.category = 'Категорія обов\'язкова';
    }

    if (!formData.venue.trim()) {
      newErrors.venue = 'Місце проведення обов\'язкове';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Combine date and time
      const dateTime = new Date(formData.date + 'T' + formData.time);

      const eventData = {
        name: formData.name,
        describe: formData.describe,
        date: dateTime,
        category: formData.category,
        venue: formData.venue
      };

      await axios.post(
        'http://localhost:8080/api/events',
        eventData,
        { withCredentials: true }
      );
      navigate('/admin/events');
    } catch (error) {
      setServerError(error.response?.data?.message || 'Помилка створення події');
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

  return (
    <div>
      <Header />
      <div className="admin-event-create-container">
        <div className="admin-event-create-card">
          <h1>Створити нову подію</h1>
          {serverError && (
            <div className="error-message">{serverError}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Назва</label>
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
              <label htmlFor="describe">Опис</label>
              <textarea
                id="describe"
                name="describe"
                value={formData.describe}
                onChange={handleChange}
                className={errors.describe ? 'error' : ''}
              />
              {errors.describe && (
                <span className="error-text">{errors.describe}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="venue">Місце проведення</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className={errors.venue ? 'error' : ''}
              />
              {errors.venue && (
                <span className="error-text">{errors.venue}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="date">Дата</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && (
                <span className="error-text">{errors.date}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="time">Час</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={errors.time ? 'error' : ''}
              />
              {errors.time && (
                <span className="error-text">{errors.time}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="category">Категорія</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={errors.category ? 'error' : ''}
              >
                <option value="">Оберіть категорію</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="error-text">{errors.category}</span>
              )}
            </div>

            <div className="button-group">
              <button type="submit" className="submit-button">
                Створити подію
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/events')}
                className="cancel-button"
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

export default AdminEventCreatePage; 