import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { Container, Row, Col, Card } from 'react-bootstrap';
import TIMEModelChart from '../../graphs/TIMEModelChart/TIMEModelChart';
import BusinessCriticalityChart from '../../graphs/BusinessCriticalityChart/BusinessCriticalityChart';
import ActiveAppTimeline from '../../graphs/ActiveAppTimelineChart/ActiveAppTimeline';

const ApplicationsDashboard = () => {
    const {
        applications,
        calculateTIMEMetric,
        calculateFunctionalFitMetric,
        calculateTechnicalFitMetric,
        calculateBusinessCriticalityMetric,
        calculateHostingTypeMetric,
        calculateTimelineMetric
    } = useData();

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

    const timeModel = {
        fontSize:'3em'
    };

    const portfolioHeader = {
      backgroundColor: '#040404',
      minHeight: '40vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(20px + 6vmin)',
      color: 'white',
      fontWeight: '245',
      font: 'Arial',
      textAlign: 'center',
    }

    const whiteText = {
        color:'white'
    };


    const [applicationMetrics, setApplicationsMetrics] = useState({
        TIMEMetric: calculateTIMEMetric(applications),
        functionalFitMetric: calculateFunctionalFitMetric(applications),
        technicalFitMetric: calculateTechnicalFitMetric(applications),
        businessCriticalityMetric: calculateBusinessCriticalityMetric(applications),
        hostingTypeMetric: calculateHostingTypeMetric(applications),
        timeline: calculateTimelineMetric(applications)
    })

    useEffect(() => {
        setApplicationsMetrics({
            TIMEMetric: calculateTIMEMetric(applications),
            functionalFitMetric: calculateFunctionalFitMetric(applications),
            technicalFitMetric: calculateTechnicalFitMetric(applications),
            businessCriticalityMetric: calculateBusinessCriticalityMetric(applications),
            hostingTypeMetric: calculateHostingTypeMetric(applications),
            timeline: calculateTimelineMetric(applications)
        })
    }, [applications]);

    // Applications Metrics

    const { TIMEMetric, functionalFitMetric, technicalFitMetric,
        businessCriticalityMetric, hostingTypeMetric, timeline } = applicationMetrics;

    return (
    <>
        <header style={portfolioHeader}>
            Hawai'i State Executive Branch Application Portfolio
        </header>
        <Container fluid>
            <Row id="dashboard-applications-projects">
                <Col xs={0} md={1} lg={2} xl={3}></Col>
                <Col style={{padding:'4em'}}>
                    <h1 className="text" style={{fontWeight:'600', color:'white'}}>IT Applications</h1>
                    <p style={whiteText}> are software programs or a group of programs owned and managed by a department, and used by the department's employees or by citizens/constituents</p>
                </Col>
                <Col style={{padding:'4em'}}>
                    <h1 style={{...whiteText, fontWeight:'600'}}>IT Projects</h1>
                    <p style={whiteText}> A project is an effort to create, modify or maintain a specific application, infrastructure or service.</p>
                </Col>
                <Col xs={0} md={1} lg={2} xl={3}></Col>
            </Row>

            <Row style={{minHeight:'100vh'}}>
                <Col xs={12} md={8} style={{backgroundColor: '#fbfbfd'}}>
                    <TIMEModelChart/>
                </Col>
                <Col id="TIME-description" xs={12} md={4} lg={3} style={{ padding:'4em', paddingBottom:'2em'}}>
                    <h1 style={{marginBottom:'1em'}}>TIME Model</h1>
                    <p>
                        <span className="firstcharacter">T</span>olerate:
                        An application with high technical quality, but sub-optimal functional business value. The applications should be redesigned for better business alignment.
                    </p>

                    <p>
                        <span className="firstcharacter">I</span>nvest:

                          An application with high technical and business value. There is an attributable and recognizable value - and high and/or critical usage. The application is worth continued investment to get even better returns or reduce more costs.

                    </p>

                    <p>
                        <span className="firstcharacter">M</span>igrate:
                         An application has high business value, but a poor technical fit. Discard the application but migrate its data and users to a new application or to a better-fit existing application.
                    </p>

                    <p>
                        <span className="firstcharacter">E</span>liminate:
                         Eliminate useless applications with low business value and a poor technical fit (possible reasons; no business value, not used, low utility, based on obsolete software)
                    </p>
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={9} lg={7} xl={6}>
                    <BusinessCriticalityChart/>
                </Col>
                <Col id="dashboard-business-criticality" xs={12} md={3} lg={5} xl={6} style={{ padding:'3em'}}>
                <h1>Business Criticality Metric</h1>
                <p style={{fontWeight:'bold'}}>
                What is Business Criticality?
                </p>
                <p>
                Business criticality identifies the department's mission and ability to function effectively.
                </p>

                <ul>
                  <li>
                  Mission Critical: The application is fundamentally necessary for the success of a specific operation. Any breaks in service are intolerable and will be immediately significantly damaging.
                  </li>
                  <li>
                  Business Critical: The application is relied on by the business to carry out normal business operations to keep them running successfully. Short breaks in service are not catastrophic in the short-term.
                  </li>
                  <li>
                  Business Operational: The application contributes to an efficient business operation but isn't in the direct line of service to customers.
                  </li>
                  <li>
                  Administrative Service: The application's failures can be tolerated a little more and do not affect customers.
                  </li>
                </ul>

                </Col>
            </Row>

            <Row>
                <Col id="dashboard-application-timeline" xs={12} md={6} style={{ padding:'3em'}}>
                    <h1>Application Timeline</h1>
                    <p>This is a plot of the current active applications and the year in which they went active.</p>
                    <p>There are currently {timeline.active} applications that are active right now.</p>
                    <p>{timeline.missing} applications have no data provided on whether they are in planning, active, or have been retired.</p>
                    <p>There are {timeline.plan} applications that are planned to be active sometime in the future.</p>
                    <p>The state has retired {timeline.end} applications.</p>
                </Col>
                <Col xs={12} md={6} style={{padding: '2em', backgroundColor: '#fbfbfd'}}>
                    <ActiveAppTimeline data={timeline} />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={3}>
                    <Container>
                        <Col>
                            <Row style={{backgroundColor: '#5D92BD'}}>
                                <h1>graph</h1>
                            </Row>
                            <Row style={{...colors.steelblue}}>
                                <h1>description</h1>
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col xs={12} md={3}>
                    <Container>
                        <Col>
                            <Row style={{backgroundColor: '#BAE4E9'}}>
                                <h1>graph</h1>
                            </Row>
                            <Row style={{...colors.powderblue}}>
                                <h1>description</h1>
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col xs={12} md={3}>
                    <Container>
                        <Col>
                            <Row style={{backgroundColor: '#96D4ED'}}>
                                <h1>graph</h1>
                            </Row>
                            <Row style={{...colors.skyblue}}>
                                <h1>description</h1>
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col xs={12} md={3}>
                    <Container>
                        <Col>
                            <Row style={{backgroundColor: '#5D92BD'}}>
                                <h1>graph</h1>
                            </Row>
                            <Row style={{...colors.steelblue}}>
                                <h1>description</h1>
                            </Row>
                        </Col>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={5} style={{backgroundColor: '#fbfbfd'}}>
                    <h1>a graph</h1>
                </Col>
                <Col xs={12} md={7} style={{...colors.steelblue, padding:'3em'}}>
                    <h1>Calculate End of Life Graph</h1>
                </Col>
            </Row>

            <Row>
           <Col xs={12} md={7} style={{padding:'4em', paddingBottom:'2em'}}>
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

           </Col>


           </Row>

        </Container>
    </>
    );
};

export default ApplicationsDashboard;
