import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ApplicationsDashboard from './ApplicationsDashboard';
import ProjectsDashboard from './ProjectsDashboard';
import MISDashboard from './MISDashboard';
import './Dashboard.css';

const Dashboard = () => {
    // To display the chosen dashboard
    const [currentDashboard, setCurrentDashboard] = useState(0);

    const dashboards = [ <ApplicationsDashboard/>, <ProjectsDashboard/>, <MISDashboard/>];

    return (
        <>
        <header className="dashboard-header">
        State of Hawai'i Executive Branch ETS IT Portfolio
        </header>
            {/* <Container>
                <Row>
                    <Col md={1}></Col>
                    <Col sm={4} md={3}>
                        <Button variant="link" style={{ padding: '1em' }}
                            onClick={()=>setCurrentDashboard(0)}>
                            IT Applications
                        </Button>
                    </Col>
                    <Col sm={4} md={3}>
                        <Button variant="link" style={{ padding: '1em' }}
                            onClick={()=>setCurrentDashboard(1)}>
                            IT Projects
                        </Button>
                    </Col>
                    <Col sm={4} md={4}>
                        <Button variant="link" style={{ padding: '1em' }}
                            onClick={()=>setCurrentDashboard(2)}>
                            Major Information Systems
                        </Button>
                    </Col>
                    <Col md={1}></Col>
                </Row>
            </Container> */}

            {dashboards[currentDashboard]}
        </>
    );
};

export default Dashboard;
