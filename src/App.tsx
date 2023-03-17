import React, { useEffect, useMemo } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { tokenService } from './services/TokenService';
import { Logo } from './icons/Logo/Logo';
import { Navigation } from './components/Navigation/Navigation';
import { NavItem } from './models/NavItem';
import { SearchIcon } from './icons/SearchIcon';
import { PeopleIcon } from './icons/PeopleIcon';
import { BottomNavigation } from './components/BottomNavigation/BottomNavigation';
import { AlbumIcon } from './icons/AlbumIcon';

const navItems: NavItem[] = [
  {
    name: 'Search',
    link: 'search',
    icon: <SearchIcon />,
  },
  {
    name: 'Artists',
    link: 'artists',
    icon: <PeopleIcon />,
  },
  {
    name: 'Albums',
    link: 'albums',
    icon: <AlbumIcon />,
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

      <nav className='bottom-nav'>
        <BottomNavigation items={navItems} activeItem={activeNavItem} />
      </nav>
      <div className='app-content'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
