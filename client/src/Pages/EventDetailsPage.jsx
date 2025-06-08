import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "@/styles/EventDetailsPage.css";
import "@/styles/Universal.css";
import Modal from "@/components/Main/Modal";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";

const EventDetailsPage_old = () => {
  const [vote_count, setVoteCount] = useState(0);
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tempResponce, setTempResp] = useState(null);
  const location = useLocation();
  const event = location.state;
  const navigate = useNavigate();


  useEffect(() => {
    if (event) {
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
    }
  }, [event])

  if (!event) {
    return (
      <div className="event-details-page">
        <h1>Подію не знайдено</h1>
        <Link to="/" className="back-link">
          На головну
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
      _event: event._id,
      _user: userId,
    })
  }

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/"); // на головну
    }
  };

  return (
    <div className="event-details-page">
      <Header />
      <div className="event-container">
        <h1>{event.name}</h1>
        <p><strong>Опис:</strong> {event.describe}</p>
        <p><strong>Дата:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Категорія:</strong> {event.category}</p>

        <div className="attendees">
          <p><strong>Кількість гостей:</strong> {vote_count}</p>
        </div>

        {response ? (
          <div>
            <p>Ваш вибір: {response}</p>
          </div>
        ) : (
          <div>
            <button className="green_button vote-button" onClick={handleOpenModal} value={true}>
              Піду
            </button>
            <button className="green_button vote-button" onClick={handleOpenModal} value={false}>
              Не піду
            </button>
          </div>
        )}
        <div>
          <button className="green_button" onClick={goBack}>
            Повернутись на головну
          </button>
        </div>
      </div>

      {showModal && <Modal setShowModal={setShowModal} confirmResponse={confirmResponce} />}
      <Footer />
    </div>
  );
};

function EventDetailsPage() {
  const [vote_count, setVoteCount] = useState(0);
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tempResponce, setTempResp] = useState(null);
  const [attendees, setAttendees] = useState([])
  const location = useLocation();
  const event = location.state;
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const monthNames = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];
  const month = monthNames[eventDate.getMonth()];



  useEffect(() => {
    if (event) {
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
      axios.get('http://localhost:8080/api/votes/guests',{
        params:{
          id:event._id,
        }
      }).then(res => {
        console.log('guests:', res);
        setAttendees(res.data);
        setVoteCount(res.data.length);
        console.log('attendees count:', res.data.length)
      })
    }
  }, [event])

  if (!event) {
    return (
      <div className="event-details-page">
        <h1>Подію не знайдено</h1>
        <Link to="/" className="back-link">
          На головну
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
      _event: event._id,
      _user: userId,
    })
  }

  return (
    <div className="event-details-page">
      <Header />
      <div className="event-details-container">
        <div className="event-card">
          {/* Event Header */}
          <h1 className="event-details-title">{event.name+' '}
            <div className="event-date-card">
              <div>
                <div className="date-day">{day}</div>
                <div className="date-month">{month}</div>
              </div>
              <div className="date-vertical">{eventDate.getFullYear()}</div>
            </div>
          </h1>

          {/* Event Category */}
          <div className="event-category-container">
            <span className="event-category">{event.category}</span>
          </div>

          {/* Event Description */}
          <p className="event-description">{event.description}</p>

          {/* Attendees Section */}
          <div>
            <h2 className="event-info-title">Записано {vote_count}</h2>
            {attendees.length > 0 ? (<>
              <ul className="event-attendees-list">
                {attendees.map((attendee, index) => (
                  <li key={index}>{attendee.name}: {attendee.email}</li>
                ))}
              </ul></>
            ) : (
              <p className="event-info-text">No attendees yet.</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="event-actions">
            {response ? (
          <div>
            <p>Ваш вибір: {response}</p>
          </div>
        ) : (<>
            <button type="button" className="green_button vote-button" onClick={handleOpenModal} value={true}>
              Піду
            </button>
            <button type="button" className="green_button vote-button" onClick={handleOpenModal} value={false}>
              Не піду
            </button>
        </>)}
          </div>
        </div>
      </div>

      {showModal && <Modal setShowModal={setShowModal} confirmResponse={confirmResponce} />}
      <Footer />
    </div>
  );
}

export default EventDetailsPage;
