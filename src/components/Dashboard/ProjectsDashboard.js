import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { Container, Row, Col, Card} from 'react-bootstrap';


const ProjectsDashboard = () => {
    const {
        projects,
        calculateProjectStatusMetric,
        calculateBusinessValueMetric,
        calculateProjectRiskMetric,
        calculateProjectDates
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
        projectDateMetric: calculateProjectDates(projects)
    });

    useEffect(() => {
        setProjectsMetrics({
            projectStatusMetric: calculateProjectStatusMetric(projects),
            projectBusinessValueMetric: calculateBusinessValueMetric(projects),
            projectRiskMetric: calculateProjectRiskMetric(projects),
            projectDateMetric: calculateProjectDates(projects)
        });
    }, [projects, calculateProjectStatusMetric, calculateBusinessValueMetric, calculateProjectRiskMetric, calculateProjectDates]);

    // Projectst Metrics
    const { projectStatusMetric, projectBusinessValueMetric, projectRiskMetric, projectDateMetric } = projectsMetrics;

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
                      <Card.Title style={{textAlign:'center', fontSize:'3em'}}>{projectDateMetric.plannedNotApproved}</Card.Title>
                          <Card.Text style={{textAlign:'center', fontWeight:'bold'}}>
                              Projects planned but not approved.
                          </Card.Text>
                      </Card.Body>
                  </Card>
              </Col>

              <Col xs={12} md={4}>
                  <Card style={{ width: '18rem' }}>
                      <Card.Body>
                          <Card.Title style={{textAlign:'center', fontSize: '3em'}}>{projectDateMetric.approvedNoStart}</Card.Title>
                          <Card.Text style={{textAlign:'center', fontWeight: 'bold'}}>
                             Projects approved but no projected start date.
                          </Card.Text>
                      </Card.Body>
                  </Card>
              </Col>

              <Col xs={12} md={4}>
                  <Card style={{ width: '18rem' }}>
                      <Card.Body>
                      <Card.Title style={{textAlign:'center', fontSize:'3em'}}> {projectDateMetric.startNoComplete}</Card.Title>
                          <Card.Text style={{textAlign: 'center', fontWeight:'bold'}}>
                            Projects that have a projected start date but no cancel or projected completion date.
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
                       <Card.Title> {projectDateMetric.plannedNotApproved}</Card.Title>
                       <Card.Text>
                         Projects are missing data.
                       </Card.Text>
                     </Card.Body>
                   </Card>
              </Col>
          </Col>

          <Col xs={12} md={6} style={{...colors.white, padding:'4em', paddingBottom:'2em'}}>
            <h1 style={{marginBottom:'1em'}}>Canceled vs Completed projects</h1>
          </Col>
      </Row>

      </Container>
    </>
    );
};

export default ProjectsDashboard;
