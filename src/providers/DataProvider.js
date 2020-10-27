import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';

const DataContext = React.createContext(null);

const DataProvider = ({children}) => {
    const [departments, setDepartments] = useState([]);
    const [departmentFields, setDepartmentFields] = useState([]);
    const [applications, setApplications] = useState([]);
    const [applicationFields, setApplicationFields] = useState([]);
    const [projects, setProjects] = useState([]);
    const [projectFields, setProjectFields] = useState([]);

    const url = 'https://opendata.hawaii.gov/api/3/action/datastore_search';
      
    const departments_rid = '50e32460-83ff-4c01-a40c-bcea5e76ae8d';
    const applications_rid = '9468a555-8d1f-42fb-b1a9-c3ae0d5c756d';
    const projects_rid = '3fb50c21-a7b2-4449-8368-d9061e001fb2';

    useEffect(() => {
        // Get all records from all three datasets
        getRecords(url, departments_rid, 1000, setDepartments, setDepartmentFields);
        getRecords(url, applications_rid, 1000, setApplications, setApplicationFields);
        getRecords(url, projects_rid, 1000, setProjects, setProjectFields);
    }, []);

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

    return (
        <DataContext.Provider
            value={{
                departments,
                departmentFields,
                applications,
                applicationFields,
                projects,
                projectFields
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

const useData = () => {
    const data = useContext(DataContext);
    return data;
};

export { DataProvider, useData };