import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { Container, Row, Col } from 'react-bootstrap';
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
            <Row>
                <Col xs={0} md={1}></Col>
                <Col style={{padding:'4em'}}>
                    <h1 style={{fontWeight: '600'}}>Applications</h1>
                    <p> are software programs or a group of programs owned and managed by a department, and used by the department's employees or by citizens/constituents.</p>
                </Col>
                <Col style={{padding:'4em'}}>
                    <h1 style={{fontWeight: '600'}}>Projects</h1>
                    <p> A project is an effort to create, modify or maintain a specific application, infrastructure or service.</p>
                </Col>
                <Col xs={0} md={1}></Col>
            </Row>

            <Row>
                <Col xs={12} md={8} style={{backgroundColor: '#fbfbfd'}}>
                    <TIMEModelChart/>
                </Col>
                <Col xs={12} md={4} style={{...colors.steelblue, padding:'4em', paddingBottom:'2em'}}>
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
                <Col xs={12} md={5} style={{...colors.powderblue, padding:'3em'}}>
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
                <Col xs={12} md={7} >
                    <BusinessCriticalityChart/>
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={6} style={{...colors.skyblue, padding:'3em'}}>
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
        </Container>
    </>
    );
};

export default ApplicationsDashboard;

