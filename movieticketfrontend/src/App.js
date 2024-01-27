
import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './pages/Landingpage/LandingPage';
import SignupPage from './pages/Signuppage/SignupPage';
import LoginPage from './pages/Loginpage/LoginPage';
import Moviedetails from './pages/Moviedetails/Moviedetails';
import TheaterPage from './pages/Theaterpage/TheaterPage';
import Moviepage from './pages/Moviepage/Moviepage';
import PracticePage from './pages/PracticePage';
import DashboardPage from './pages/DashboardPage/Dashboard';
import TicketPlanPage from './pages/Ticketplanpage/TicketPlanPage';

function App() {
  return (
    <div>
     
      <Router>
        <Routes>
          <Route path="/home" element={<LandingPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/practice" element={<PracticePage/>} />
          <Route path="/details/:moviename" element={<Moviedetails/>} />
          <Route path="/theater/:moviename" element={<TheaterPage/>} />
          <Route path="/movies" element={<Moviepage/>} />
          <Route path="/booking/:theatername/:movie_time" element={<TicketPlanPage/>} />
         
       
          
        </Routes>
      </Router>
    </div>
  );
  };

export default App;
