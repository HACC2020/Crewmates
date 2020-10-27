import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav>
          <Link id="navbarLink" to="/">Dashboard</Link>
          <Link id="navbarLink" to="/data">Raw Data</Link>
        </nav>
    );
};

export default Navigation;
