import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Inicio</Link></li>
        <li className="navbar-item"><Link to="/categoria/ropa">Ropa</Link></li>
        <li className="navbar-item"><Link to="/categoria/electronica">Electrónica</Link></li>
        <li className="navbar-item"><Link to="/categoria/hogar">Hogar</Link></li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
