import React, { useState } from "react";
import "@/styles/AddUserForm.css";

const AddUserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "Имя обязательно.";
    if (!formData.lastname) newErrors.lastname = "Фамилия обязательна.";
    if (!formData.email) {
      newErrors.email = "Email обязателен.";
    } else if (!/^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Некорректный формат email.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ firstname: "", lastname: "", email: "" });
    }
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <h2>Добавить пользователя</h2>
      <div className="form-group">
        <label htmlFor="firstname">Имя:</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="Введите имя"
        />
        {errors.firstname && <span className="error">{errors.firstname}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="lastname">Фамилия:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Введите фамилию"
        />
        {errors.lastname && <span className="error">{errors.lastname}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Введите email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddUserForm;
