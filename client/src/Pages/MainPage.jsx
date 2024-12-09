import { useState, useEffect } from 'react'
import axios from "axios"
import '@/styles/MainPage.css'
import EventContainer from '@/components/Main/EventsContainer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {useLocation} from "react-router-dom"

function MainPage() {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState({});
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const location = useLocation();

    useEffect(() => {
        if(page > lastPage) setPage(lastPage);
    },[lastPage])
    
    useEffect(() => {
        try {
            if(location.state){
                setFilter(location.state);
                location.state = null;
              }
            axios.get("http://localhost:8080/api/events", {params:{filter:filter, page:page}})
                .then(responce => {
                    const {total, page, pages,limit,events} = responce.data;
                    setEvents(events);
                    setPage(page);
                    setLastPage(pages);
                });
        }
        catch (err) {
            console.error('Помилка завантаження:', err);
        }
    }, [filter, page]);

    return <>
        <Header setFilter={setFilter} />
        <main>
            <EventContainer events={events} page={page} last={lastPage} setPage={setPage} />
        </main>
        <Footer />
    </>;
}

export default MainPage
