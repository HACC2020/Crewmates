import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/variables.css';

// How we give data to entirety of app
import { DataProvider } from './providers/DataProvider';

// Import Pages
// import NewNav from './components/Navigation/Navigation.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import Filter from './components/Filter/Filter.js';
import Data from './components/Data/Data.js';
// import Footer from './components/Footer.js';

// Reports
import AppMatrix from './components/Reports/ReportsComponents/AppMatrix';
import ITRoadmap from './components/Reports/ReportsComponents/ITRoadmap';
import MISRoadmap from './components/Reports/ReportsComponents/MISRoadmap';
import DepartmentsTreeVisualization from './components/Reports/ReportsComponents/DepartmentsTreeVisualization';

// Drawer 

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';


// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#504f79',
//       main: '#25274d',
//       dark: '#000025',
//       contrastText: '#ffffff',
//     },
//     secondary: {
//       light: '#dcddea',
//       main: '#aaabb8',
//       dark: '#7b7c88',
//       contrastText: '#f9f9f9',
//     },
//   },
// });

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor:'var(--theme-color-1)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'var(--theme-color-1)',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const links = [
    { name: 'Dashboard', link: '/'},
    { name: 'IT Roadmap', link: '/itroadmap'},
    { name: 'Departments Hierarchy', link: '/departments'},
    { name: 'Application Grid', link: '/application-grid'},
    { name: 'Major Information Systems Roadmap', link: '/misroadmap'},
    // { name: 'Filter', link: '/filter'},
    // { name: 'Raw Data', link: '/data'}
  ];

  // function ListItemLink(props) {
  //   return <ListItem button component="a" {...props} />;
  // }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {links.map((link, index) => (
        <>
          {/* // <ListItemLink key={`link.name-${index}`} style={{padding:'1em', color:'white'}}  href={link.link}>
          //   <ListItemText primary={link.name} />
          // </ListItemLink> */}
          <ListItem>
            <NavLink style={{color:'white'}} key={`link.name-${index}`} to={link.link}>{link.name}</NavLink>
          </ListItem>
        </>
        ))}

      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
    
  return (
    <DataProvider>
    {/* <ThemeProvider theme={theme}> */}
      <Router>
        <div className={classes.root}>
        <CssBaseline />

        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Hawai'i State Executive Branch IT Portfolio
            </Typography>
          </Toolbar>
        </AppBar>

        <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

      <main style={{marginTop:'4.5em', backgroundColor:'var(--theme-color-4)'}} className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/application-grid" component={AppMatrix}/>
          <Route exact path="/itroadmap" component={ITRoadmap}/>
          <Route exact path="/misroadmap" component={MISRoadmap}/>
          <Route exact path="/departments" component={DepartmentsTreeVisualization}/>
          <Route exact path="/filter" component={Filter}/>
          <Route exact path="/data" component={Data}/>
      </main>
      </div>
      </Router>
    {/* </ThemeProvider> */}
    </DataProvider>
  );
}

export default App;
