import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ApplicationsDashboard from './ApplicationsDashboard';
import ProjectsDashboard from './ProjectsDashboard';
import MISDashboard from './MISDashboard';
import './Dashboard.css';

const Dashboard = () => {
    // To display the chosen dashboard

    return (
        <>
        <header className="dashboard-header">
            Hawai'i State Executive Branch Application Portfolio
        </header>
        <ApplicationsDashboard/>
        <ProjectsDashboard/>
        <MISDashboard/>
        </>
    );
};

export default Dashboard;
