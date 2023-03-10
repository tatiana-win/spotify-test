import { NavItem } from '../../models/NavItem';
import { Link } from 'react-router-dom';
import React from 'react';
import cn from 'clsx';
import './BottomNavigation.css';

interface Props {
  items: NavItem[];
  activeItem: string;
}

export const BottomNavigation = ({ items, activeItem }: Props) => {
  const itemWidth = Math.floor(100 / items.length);
  return (
    <ul className='bottomNavigation'>
      {items.map(item => (
        <li key={item.link} style={{ width: `${itemWidth}%` }}>
          <Link
            to={item.link}
            className={cn(
              'bottomNavigation-item',
              activeItem === item.link ? 'bottomNavigation-item__active' : '',
            )}
          >
            {item.icon}
            <div className='bottomNavigation-text'>{item.name}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
