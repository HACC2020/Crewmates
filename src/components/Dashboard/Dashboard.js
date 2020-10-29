import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import ApplicationsDashboard from './ApplicationsDashboard';
import ProjectsDashboard from './ProjectsDashboard';
import MISDashboard from './MISDashboard';

const Dashboard = () => {
    // To display the chosen dashboard
    const [currentDashboard, setCurrentDashboard] = useState(0);

    const colors = {
        powderblue: {backgroundColor:'powderblue'},
        skyblue: {backgroundColor: 'skyblue'},
        steelblue: {backgroundColor: 'steelblue'}
    };

    const centerInBox = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const dashboards = [<ApplicationsDashboard/>, <ProjectsDashboard/>, <MISDashboard/>];
    const visibleDashboard = dashboards[currentDashboard];

    return (
        <>
        <header className="App-header">
            Dashboards
        </header>
            <Container>
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
            </Container>

        {visibleDashboard}
        </>
    );
};

export default Dashboard;