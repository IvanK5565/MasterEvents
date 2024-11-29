import { useState, useEffect } from 'react'
import axios from "axios"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EventsPage from './EventsPage'; // Компонент для отображения списка событий
import AddEventForm from './AddEventForm'; // Компонент для добавления нового события
import EventContainer from '../components/EventsContainer'
import Header from '../components/Header'
import Footer from '../components/Footer'

function App() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                await axios.get("http://localhost:8080/api/events")
                    .then((responce) => {
                        const data = responce.data.data;
                        setEvents(data);
                    });
            }
            catch (err) {
                console.error('Ошибка при загрузке событий:', error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);
    console.log(events);
    if (loading) {
        return <p>Загрузка событий...</p>;
    }

    return <>
        <Header />
        <EventContainer events={events} />
        <Footer />
    </>;
}

export default App
