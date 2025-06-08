import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "@/styles/EventDetailsPage.css";
import "@/styles/Universal.css";
import Modal from "@/components/Main/Modal";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";

function EventDetailsPage() {
  const [vote_count, setVoteCount] = useState(0);
  const [userVote, setUserVote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state;
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const monthNames = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];
  const month = monthNames[eventDate.getMonth()];

  useEffect(() => {
    const fetchData = async () => {
      if (event) {
        try {
          // Get total vote count and attendees
          const attendeesResponse = await axios.get('http://localhost:8080/api/votes/guests', {
            params: { id: event._id }
          });

          setAttendees(attendeesResponse.data);
          setVoteCount(attendeesResponse.data.length);

          // Get user's vote status if logged in
          const user = localStorage.getItem('user');
          if (user) {
            const voteResponse = await axios.get("http://localhost:8080/api/votes/user-vote", {
              params: { eventId: event._id },
              withCredentials: true
            });
            setUserVote(voteResponse.data?.vote);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [event]);

  const handleVote = async (vote) => {
    try {
      setIsLoading(true);
      const user = localStorage.getItem('user');
      
      if (!user) {
        navigate('/login');
        return;
      }

      const userData = JSON.parse(user);

      if (userVote === true && vote === false) {
        // Remove vote
        await axios.delete("http://localhost:8080/api/votes", {
          params: { eventId: event._id },
          withCredentials: true
        });
        setUserVote(null);
        
        // Fetch updated attendees list
        const attendeesResponse = await axios.get('http://localhost:8080/api/votes/guests', {
          params: { id: event._id }
        });
        setAttendees(attendeesResponse.data);
        setVoteCount(attendeesResponse.data.length);
      } else {
        // Create or update vote
        await axios.post("http://localhost:8080/api/votes", {
          vote: vote,
          eventId: event._id
        }, {
          withCredentials: true
        });
        setUserVote(vote);
        
        if (vote) {
          // Fetch updated attendees list
          const attendeesResponse = await axios.get('http://localhost:8080/api/votes/guests', {
            params: { id: event._id }
          });
          setAttendees(attendeesResponse.data);
          setVoteCount(attendeesResponse.data.length);
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

  return (
    <div className="event-details-page">
      <Header />
      <div className="event-details-container">
        <div className="event-details-card">
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

          {/* Event Venue */}
          <div className="event-venue-container">
            <h2 className="event-info-title">Місце проведення</h2>
            <p className="event-venue">{event.venue}</p>
          </div>

          {/* Event Description */}
          <p className="event-description">{event.describe}</p>

          {/* Attendees Section */}
          <div className="attendees-section">
            <h2 className="event-info-title">
              <span className="attendees-icon">👥</span>
              Записані учасники ({vote_count})
            </h2>
            {attendees.length > 0 ? (
              <div className="attendees-list">
                {attendees.map((attendee, index) => (
                  <div key={index} className="attendee-card">
                    <div className="attendee-avatar">
                      {attendee.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="attendee-info">
                      <span className="attendee-name">{attendee.name}</span>
                      <span className="attendee-email">{attendee.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-attendees">Поки що ніхто не записався на цю подію</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="event-actions">
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EventDetailsPage;
