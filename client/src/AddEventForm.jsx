import React, { useState } from 'react';
import axios from 'axios';

const AddEventForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    async function handleSubmit(e) {
        e.preventDefault();

        console.log(formData);

        try {
            await axios.post('http://localhost:8080/api/events', formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            // Очистить форму после успешной отправки
            setFormData({ name: '', description: '', date: '', category: '' });
            console.log("Event added");
        }
        catch (error) {
            console.error('Ошибка при добавлении события:', error);
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Название:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Описание:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div>
                <label>Дата:</label>
                <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Категория:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Добавить событие</button>
        </form>
    );
};

export default AddEventForm;
