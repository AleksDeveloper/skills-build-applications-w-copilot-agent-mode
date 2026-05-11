import './App.css';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="App app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark app-navbar shadow-sm">
        <div className="container-fluid px-3 px-lg-4">
          <span className="navbar-brand fw-bold app-brand">Octofit Tracker</span>
          <span className="navbar-text text-white-50 d-none d-lg-inline">
            Fitness tracking dashboard powered by the Django REST API.
          </span>
        </div>
      </nav>

      <header className="container app-hero py-4 py-lg-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <p className="app-eyebrow text-uppercase mb-2">Octofit Tracker</p>
            <h1 className="display-5 fw-bold mb-3">Unified fitness data across users, teams, workouts, and rankings.</h1>
            <p className="lead text-secondary-emphasis mb-4">
              Navigate the API-backed views below to inspect live REST data from the Codespace-aware backend.
            </p>
          </div>
          <div className="col-lg-5">
            <div className="card app-hero-card border-0 shadow-lg">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-3">Quick Navigation</h2>
                <div className="d-flex flex-wrap gap-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `btn btn-sm rounded-pill ${
                          isActive ? 'btn-primary' : 'btn-outline-primary'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="container mb-3 d-lg-none">
        <div className="card border-0 shadow-sm">
          <div className="card-body py-3">
            <div className="d-flex flex-wrap gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `btn btn-sm rounded-pill ${
                      isActive ? 'btn-primary' : 'btn-outline-secondary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container pb-5">
        <div className="card app-content-card border-0 shadow-sm">
          <div className="card-body p-3 p-lg-4">
            <Routes>
              <Route path="/" element={<Navigate to="/activities" replace />} />
              <Route path="/users" element={<Users />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/workouts" element={<Workouts />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
