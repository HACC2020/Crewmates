import React from 'react';
import ApplicationsDashboard from './ApplicationsDashboard';
import ProjectsDashboard from './ProjectsDashboard';
import DepartmentsDashboard from './DepartmentsDashboard';
import './Dashboard.css';

const Dashboard = () => {
    // To display the chosen dashboard

    return (
        <>
        <ApplicationsDashboard/>
        <ProjectsDashboard/>
        <DepartmentsDashboard/>
        </>
    );
};

export default Dashboard;
