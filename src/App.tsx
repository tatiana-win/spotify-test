import React, { useEffect, useMemo } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { tokenService } from './services/TokenService';
import { Logo } from './icons/Logo/Logo';
import { Navigation, NavItem } from './components/Navigation/Navigation';

const navItems: NavItem[] = [
  {
    name: 'Search',
    link: 'search',
  },
  {
    name: 'Artists',
    link: 'artists',
  },
];

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!tokenService.isTokenValid()) {
      navigate('/auth');
    }
  }, []);

  const activeNavItem = useMemo(
    () => window.location.pathname.split('/')[1],
    [window.location.pathname],
  );

  return (
    <div className='app'>
      <nav className='app-nav'>
        <Logo className='app-logo' />
        <Navigation items={navItems} activeItem={activeNavItem} />
      </nav>
      <div className='app-content'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
