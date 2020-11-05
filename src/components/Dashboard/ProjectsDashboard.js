import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { Container, Row, Col, Card} from 'react-bootstrap';

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
        <Col xs={12} md={5} style={{backgroundColor: 'var(--theme-color-4)', padding: '3em', paddingBottom:'2em'}}>
        <h1 style={{color:'white'}}>Business Criticality Metric</h1>
        <Row>
        <Col md={6} style={{paddingBottom:'2em'}}>
        <h4 style={{color: 'white'}}>What is Business Value?</h4>
        </Col>
        <Col md={6} style={{paddingBottom:'2em'}}>
        <h4 style={{color: 'white'}}>What is Project Risk?</h4>
        </Col>
        </Row>
        </Col>
        </Row>

        <Row>
        <Col xs={12} md={12} style={{backgroundColor: 'var(--theme-color-3)', padding:'4em', paddingBottom:'2em'}}>
        <h1 style={{marginBottom:'1em', color:'white'}}>Mini Project Metric Cards</h1>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        </Col>
        </Row>

        <Row>
        <Col xs={12} md={6} style={{backgroundColor: 'var(--theme-color-1)', padding:'4em', paddingBottom:'2em'}}>
        <h1 style={{marginBottom:'1em', color:'white'}}>Canceled vs Completed projects</h1>
        </Col>

        <Col xs={12} md={6} style={{padding:'4em', paddingBottom:'2em'}}>
        <h1 style={{marginBottom:'1em'}}># Number of Projects Missing Data</h1>
        </Col>

        </Row>





        </Container>
    </>
    );
};

export default ProjectsDashboard;
