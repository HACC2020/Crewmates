import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav style={{height:'1em', padding:'1em', backgroundColor:'#282c34'}}>
          <Link style={{padding:'1em', color:'white'}} to="/">Dashboard</Link>
          <Link style={{padding:'1em', color:'white'}} to="/data">Raw Data</Link>
        </nav>
    );
};

export default Navigation;