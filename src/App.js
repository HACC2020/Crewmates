import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

// Import Pages
import Dashboard from './components/Dashboard/Dashboard.js';
import Data from './components/Data/Data.js';



function App() {

  return (
    <Router>
      <div className="App">
        <header style={{height:'1em', padding:'1em', backgroundColor:'#282c34'}}>
          <Link style={{padding:'1em', color:'white'}} to="/">Dashboard</Link>
          <Link style={{padding:'1em', color:'white'}} to="/data">Raw Data</Link>
        </header>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/data" component={Data}/>
      </div>
    </Router>
  );
}

export default App;
