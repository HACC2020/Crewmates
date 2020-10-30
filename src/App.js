import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/variables.css';

// How we give data to entirety of app
import { DataProvider } from './providers/DataProvider';

// Import Pages
import Navigation from './components/Navigation/Navigation.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import Data from './components/Data/Data.js';
import Footer from './components/Footer.js';

function App() {

  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Navigation/>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/data" component={Data}/>
          <Footer/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
