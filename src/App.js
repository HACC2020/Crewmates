import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import './App.css';

// Import Pages
import Dashboard from './components/Dashboard/Dashboard.js';

const styles= {
  tableStyles: {
    border: '1px solid black'
  }
};

function App() {
  const [departments, setDepartments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [applicationFields, setApplicationFields] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectFields, setProjectFields] = useState([]);

    const url = 'https://opendata.hawaii.gov/api/3/action/datastore_search';
    
    const departments_rid = '50e32460-83ff-4c01-a40c-bcea5e76ae8d';
    const applications_rid = '9468a555-8d1f-42fb-b1a9-c3ae0d5c756d';
    const projects_rid = '3fb50c21-a7b2-4449-8368-d9061e001fb2';

    useEffect(() => {
      getRecords(url, departments_rid, 1000, setDepartments, null);
      getRecords(url, applications_rid, 1000, setApplications, setApplicationFields);
      getRecords(url, projects_rid, 1000, setProjects, setProjectFields);
    }, []);

  return (
    <div className="App">
      <Dashboard/>
      <div style={{display:'flex'}}>
        <div >
          <h1>Departments/Agencies</h1>
          { departments.map(record => {
            return <table style={{...styles.tableStyles, borderCollapse:'collapse',
              backgroundColor:`${record._id % 2 === 0 ? 'grey' : 'white'}`}}>
                <tr>
                  <td style={styles.tableStyles}><b>id</b></td> 
                  <td style={styles.tableStyles}>{record.id}</td>
                </tr>
                <tr>
                  <td style={styles.tableStyles}><b>name</b></td>
                  <td style={styles.tableStyles}>{record.name}</td>
                </tr>
                <tr>
                  <td style={styles.tableStyles}><b>parent</b></td>
                  <td style={styles.tableStyles}>{record.parent}</td>
                </tr>
              </table>;
          })}
        </div>
        <div>
          <h1>IT Applications</h1>
          { applications.map(record => {
            return <table style={{...styles.tableStyles, borderCollapse:'collapse',
            backgroundColor:`${record._id % 2 === 0 ? 'grey' : 'white'}`}}>
              {applicationFields.map(field => {
                return <tr>
                  <td style={styles.tableStyles}><b>{field.id}</b></td>
                  <td style={styles.tableStyles}>{record[field.id]}</td>
                </tr>
              })}
              </table>;
          })}
        </div>
        <div>
          <h1>IT Projects</h1>
          { projects.map(record => {
            return <table style={{...styles.tableStyles, borderCollapse:'collapse',
            backgroundColor:`${record._id % 2 === 0 ? 'grey' : 'white'}`}}>
              {projectFields.map(field => {
                return <tr>
                  <td style={styles.tableStyles}><b>{field.id}</b></td>
                  <td style={styles.tableStyles}>{record[field.id]}</td>
                </tr>
              })}
              </table>;
          })}
        </div>
      </div>
    </div>
  );
}

// Function to make HTTP GET request to a given url with optional
// parameters: resource_id and limit.
// setDatabase is a React Hook setter function to be called.
// setField is also a React Hook setter function to be called.
const getRecords = (url, resource_id, limit, setDatabase, setField) => {
  axios.get(url, {
    params: {
      resource_id,
      limit
    }
  })
    .then(function (response) {
      console.log(response);
      setDatabase(response.data.result.records);
      if(setField !== null) {
        setField(response.data.result.fields);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default App;
