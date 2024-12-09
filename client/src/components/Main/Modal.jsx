import React, { useState, useEffect } from "react";
import axios from 'axios'
import "@/styles/EventCard.css";

const Modal = ({ setShowModal, confirmResponse }) => {
    const [email, setEmail] = useState(""); 
    const [name, setName] = useState("");
    const [isNewEmail, setIsNewEmail] = useState(false); 

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
        if (!email) {
            setIsNewEmail(false);
            return;
        }
        if (isNewEmail) {
            if (!name) {
                return;
            }
            await axios.post("http://localhost:8080/api/users", {
                email: email,
                name: name
            }).then((res) => {
                if (res) {
                    handleCloseModal();
                    confirmResponse(res.data);
                }
            })
            .catch((err) => {
                console.error("Помилка запису:" + err);
            })
        }
        else {

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
                        confirmResponse(res.data);
                    }
                })
                .catch((err) => {
                    setIsNewEmail(true);
                    console.error("Помилка запису:" + err);
                })
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Внесіть ваші дані</h3>
                <input
                    type="email"
                    placeholder="Введіть email"
                    value={email}
                    onChange={handleEmailChange}
                    className="modal-input"
                />
                {isNewEmail && (
                    <input
                        type="text"
                        placeholder="Введіть ім'я"
                        value={name}
                        onChange={handleNameChange}
                        className="modal-input"
                    />
                )}
                <div className="modal-buttons">
                    <button
                        className="button submit-button"
                        onClick={handleSubmit}
                    >
                        Підтвердити
                    </button>
                    <button className="button cancel-button" onClick={handleCloseModal}>
                        Повернутись
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
