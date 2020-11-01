import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { Container, Row, Col } from 'react-bootstrap';

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
                <Col style={{...colors.powderblue, padding:'4em'}}>
                    <h1 style={{fontWeight:'600'}}>Applications</h1>
                    <p> are software programs or a group of programs owned and managed by a department, and used by the department's employees or by citizens/constituents</p>
                </Col>
                <Col style={{...colors.skyblue, padding:'4em'}}>
                    <h1 style={{fontWeight:'600'}}>Projects</h1>
                    <p> A project is an effort to create, modify or maintain a specific application, infrastructure or service.</p>
                </Col>
                <Col xs={0} md={1}></Col>
            </Row>

            <Row>
                <Col xs={12} md={6} style={{...colors.steelblue, padding:'3em'}}>
                    <span style={{fontWeight:'normal', fontSize:'1.5em'}}>
                        Calculated TIME Model Suggestion 
                    </span>
                    <ul>
                        <li>Tolerate: {TIMEMetric.tolerate}</li>
                        <li>Invest: {TIMEMetric.invest}</li>
                        <li>Migrate: {TIMEMetric.migrate}</li>
                        <li>Eliminate: {TIMEMetric.eliminate}</li>
                        <li>Missing Data: {TIMEMetric.missing}</li>
                    </ul>

                    <p>Pretend there's a graph here</p>
                </Col>
                <Col style={{padding:'3em'}}>
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
                <Col xs={12} md={6} style={{padding:'3em'}}>
                    <h1>Business Criticality Metric</h1>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut odio lacus. Fusce laoreet tellus vel turpis tincidunt euismod. Pellentesque ullamcorper odio id neque dignissim, quis venenatis nunc vestibulum. Aliquam aliquet vel risus in gravida. Aliquam fermentum in tortor et rhoncus. Nunc laoreet massa vel malesuada rhoncus. Proin et molestie urna, quis cursus dolor. Aliquam sollicitudin nunc quis est laoreet elementum. Donec sodales orci at est hendrerit dictum.
                    </p>
                </Col>
                <Col xs={12} md={6} style={{...colors.powderblue, padding:'3em'}}>
                    <ul>
                        <li>Administrative Service: {businessCriticalityMetric.administrativeService}</li>
                        <li>Business Operational: {businessCriticalityMetric.businessOperational}</li>
                        <li>Business Critical: {businessCriticalityMetric.businessCritical}</li>
                        <li>Mission Critical: {businessCriticalityMetric.missionCritical}</li>
                        <li>Missing Data: {businessCriticalityMetric.missing}</li>
                    </ul>
                </Col>
            </Row>

            <Row>
                <Col style={{...colors.skyblue, padding:'3em'}}>
                    <h1>Application Timeline</h1>
                    <p>This is a plot of the current active applications and the year in which they were created.</p>
                    <p>
                    Curabitur blandit mi lacus, id aliquet nisi pharetra quis. Pellentesque eu lobortis dolor. Quisque eget ipsum volutpat, scelerisque nibh et, sagittis ante. Maecenas a quam at orci sollicitudin suscipit. Sed tempus, risus sit amet volutpat sodales, urna justo iaculis libero, in varius lectus tellus non erat. Nam semper auctor arcu vitae elementum. Nam dictum ex lorem, condimentum porttitor felis sollicitudin non. Etiam vehicula volutpat accumsan. Suspendisse molestie dui eu massa fermentum accumsan. Ut sagittis purus metus, vel ornare elit pellentesque ac. Cras ultrices odio ac sapien imperdiet, a tristique turpis dapibus. Fusce metus lorem, finibus ac tellus eu, ultrices suscipit urna. Cras in luctus orci, et euismod sapien. Donec sodales, massa a sollicitudin dapibus, nibh risus blandit mauris, ut viverra lacus ex tincidunt ligula.

Vivamus convallis leo nec odio pharetra posuere. Donec eu elit vitae arcu pulvinar scelerisque vitae a ipsum. Nullam ipsum justo, scelerisque in vulputate a, ultricies vitae nulla. Mauris porttitor enim at ultricies tempus. Donec efficitur, enim sed feugiat pretium, quam risus lobortis odio, ut vestibulum erat ante non nisi. Maecenas placerat ac tortor quis malesuada. Suspendisse dapibus sodales hendrerit. Sed et vehicula felis. Proin molestie turpis non tellus vehicula malesuada. Pellentesque interdum egestas tellus vitae mollis. Pellentesque tempus tellus a lacus bibendum porttitor.

                    </p>
                </Col>
            </Row>
        </Container>
    </>
    );
};

export default ApplicationsDashboard;