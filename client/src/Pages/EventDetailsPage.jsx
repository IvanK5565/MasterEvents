import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "@/styles/EventDetailsPage.css";
import Modal from "@/components/Main/Modal";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";

const EventDetailsPage = () => {
  const [vote_count, setVoteCount] = useState(0);
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tempResponce, setTempResp] = useState(null);
  const location = useLocation();
  const event = location.state;
  const navigate = useNavigate();


  if (!event) {
    return (
      <div className="event-details-page">
        <h1>Событие не найдено</h1>
        <Link to="/" className="back-link">
          Вернуться на главную страницу
        </Link>
      </div>
    );
  }

  const handleOpenModal = (v) => {
    setShowModal(true);
    setTempResp(v.target.value);
  }
  const confirmResponce = (userId) => {
    setResponse(tempResponce);
    axios.post("http://localhost:8080/api/votes", {
      _vote: tempResponce,
      _event: id,
      _user: userId,
    })
  }

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/"); // Перенаправление на главную, если истории нет
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/votes/count", {
      params:
      {
        id: event._id,
        vote: true
      }
    })
      .then((res) => {
        setVoteCount(res.data);
        console.log(res.data);
      });

  }, [])

  return (
    <div className="event-details-page">
      <Header/>
      <h1>{event.name}</h1>
      <p><strong>Описание:</strong> {event.describe}</p>
      <p><strong>Дата:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Категория:</strong> {event.category}</p>

      <div className="attendees">
        <p><strong>Количество гостей:</strong> {vote_count}</p>
      </div>

      {response ? (
        <div>
          <p>Ваш выбор: {response}</p>
        </div>
      ) : (
        <div>
          <button className="button vote-button" onClick={handleOpenModal} value={true}>
            Пойду
          </button>
          <button className="button vote-button" onClick={handleOpenModal} value={false}>
            Не пойду
          </button>
        </div>
      )}
      
      {showModal && <Modal setShowModal={setShowModal} confirmResponse={confirmResponce} />}

      <div className="buttons">
        <button onClick={goBack} className="back-link">
          Вернуться на главную страницу
        </button>
      </div>
      <Footer/>
    </div>
  );
};

export default EventDetailsPage;
