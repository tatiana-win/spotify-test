import { Link } from 'react-router-dom';
import React from 'react';
import './Navigation.css';

export interface NavItem {
  name: string;
  link: string;
}
interface Props {
  items: NavItem[];
  activeItem: string;
}

export const Navigation = ({ items, activeItem }: Props) => {
  return (
    <ul className='navigation'>
      {items.map(item => (
        <li
          className={activeItem === item.link ? 'active' : ''}
          key={item.link}
        >
          <Link to={item.link}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};
