import React from 'react';
import { useData } from '../../providers/DataProvider';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';

const ApplicationsDashboard = ({}) => {
    const { applications } = useData();

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

    // Applications Metrics
    const TIMEMetric = calculateTIMEMetric(applications);
    const functionalFitMetric = calculateFunctionalFitMetric(applications);
    const technicalFitMetric = calculateTechnicalFitMetric(applications);
    const businessCriticalityMetric = calculateBusinessCriticalityMetric(applications);
    const hostingTypeMetric = calculateHostingTypeMetric(applications);

    return (
<>
        <Container style={{height:'100vh'}} fluid>
            <Row style={{height:'33vh'}}>
                <Col xs={4} md={2} style={{...colors.powderblue, ...centerInBox, margin:'.5em'}}>
                    <span style={{fontWeight:'bold', fontSize:'3em'}}>{applications.length}</span>
                    <h4>Apps</h4>
                </Col>
                <Col xs={8} md style={{...colors.skyblue, margin:'.5em .5em .5em 0'}}>
                    <span style={{fontWeight:'normal', fontSize:'2em'}}>
                        Functional Fit
                    </span>
                    <ul>
                        <li>Excellent: {functionalFitMetric.excellent}</li>
                        <li>Adequate: {functionalFitMetric.adequate}</li>
                        <li>Insufficient: {functionalFitMetric.insufficient}</li>
                        <li>Poor: {functionalFitMetric.poor}</li>
                        <li>Missing Data: {functionalFitMetric.missing}</li>
                    </ul>
                </Col>
                <Col xs={12} md style={{...colors.steelblue, margin:'.5em .5em .5em 0'}}>
                     <span style={{fontWeight:'normal', fontSize:'2em'}}>
                        Technical Fit
                    </span>
                    <ul>
                        <li>Excellent: {technicalFitMetric.excellent}</li>
                        <li>Adequate: {technicalFitMetric.adequate}</li>
                        <li>Insufficient: {technicalFitMetric.insufficient}</li>
                        <li>Poor: {technicalFitMetric.poor}</li>
                        <li>Missing Data: {technicalFitMetric.missing}</li>
                    </ul>
                </Col>
                <Col xs={12} md style={{...colors.powderblue, margin:'.5em .5em .5em 0'}}>
                    <span style={{fontWeight:'normal', fontSize:'2em'}}>
                        Business Criticality
                    </span>
                    <ul>
                        <li>Administrative Service: {businessCriticalityMetric.administrativeService}</li>
                        <li>Business Operational: {businessCriticalityMetric.businessOperational}</li>
                        <li>Business Critical: {businessCriticalityMetric.businessCritical}</li>
                        <li>Mission Critical: {businessCriticalityMetric.missionCritical}</li>
                        <li>Missing Data: {businessCriticalityMetric.missing}</li>
                    </ul>
                </Col>
            </Row>
            <Row style={{height:`42vh`}}>
                <Col xs={12} md={4} style={{...colors.steelblue, padding:'1em'}}>
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
                </Col>
                <Col xs={12} md={8}></Col>
            </Row>
            <Row style={{height:`${25}vh`}}>
                <Col xs={12} md style={{...colors.powderblue, margin:'.5em'}}>
                    <div style={{display:'flex', flexDirection:'row-reverse'}}>
                        <span style={{fontWeight:'normal', fontSize:'1em'}}>
                            On Premise
                        </span>
                    </div>
                    <div style={centerInBox}>
                        <span style={{fontWeight:'bold', fontSize:'2em'}}>{hostingTypeMetric.onPremise}</span>
                    </div>
               </Col>
                <Col xs={12} md style={{...colors.skyblue, margin:'.5em .5em .5em 0'}}>
                    <div style={{display:'flex', flexDirection:'row-reverse'}}>
                        <span style={{fontWeight:'normal', fontSize:'1em'}}>
                            Co-Located
                        </span>
                    </div>
                    <div style={centerInBox}>
                        <span style={{fontWeight:'bold', fontSize:'2em'}}>{hostingTypeMetric.coLocated}</span>
                    </div>
                </Col>
                <Col xs={12} md style={{...colors.powderblue, margin:'.5em .5em .5em 0'}}>
                    <div style={{display:'flex', flexDirection:'row-reverse'}}>
                        <span style={{fontWeight:'normal', fontSize:'1em'}}>
                            IaaS
                        </span>
                    </div>
                    <div style={centerInBox}>
                        <span style={{fontWeight:'bold', fontSize:'2em'}}>{hostingTypeMetric.IaaS}</span>
                    </div>
                </Col>
                <Col xs={12} md style={{...colors.skyblue, margin:'.5em .5em .5em 0'}}>
                    <div style={{display:'flex', flexDirection:'row-reverse'}}>
                        <span style={{fontWeight:'normal', fontSize:'1em'}}>
                            PaaS
                        </span>
                    </div>
                    <div style={centerInBox}>
                        <span style={{fontWeight:'bold', fontSize:'2em'}}>{hostingTypeMetric.PaaS}</span>
                    </div>
                </Col>
                <Col xs={12} md style={{...colors.steelblue, margin:'.5em .5em .5em 0'}}>
                    <div style={{display:'flex', flexDirection:'row-reverse'}}>
                        <span style={{fontWeight:'normal', fontSize:'1em'}}>
                            SaaS
                        </span>
                    </div>
                    <div style={centerInBox}>
                        <span style={{fontWeight:'bold', fontSize:'2em'}}>{hostingTypeMetric.SaaS}</span>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    );
};

