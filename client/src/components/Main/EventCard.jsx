import React, { useState, useEffect } from "react";
import axios from 'axios'
import "@/styles/EventCard.css"; // Обновленный путь к стилям
import "@/styles/Universal.css"; // Обновленный путь к стилям
import { Link, useNavigate } from 'react-router-dom';
import Modal from "./Modal";

const EventCard = ({ data }) => {
  const [userVote, setUserVote] = useState(null);
  const [voteCount, setVoteCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tempResponce, setTempResp] = useState(null);
  const navigate = useNavigate();

  const category = data.category;
  const id = data._id;
  const eventName = data.name;
  const eventDate = new Date(data.date).toLocaleString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Fetch initial vote count and user's vote status
  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        // Get total vote count
        const countResponse = await axios.get("http://localhost:8080/api/votes/count", {
          params: { id: id, vote: true }
        });
        setVoteCount(countResponse.data);

        // Get user's vote status if logged in
        const user = localStorage.getItem('user');
        if (user) {
          const voteResponse = await axios.get("http://localhost:8080/api/votes/user-vote", {
            params: { eventId: id },
            withCredentials: true
          });
          setUserVote(voteResponse.data?.vote);
        }
      } catch (error) {
        console.error('Error fetching vote data:', error);
      }
    };

    fetchVoteData();
  }, [id]);

  const handleVote = async (vote) => {
    try {
      setIsLoading(true);
      const user = localStorage.getItem('user');
      
      if (!user) {
        navigate('/login'); // Redirect to the main login page
        return;
      }

      // If user already voted "Піду" and clicks "Не піду", remove the vote
      if (userVote === true && vote === false) {
        await axios.delete("http://localhost:8080/api/votes", {
          params: { eventId: id },
          withCredentials: true
        });
        setUserVote(null);
        setVoteCount(prev => prev - 1);
      } else {
        // Create or update vote
        await axios.post("http://localhost:8080/api/votes", {
          vote: vote,
          eventId: id
        }, {
          withCredentials: true
        });
        setUserVote(vote);
        if (vote) {
          setVoteCount(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Error handling vote:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (v) => {
    setShowModal(true);
    setTempResp(v.target.value);
  }
  const confirmResponce = (user) => {
    setUserVote(tempResponce);
    setVoteCount(prev => tempResponce ? prev + 1 : prev - 1);
  }

  return (
    <div className="event-card">
      <h3 className="event-name">{eventName}</h3>
      <p className="event-date">{eventDate}</p>
      <p className="event-id">Категорія: {category}</p>
      <p className="event-id">Місце проведення: {data.venue}</p>
      <p className="event-id">Записались: {voteCount}</p>

      <div className="event-buttons">
        {localStorage.getItem('user') && (
          userVote === true ? (
            <button 
              className="action-button red vote-button" 
              onClick={() => handleVote(false)}
              disabled={isLoading}
            >
              <span>Не піду</span>
            </button>
          ) : (
            <button 
              className="action-button green vote-button" 
              onClick={() => handleVote(true)}
              disabled={isLoading}
            >
              <span>Піду</span>
            </button>
          )
        )}
        <Link className="green_button" to={`/event/${id}`} state={data}>
          Детальніше
        </Link>
      </div>

      {showModal && <Modal setShowModal={setShowModal} confirmResponse={confirmResponce} />}
    </div>
  );
};

export default EventCard;
