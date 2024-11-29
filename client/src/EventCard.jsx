import {useState} from 'react'

function EventCard({ event, onAttend }) {
    const [status, setStatus] = useState(null);

    const handleAttend = (status) => {
        setStatus(status);
        onAttend(event.id, status);
    };

    return (
        <div style={styles.card}>
            <h3>{event.title}</h3>
            <p>Дата: {event.date}</p>
            <p>Место: {event.location}</p>
            {status === null ? (
                <div>
                    <button onClick={() => handleAttend("Пойду")} style={styles.button}>
                        Пойду
                    </button>
                    <button onClick={() => handleAttend("Не пойду")} style={styles.button}>
                        Не пойду
                    </button>
                </div>
            ) : (
                <p>Ваш выбор: {status}</p>
            )}
        </div>
    );
}

export default EventCard;