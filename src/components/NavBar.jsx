import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/NavBar.module.css';

function NavBar() {
  return (
    <nav className="navbar">
      <li className="artists"><NavLink to="/">artists</NavLink></li>
      <li className="collection"><NavLink to="/MyCollection">myCollection</NavLink></li>
    </nav>
  );
}

export default NavBar;
