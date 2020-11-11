import React from 'react';
import ApplicationsDashboard from './ApplicationsDashboard';
import ProjectsDashboard from './ProjectsDashboard';
import './Dashboard.css';

const Dashboard = () => {
    // To display the chosen dashboard

    return (
        <>
        <ApplicationsDashboard/>
        <ProjectsDashboard/>
        </>
    );
};

export default Dashboard;
