import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const Home = () => (
  <div className="container mt-4">
    <h1>OctoFit Tracker</h1>
    <p>Welcome to the OctoFit Tracker frontend.</p>
  </div>
);

export default function App({ apiBase }) {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/octofitapp-small.svg" className="app-logo" alt="OctoFit logo" />
            <span className="brand-text">OctoFit</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities apiBase={apiBase} />} />
          <Route path="/workouts" element={<Workouts apiBase={apiBase} />} />
          <Route path="/teams" element={<Teams apiBase={apiBase} />} />
          <Route path="/users" element={<Users apiBase={apiBase} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBase={apiBase} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
