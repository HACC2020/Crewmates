import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { Container, Row, Col, Card} from 'react-bootstrap';
import CancelledCompletedChart from '../../graphs/Projects/CancelledCompletedChart';

const ProjectsDashboard = () => {
    const {
        projects,
        calculateProjectStatusMetric,
        calculateBusinessValueMetric,
        calculateProjectRiskMetric,
        calculateProjectCancelledCompleted
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
        projectRiskMetric: calculateProjectRiskMetric(projects),
        projectCancelledCompleted: calculateProjectCancelledCompleted(projects)
    });

    useEffect(() => {
        setProjectsMetrics({
            projectStatusMetric: calculateProjectStatusMetric(projects),
            projectBusinessValueMetric: calculateBusinessValueMetric(projects),
            projectRiskMetric: calculateProjectRiskMetric(projects),
            projectCancelledCompleted: calculateProjectCancelledCompleted(projects)
        });
    }, [projects, calculateProjectStatusMetric, calculateBusinessValueMetric, calculateProjectRiskMetric, calculateProjectCancelledCompleted]);

    // Projectst Metrics
    const { projectStatusMetric, projectBusinessValueMetric, projectRiskMetric, projectCancelledCompleted } = projectsMetrics;
    return (
    <>
      <Container fluid>

      <Row>
          <Col xs={12} md={7} style={{...colors.white, padding:'4em', paddingBottom:'2em'}}>
            <h1 style={{marginBottom:'1em'}}>Business Value vs. Project Risk</h1>
          </Col>
          
          <Col xs={12} md={5} style={{backgroundColor: 'var(--theme-color-4)', padding: '3em', paddingBottom:'2em'}}>
              <Row>
                  <Col md={12} style={{}}>
                    <h3 style={{color:'black', paddingTop: '1em'}}>What is Business Value?</h3>
                    <ul>
                        <li style={{color: 'white'}}>
                            Marginal Benefit: Small quality or financial improvements.
                        </li>
                        
                        <li style={{color: 'white'}}>
                            Little Benefit: Some quality and financial improvements.
                        </li>
                        
                        <li style={{color: 'white'}}>
                            Large Benefit: Remarkable quality and/or financial improvements.
                        </li>
               
                        <li style={{color: 'white'}}>
                            Signifiant Benefit: Significant improvements in quality and/or financials.
                        </li>
                      </ul>
                  </Col>
                  
                  <Col md={12} style={{}}>
                      <h3 style={{color:'black'}}>What is Project Risk?</h3>
                      <ul>
                          <li style={{color: 'white'}}>
                              Low Risk: No risks or a minor risk that can be easily mitigated.
                          </li>
                   
                          <li style={{color: 'white'}}>       
                              Moderate risk - Some effects on quality, timeline or budget that can be mitigated by project management.       
                          </li>
                          
                          <li style={{color: 'white'}}>              
                              High Risk: Remarkable effects on quality, timeline or budget require management support.              
                          </li>
               
                          <li style={{color: 'white'}}>
                              Severe Risk: Intolerable effects on quality and/or timeline and/or budget of a project.
                          </li>
                      </ul>
                  </Col>
                </Row>
            </Col>
        </Row>

       <Row>
          <Col xs={12} md={12} style={{backgroundColor:'var(--theme-color-3)', padding:'4em', paddingBottom:'2em'}}>
          <h1 style={{marginBottom:'1em'}}>Additional Project Metric Cards</h1>
          <Row>
              <Col xs={12} md={4}>
                  <Card style={{ width: '18rem' }}>
                      <Card.Body>
                      <Card.Title>Projects planned but not approved</Card.Title>
                          <Card.Text>
                              Some quick example text to build on the card title and make up the bulk of
                              the card's content.
                          </Card.Text>
                      </Card.Body>
                  </Card>
              </Col>
              
              <Col xs={12} md={4}>
                  <Card style={{ width: '18rem' }}>
                      <Card.Body>
                          <Card.Title>Projects approved but no projected start</Card.Title>
                          <Card.Text>
                             Some quick example text to build on the card title and make up the bulk of
                             the card's content.
                          </Card.Text>
                      </Card.Body>
                  </Card>
              </Col>

              <Col xs={12} md={4}>
                  <Card style={{ width: '18rem' }}>
                      <Card.Body>
                      <Card.Title>Projects that have a projected start date but no cancel or projected completion date</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                          </Card.Text>
                      </Card.Body>
                  </Card>
              </Col>

          </Row>
          </Col>
        </Row>

      <Row>

          <Col xs={12} md={6} style={{backgroundColor:'var(--theme-color-1',padding:'4em', paddingBottom:'2em'}}>
              <h1 style={{color: 'white', marginBottom:'1em'}}># Number of Projects Missing Data</h1>
              <Col xs={12} md={12}>
                  <Card style={{ width: '18rem' }}>
                     <Card.Body>
                       <Card.Title>Number of projects missing data</Card.Title>
                       <Card.Text>
                         Some quick example text to build on the card title and make up the bulk of
                         the card's content.
                       </Card.Text>
                     </Card.Body>
                   </Card>
              </Col>
          </Col>

          <Col xs={12} md={6} style={{...colors.white, padding:'4em', paddingBottom:'2em'}}>
            <h1 style={{marginBottom:'1em'}}>Canceled vs Completed projects</h1>
            <CancelledCompletedChart/>
          </Col>
      </Row>

      </Container>
    </>
    );
};

export default ProjectsDashboard;
