import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

// Import Pages
import Header from './components/Header/Header.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import Data from './components/Data/Data.js';

function App() {

  return (
    <Router>
      <div className="App">
        <Header/>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/data" component={Data}/>
      </div>
    </Router>
  );
}

export default App;
