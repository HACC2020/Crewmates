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
          <NavLink exact activeStyle={activeStyle} id="navbarLink" to="/">Dashboard</NavLink>
          <NavLink activeStyle={activeStyle} id="navbarLink" to="/reports">Reports</NavLink>
          <NavLink activeStyle={activeStyle} id="navbarLink" to="/filter">Filter</NavLink>
          <NavLink activeStyle={activeStyle} id="navbarLink" to="/data">Raw Data</NavLink>
        </nav>
    );
};

export default Navigation;
