import { useState, useEffect } from 'react'
import axios from "axios"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EventsPage from './EventsPage'; // Компонент для отображения списка событий
import AddEventForm from './AddEventForm'; // Компонент для добавления нового события

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>События</h1>
      <div style={{ marginBottom: '40px' }}>
        <h2>Добавить новое событие</h2>
        <AddEventForm />
      </div>
      <div>
        <h2>Список событий</h2>
        <EventsPage />
      </div>
    </div>
  );
}

export default App
