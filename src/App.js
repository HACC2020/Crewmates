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
import Reports from './components/Reports/Reports.js';
import Filter from './components/Filter/Filter.js';
import Data from './components/Data/Data.js';
import Footer from './components/Footer.js';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#504f79',
      main: '#25274d',
      dark: '#000025',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#dcddea',
      main: '#aaabb8',
      dark: '#7b7c88',
      contrastText: '#f9f9f9',
    },
  },
});

function App() {

  return (
    <DataProvider>
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navigation/>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/reports" component={Reports}/>
          <Route exact path="/filter" component={Filter}/>
          <Route exact path="/data" component={Data}/>
          <Footer/>
        </div>
      </Router>
    </ThemeProvider>
    </DataProvider>
  );
}

export default App;
