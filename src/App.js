import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

// How we give data to entirety of app
import { DataProvider } from './providers/DataProvider';

// Import Pages
import Header from './components/Header/Header.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import Data from './components/Data/Data.js';

function App() {

  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header/>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/data" component={Data}/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;