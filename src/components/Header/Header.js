import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={{height:'1em', padding:'1em', backgroundColor:'#282c34'}}>
          <Link style={{padding:'1em', color:'white'}} to="/">Dashboard</Link>
          <Link style={{padding:'1em', color:'white'}} to="/data">Raw Data</Link>
        </header>
    );
};

export default Header;