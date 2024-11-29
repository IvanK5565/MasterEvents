import React, { useState } from "react";
import "../styles/EventCard.css"; // Обновленный путь к стилям

const EventCard = ({ id, eventName, eventDate }) => {
  const [response, setResponse] = useState(null); // Состояние для выбора ответа
  const [showModal, setShowModal] = useState(false); // Состояние для модального окна
  const [email, setEmail] = useState(""); // Состояние для email
  const [name, setName] = useState(""); // Состояние для имени
  const [isExistingEmail, setIsExistingEmail] = useState(false); // Состояние для проверки email
  const existingEmails = ["test@example.com", "user@example.com"]; // Список существующих email

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setEmail("");
    setName("");
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (existingEmails.includes(value)) {
      setIsExistingEmail(true);
      setTimeout(() => {
        handleCloseModal();
        setResponse("Пойду");
      }, 500);
    } else {
      setIsExistingEmail(false);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCancel = () => {
    setResponse(null);
  };

  const handleSubmit = () => {
    setResponse("Пойду");
    handleCloseModal();
  };

  return (
    <div className="event-card">
      <h3 className="event-name">{eventName}</h3>
      <p className="event-date">Дата: {eventDate}</p>
      <p className="event-id">ID события: {id}</p>

      {response ? (
        <div>
          <p>Ваш выбор: {response}</p>
          <button className="button cancel-button" onClick={handleCancel}>
            Отменить
          </button>
        </div>
      ) : (
        <button className="button vote-button" onClick={handleOpenModal}>
          Голосовать
        </button>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Введите ваши данные</h3>
            <input
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={handleEmailChange}
              className="modal-input"
            />
            {!isExistingEmail && email && (
              <input
                type="text"
                placeholder="Введите имя"
                value={name}
                onChange={handleNameChange}
                className="modal-input"
              />
            )}
            <div className="modal-buttons">
              <button
                className="button submit-button"
                onClick={handleSubmit}
                disabled={!email || (!isExistingEmail && !name)}
              >
                Подтвердить
              </button>
              <button className="button cancel-button" onClick={handleCloseModal}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
