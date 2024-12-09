import React, { useState, useEffect } from "react";
import axios from 'axios'
import "@/styles/EventCard.css"; // Обновленный путь к стилям
import { Link } from 'react-router-dom';
import Modal from "./Modal";

const EventCard = ({ data }) => {
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [vote_count, setVoteCount] = useState(0);
  const [tempResponce, setTempResp] = useState(null);

  const category = data.category;
  const id = data._id;
  const eventName = data.name;
  const eventDate = data.date;

  const handleOpenModal = (v) => {
    setShowModal(true);
    setTempResp(v.target.value);
  }
  const confirmResponce = (user) => {
    setResponse(tempResponce);
    axios.post("http://localhost:8080/api/votes", {
      vote: tempResponce,
      event: data,
      user: user,
    })
  }

  useEffect(() => {
    axios.get("http://localhost:8080/api/votes/count", {
      params:
      {
        id: id,
        vote: true
      }
    })
      .then((res) => {
        setVoteCount(res.data);
      });
  }, [])

  return (
    <div className="event-card">
      <h3 className="event-name">{eventName}</h3>
      <p className="event-date">Дата: {eventDate}</p>
      <p className="event-id">Категорія: {category}</p>
      <p className="event-id">Записались: {vote_count}</p>
      <Link className="button" to={`/event/${id}`} state={data}>Детальніше</Link>

      {response ? (
        <div>
          <p>Ваш вибір: {response}</p>
        </div>
      ) : (
        <div>
          <button className="button vote-button" onClick={handleOpenModal} value={true}>
            Піду
          </button>
          <button className="button vote-button" onClick={handleOpenModal} value={false}>
            Не піду
          </button>
        </div>
      )}

      {showModal && <Modal setShowModal={setShowModal} confirmResponse={confirmResponce} />}
    </div>
  );
};

export default EventCard;
