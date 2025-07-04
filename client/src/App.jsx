import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import CalendarPage from "./Pages/CalendarPage";
import StatisticsPage from "./Pages/StatisticsPage";
import EventDetailsPage from "./Pages/EventDetailsPage";
import AdminLogin from "./Pages/AdminLogin";
import AdminUsersPage from "./Pages/AdminUsersPage";
import AdminEventsPage from "./Pages/AdminEventsPage";
import AdminUserCreatePage from "./Pages/AdminUserCreatePage";
import AdminEventCreatePage from "./Pages/AdminEventCreatePage";
import ProtectedLoginRoute from "./components/ProtectedLoginRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

const events = [
    {
      id: '1',
      name: "Событие 1",
      describe: "Описание 1",
      date: new Date(2024, 0, 15), // Январь
      category: "Спорт",
      attendeesYes: 50,
      attendeesNo: 20,
    },
    {
      id: '2',
      name: "Событие 2",
      describe: "Описание 2",
      date: new Date(2024, 1, 10), // Февраль
      category: "Музыка",
      attendeesYes: 30,
      attendeesNo: 15,
    },
    // Добавьте больше событий
  ];
   
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route 
          path="/statistics" 
          element={
            <ProtectedAdminRoute>
              <StatisticsPage events={events} />
            </ProtectedAdminRoute>
          } 
        />
        <Route path="/event/:id" element={<EventDetailsPage />} />
        <Route 
          path="/admin/login" 
          element={
            <ProtectedLoginRoute>
              <AdminLogin />
            </ProtectedLoginRoute>
          } 
        />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/events" element={<AdminEventsPage />} />
        <Route path="/admin/users/create" element={<AdminUserCreatePage />} />
        <Route path="/admin/events/create" element={<AdminEventCreatePage />} />
      </Routes>
    </Router>
  );
};

export default App;
