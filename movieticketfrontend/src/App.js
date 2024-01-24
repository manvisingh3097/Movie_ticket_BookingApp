
import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Moviedetails from './pages/Moviedetails';
import TheaterPage from './pages/TheaterPage';
import Moviepage from './pages/Moviepage';
import PracticePage from './pages/PracticePage';
import TicketPlanPage from './pages/TicketPlanPage';

function App() {
  return (
    <div>
     
      <Router>
        <Routes>
          <Route path="/home" element={<LandingPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/details/:moviename" element={<Moviedetails/>} />
          <Route path="/theater/:moviename" element={<TheaterPage/>} />
          <Route path="/movies" element={<Moviepage/>} />
          <Route path="/booking/:theatername/:movie_time" element={<TicketPlanPage/>} />
          <Route path="/practice" element={<PracticePage/>} />
       
          
        </Routes>
      </Router>
    </div>
  );
  };

export default App;
