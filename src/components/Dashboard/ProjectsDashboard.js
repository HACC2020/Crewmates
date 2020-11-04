import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { Container, Row, Col} from 'react-bootstrap';

const ProjectsDashboard = () => {
    const {
        projects,
        calculateProjectStatusMetric,
        calculateBusinessValueMetric,
        calculateProjectRiskMetric
    } = useData();

    const colors = {
        powderblue: {backgroundColor:'powderblue'},
        skyblue: {backgroundColor: 'skyblue'},
        steelblue: {backgroundColor: 'steelblue'},
        white: {backgroundColor: 'white'}
    };

    const [projectsMetrics, setProjectsMetrics] = useState({
        projectStatusMetric: calculateProjectStatusMetric(projects),
        projectBusinessValueMetric: calculateBusinessValueMetric(projects),
        projectRiskMetric: calculateProjectRiskMetric(projects)
    });

    useEffect(() => {
        setProjectsMetrics({
            projectStatusMetric: calculateProjectStatusMetric(projects),
            projectBusinessValueMetric: calculateBusinessValueMetric(projects),
            projectRiskMetric: calculateProjectRiskMetric(projects)
        });
    }, [projects, calculateProjectStatusMetric, calculateBusinessValueMetric, calculateProjectRiskMetric]);

    // Projectst Metrics
    const { projectStatusMetric, projectBusinessValueMetric, projectRiskMetric } = projectsMetrics;

    return (
    <>

        <Container fluid>
        <Row>
        <Col xs={12} md={7} style={{...colors.white, padding:'4em', paddingBottom:'2em'}}>
        <h1 style={{marginBottom:'1em'}}>Business Value vs. Project Risk</h1>
        </Col>
        <Col xs={12} md={5} style={{...colors.skyblue, padding: '3em', paddingBottom:'2em'}}>
        <h1 >Business Criticality Metric</h1>
        <Row>
        <Col md={6} style={{paddingBottom:'2em'}}>
        <h4 style={{color: 'white'}}>What is Business Value </h4>
        </Col>
        <Col md={6} style={{paddingBottom:'2em'}}>
        <h4 style={{color: 'white'}}>What is Project Risk?</h4>
        </Col>
        </Row>
        </Col>
        </Row>

        <Row>
        <Col xs={12} md={12} style={{...colors.powderblue, padding:'4em', paddingBottom:'2em'}}>
        <h1 style={{marginBottom:'1em'}}>Mini Project Metric Cards</h1>
        </Col>
        </Row>

        <Row>
        <Col xs={12} md={6} style={{...colors.steelblue, padding:'4em', paddingBottom:'2em'}}>
        <h1 style={{marginBottom:'1em'}}>Canceled vs Completed projects</h1>
        </Col>
        </Row>





        </Container>
    </>
    );
};

export default ProjectsDashboard;
