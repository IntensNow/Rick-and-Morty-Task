import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Card from './features/Card/Card';
import Register from './features/Register/Register';

function App() {
  return (
    <Router>
      <div className="App">
        app
          <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/:id" element={<Card/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
