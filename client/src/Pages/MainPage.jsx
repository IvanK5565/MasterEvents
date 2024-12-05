import { useState, useEffect } from 'react'
import axios from "axios"
import '@/styles/MainPage.css'
import EventContainer from '@/components/Main/EventsContainer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Link } from "react-router-dom";

function MainPage() {
    const [events, setEvents] = useState([]);
    const [votes, setVotes] = useState([]);
    const [filter, setFilter] = useState({});

    useEffect(() => {
        try {
            axios.get("http://localhost:8080/api/events")
                .then(responce => setEvents(responce.data.data));
            axios.get("http://localhost:8080/api/votes")
                .then(responce => setVotes(responce.data.data));
        }
        catch (err) {
            console.error('Ошибка при загрузке данных:', err);
        }
    }, []);
    // console.log(events);

    return <>
        <Header setFilter={setFilter} />
        <main>
            <Link to="/calendar" className="button" state={events}>
                Открыть календарь событий
            </Link>
            <Link to="/statistics" className="button">
                Открыть статистику
            </Link>
            <EventContainer events={events} votes={votes} filter={filter} />
        </main>
        <Footer />
    </>;
}

export default MainPage