const calculateTIMEMetric = applications => {
    let eliminate = 0;
    let invest = 0;
    let migrate = 0;
    let tolerate = 0;
    let missing = 0;

    applications.forEach(app => {
        switch (app.timeTag) {
            case 'Tolerate':
                tolerate++;
                break;
            case 'Invest':
                invest++;
                break;
            case 'Migrate':
                migrate++;
                break;
            case 'Eliminate':
                eliminate++;
                break;
            default:
                missing++;
                break;
        }
    });

    return { eliminate, invest, migrate, tolerate, missing};
};

const calculateFunctionalFitMetric = applications => {
    let excellent = 0;
    let adequate = 0;
    let insufficient = 0;
    let poor = 0;
    let missing = 0;

    applications.forEach(app => {
        switch (app.functionalFit) {
            case 'excellent':
                excellent++;
                break;
            case 'adequate':
                adequate++;
                break;
            case 'insufficient':
                insufficient++;
                break;
            case 'poor':
                poor++;
                break;
            default:
                missing++;
                break;
        }
    });

    return { excellent, adequate, insufficient, poor, missing};
};

const calculateTechnicalFitMetric = applications => {
    let excellent = 0;
    let adequate = 0;
    let insufficient = 0;
    let poor = 0;
    let missing = 0;

    applications.forEach(app => {
        switch (app.technicalFit) {
            case 'excellent':
                excellent++;
                break;
            case 'adequate':
                adequate++;
                break;
            case 'insufficient':
                insufficient++;
                break;
            case 'poor':
                poor++;
                break;
            default:
                missing++;
                break;
        }
    });

    return { excellent, adequate, insufficient, poor, missing};
};

const calculateBusinessCriticalityMetric = applications => {
    let administrativeService = 0;
    let businessOperational = 0;
    let businessCritical = 0;
    let missionCritical = 0;
    let missing = 0;

    applications.forEach(app => {
        switch (app.businessCriticality) {
            case 'administrativeService':
                administrativeService++;
                break;
            case 'businessOperational':
                businessOperational++;
                break;
            case 'businessCritical':
                businessCritical++;
                break;
            case 'missionCritical':
                missionCritical++;
                break;
            default:
                missing++;
                break;
        }
    });

    return { 
        administrativeService, 
        businessOperational, 
        businessCritical, 
        missionCritical, 
        missing
    };
};

const calculateHostingTypeMetric = applications => {
    let onPremise = 0;
    let coLocated = 0;
    let IaaS = 0;
    let PaaS = 0;
    let SaaS = 0;
    let missing = 0;

    applications.forEach(app => {
        switch (app.hostingTypeTag) {
            case '@On Premise':
                onPremise++;
                break;
            case 'Co-Located':
                coLocated++;
                break;
            case 'IaaS':
                IaaS++;
                break;
            case 'PaaS':
                PaaS++;
                break;
            case 'SaaS':
                SaaS++;
                break;
            default:
                missing++;
                break;
        }
    });

    return { 
        onPremise, 
        coLocated, 
        IaaS, 
        PaaS, 
        SaaS,
        missing
    };
};

export default ApplicationsDashboard;