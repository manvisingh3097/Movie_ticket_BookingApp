
import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <div>
     
      <Router>
        <Routes>
          <Route path="/l" element={<LandingPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
