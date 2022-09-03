import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        app
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/:id" element={<Card/>}/>
          </Routes>
      </div>
    </Router>
  );
}

function Dashboard() {
  return <div>db</div>
}

function Card() {
  let { id } = useParams();
  return <h3>Requested char ID: {id}</h3>;
}

export default App;
