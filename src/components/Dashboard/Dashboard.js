import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import ApplicationsDashboard from './ApplicationsDashboard';

const Dashboard = () => {
    const { applications, projects } = useData();

    const [currentDashboard, setCurrentDashboard] = useState({
        apps: true,
        projects: false,
        mis: false
    });

    const majorInformationSystemsCount = calculateMajorInformationSystems(applications);

    // Projectst Metrics
    const projectStatusMetric = calculateProjectStatusMetric(projects);
    const projectBusinessValueMetric = calculateBusinessValueMetric(projects);
    const projectRiskMetric = calculateProjectRiskMetric(projects);

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

    return (
        <>
        <header className="App-header">
            Dashboards
        </header>
            <Container>
                <Row>
                    <Col md={1}></Col>
                    <Col sm={4} md={3}>
                        <Button variant="link" style={{ padding: '1em' }}>
                            IT Applications
                        </Button>
                    </Col>
                    <Col sm={4} md={3}>
                        <Button variant="link" style={{ padding: '1em' }}>
                            IT Projects
                        <Badge variant="secondary">{projects.length}</Badge>
                        </Button>
                    </Col>
                    <Col sm={4} md={4}>
                        <Button variant="link" style={{ padding: '1em' }}>
                            Major Information Systems
                        <Badge variant="secondary">{majorInformationSystemsCount}</Badge>
                        </Button>
                    </Col>
                    <Col md={1}></Col>
                </Row>
            </Container>

        <ApplicationsDashboard/>
        </>
    );
};



const calculateMajorInformationSystems = applications => {
    let count = 0;

    applications.forEach(app => {
        if(app.majorInformationSystemsTag === 'Major Information Systems') {
            count++;
        }
    });

    return count;
}

const calculateProjectStatusMetric = projects => {
    let green = 0;
    let yellow = 0;
    let red = 0;
    let missing = 0;

    projects.forEach(project => {
        switch (project.projectStatus) {
            case 'green':
                green++;
                break;
            case 'yellow':
                yellow++;
                break;
            case 'red':
                red++;
                break;
            default:
                missing++;
                break;
        }
    });

    return { green, yellow, red, missing };
};

const calculateBusinessValueMetric = projects => {
    let marginal = 0;
    let little = 0;
    let large = 0;
    let significant = 0;
    let missing = 0;

    projects.forEach(project => {
        switch (project.businessValue) {
            case 'marginalBusinessBenefit':
                marginal++;
                break;
            case 'littleBusinessBenefit':
                little++;
                break;
            case 'largeBusinessBenefit':
                large++;
                break;
            case 'significantBusinessBenefit':
                significant++;
                break;
            default:
                missing++;
                break;
        }
    });

    return { marginal, little, large, significant, missing };
};

const calculateProjectRiskMetric = projects => {
    let low = 0;
    let moderate = 0;
    let high = 0;
    let severe = 0;
    let missing = 0;

    projects.forEach(project => {
        switch (project.projectRisk) {
            case 'lowProjectRisk':
                low++;
                break;
            case 'moderateProjectRisk':
                moderate++;
                break;
            case 'highProjectRisk':
                high++;
                break;
            case 'severeProjectRisk':
                severe++;
                break;
            default:
                missing++;
                break;
        }
    });

    return { low, moderate, high, severe, missing };
};

export default Dashboard;