import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/NavBar.module.css';

function NavBar() {
  return (
    <nav className="navbar">
      <li><NavLink to="/">Artists</NavLink></li>
      <li><NavLink to="/MyCollection">My Collection</NavLink></li>
    </nav>
  );
}

export default NavBar;
