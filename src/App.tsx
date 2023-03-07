import React, { useEffect } from 'react';
import './App.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { tokenService } from './services/TokenService';
import { Logo } from './icons/Logo/Logo';

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!tokenService.isTokenValid()) {
            navigate('/auth');
        }
    }, []);

  return (
    <div className="app">
        <nav className="app-nav">
            <Logo className="app-logo" />
            <ul>
                <li>
                    <Link to={`search`}>Search</Link>
                </li>
            </ul>
        </nav>
        <div className="app-content">
            <Outlet />
        </div>
    </div>
  );
}

export default App;
