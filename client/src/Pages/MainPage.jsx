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
  if(location.state){
    console.log("  ===  = = = == " + location.state);
    setFilter(location.state);
  }

    useEffect(() => {
        console.log("useEffect main " + filter.category)
        try {
            axios.get("http://localhost:8080/api/events", {params:{filter:filter, page:page}})
                .then(responce => {
                    const {total, page, pages,limit,events} = responce.data;
                    setEvents(events);
                    setPage(page);
                    setLastPage(pages);
                });
        }
        catch (err) {
            console.error('Ошибка при загрузке данных:', err);
        }
    }, [filter, page]);
    // console.log(events);

    return <>
        <Header setFilter={setFilter} />
        <main>
            <EventContainer events={events} page={page} last={lastPage} setPage={setPage} />
        </main>
        <Footer />
    </>;
}

export default MainPage
