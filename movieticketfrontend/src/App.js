
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

function App() {
  return (
    <div>
     
      <Router>
        <Routes>
          <Route path="/home" element={<LandingPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/details/:moviename" element={<Moviedetails/>} />
          <Route path="/theater" element={<TheaterPage/>} />
          <Route path="/movies" element={<Moviepage/>} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
