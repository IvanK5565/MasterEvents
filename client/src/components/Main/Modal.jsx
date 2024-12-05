import React, { useState, useEffect } from "react";
import axios from 'axios'
import "@/styles/EventCard.css"; // Обновленный путь к стилям

const Modal = ({ setShowModal, confirmResponse }) => {
    const [email, setEmail] = useState(""); // Состояние для email
    const [name, setName] = useState(""); // Состояние для имени
    const [isNewEmail, setIsNewEmail] = useState(false); // Состояние для проверки email

    const handleCloseModal = () => {
        setShowModal(false);
        setEmail("");
        setName("");
    };

    const handleEmailChange = async (e) => {
        setEmail(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async () => {
        if(!email) {
            setIsNewEmail(false);
            return;
        }
        await axios.get("http://localhost:8080/api/users", {
            params: {
                filter: {
                    email: email,
                }
            }
        })
            .then((res) => {
                if (res) {
                    handleCloseModal();
                    confirmResponse(res.data._id);
                }
            })
            .catch((err) => {
                setIsNewEmail(true);
                console.error(err);
            })
    };

    return (
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
                {isNewEmail && (
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
                    //disabled={!email || (!isNewEmail && !name)}
                    >
                        Подтвердить
                    </button>
                    <button className="button cancel-button" onClick={handleCloseModal}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
