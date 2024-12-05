import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddUserForm from "../components/Admin/AddUserForm";
import "../styles/AdminPage.css";

const AdminPage = ({ isAdmin }) => {
  const navigate = useNavigate();

  // Проверка доступа
  // if (!isAdmin) {
  //   return (
  //     <div className="admin-page">
  //       <h1>Доступ запрещен</h1>
  //       <button onClick={() => navigate("/")}>Вернуться на главную</button>
  //     </div>
  //   );
  // }

  // Форма для добавления событий
  const [newEvent, setNewEvent] = useState({
    name: "",
    describe: "",
    date: "",
    category: "",
  });

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = () => {
    console.log("Событие добавлено:", newEvent);
    // Здесь отправьте POST-запрос на сервер для добавления события
  };

  return (
    <div className="admin-page">
      <h1>Админская страница</h1>

      <section>
        <h2>Добавить событие</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="name"
            placeholder="Название события"
            value={newEvent.name}
            onChange={handleEventChange}
          />
          <textarea
            name="describe"
            placeholder="Описание события"
            value={newEvent.describe}
            onChange={handleEventChange}
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleEventChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Категория"
            value={newEvent.category}
            onChange={handleEventChange}
          />
          <button onClick={addEvent}>Добавить событие</button>
        </form>
      </section>

      <section>
        <h2>Ссылки для доступа к данным</h2>
        <button onClick={() => window.location.href = "http://localhost:8080/api/events"}>
          Данные о событиях
        </button>
        <button onClick={() => window.location.href = "http://localhost:8080/api/user"}>
          Данные о пользователях
        </button>
        <button onClick={() => window.location.href = "http://localhost:8080/api/vote"}>
          Данные о голосах
        </button>
      </section>

      <section>
        <AddUserForm/>
      </section>

      <section>
        <h2>Добавить голос</h2>
        {/* Аналогичная форма для добавления записи о голосе */}
      </section>
    </div>
  );
};

export default AdminPage;
