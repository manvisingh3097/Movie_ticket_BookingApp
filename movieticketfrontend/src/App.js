
import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div>
     
      <Router>
        <Routes>
          <Route path="/l" element={<LandingPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
