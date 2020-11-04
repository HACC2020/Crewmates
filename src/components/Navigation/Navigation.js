import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    
   const activeStyle = {
     textDecoration: 'underline',
     fontWeight:'bold'
   }

    return (
        <nav>
          <NavLink exact activeStyle={activeStyle} className="navbarLink" to="/">Dashboard</NavLink>
          <NavLink activeStyle={activeStyle} className="navbarLink" to="/reports">Reports</NavLink>
          <NavLink activeStyle={activeStyle} className="navbarLink" to="/filter">Filter</NavLink>
          <NavLink activeStyle={activeStyle} className="navbarLink" to="/data">Raw Data</NavLink>
        </nav>
    );
};

export default Navigation;
