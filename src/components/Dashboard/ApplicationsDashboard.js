import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { Container, Row, Col } from 'react-bootstrap';
import TIMEModelChart from '../../graphs/TIMEModelChart/TIMEModelChart';
import BusinessCriticalityChart from '../../graphs/BusinessCriticalityChart/BusinessCriticalityChart';
import Timeline from './Timeline';

const ApplicationsDashboard = () => {
    const {
        applications,
        calculateTIMEMetric,
        calculateFunctionalFitMetric,
        calculateTechnicalFitMetric,
        calculateBusinessCriticalityMetric,
        calculateHostingTypeMetric
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

    const [applicationMetrics, setApplicationsMetrics] = useState({
        TIMEMetric: calculateTIMEMetric(applications),
        functionalFitMetric: calculateFunctionalFitMetric(applications),
        technicalFitMetric: calculateTechnicalFitMetric(applications),
        businessCriticalityMetric: calculateBusinessCriticalityMetric(applications),
        hostingTypeMetric: calculateHostingTypeMetric(applications)
    })

    useEffect(() => {
        setApplicationsMetrics({
            TIMEMetric: calculateTIMEMetric(applications),
            functionalFitMetric: calculateFunctionalFitMetric(applications),
            technicalFitMetric: calculateTechnicalFitMetric(applications),
            businessCriticalityMetric: calculateBusinessCriticalityMetric(applications),
            hostingTypeMetric: calculateHostingTypeMetric(applications)
        })
    }, [applications]);

    // Applications Metrics

    const { TIMEMetric, functionalFitMetric, technicalFitMetric,
        businessCriticalityMetric, hostingTypeMetric } = applicationMetrics;

    return (
    <>
        <Container fluid>
            <Row>
                <Col xs={0} md={1}></Col>
                <Col style={{padding:'4em'}}>
                    <h1 style={{fontWeight:'600'}}>Applications</h1>
                    <p> are software programs or a group of programs owned and managed by a department, and used by the department's employees or by citizens/constituents</p>
                </Col>
                <Col style={{padding:'4em'}}>
                    <h1 style={{fontWeight:'600'}}>Projects</h1>
                    <p> A project is an effort to create, modify or maintain a specific application, infrastructure or service.</p>
                </Col>
                <Col xs={0} md={1}></Col>
            </Row>

            <Row>
                <Col xs={12} md={6}>
                    <TIMEModelChart/>
                </Col>
                <Col style={{...colors.steelblue, padding:'3em'}}>
                    <h1>TIME Model</h1>

                    <p>
                        <em><b style={timeModel}>T</b>olerate: </em>
                        An application with high technical quality, but sub-optimal functional business value. The applications should be redesigned for better business alignment.
                    </p>

                    <p>
                        <em><b style={timeModel}>I</b>nvest: </em>
                          An application with high technical and business value. There is an attributable and recognizable value - and high and/or critical usage. The application is worth continued investment to get even better returns or reduce more costs.

                    </p>

                    <p>
                        <em><b style={timeModel}>M</b>igrate: </em>
                         An application has high business value, but a poor technical fit. Discard the application but migrate its data and users to a new application or to a better-fit existing application.
                    </p>

                    <p>
                        <em><b style={timeModel}>E</b>liminate: </em>
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
                <Col style={{...colors.skyblue, padding:'3em'}}>
                    <h1>Application Timeline</h1>
                    <p>This is a plot of the current active applications and the year in which they were created.</p>
                    <Timeline width={400} height={200} data={[10, 40, 30, 20, 50, 10, 100]} indi={[1990, 1995, 2000, 2005, 2007, 2008, 2009]} />
                </Col>
            </Row>
        </Container>
    </>
    );
};

export default ApplicationsDashboard;
