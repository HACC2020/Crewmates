import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AppMatrix from './AppMatrix';

const sideNavStyle = {
    padding:'3em',
    height:'100vh',
    // backgroundColor:'var(--theme-color-1)',
    display:'flex',
    flexDirection:'column'
};

const linkStyle = {
    color:'white',
    fontSize:'1em',
    fontWeight:'500',
    marginBottom:'1em'
};

const Reports = () => {
    const [currentReport, setCurrentReport] = useState(0);

    const reports = [<AppMatrix/>, <ITRoadmap/>, <MISRoadmap/>];

    const handleChangeReport = (repotIndex) => {
        setCurrentReport(repotIndex);
    };

    return (
    <>
        <Container fluid>
            <Row style={{backgroundColor:'var(--theme-color-1)'}}>
                <SideNav handleClick={handleChangeReport}/>
                <Col sm={12} md={8} lg={9} xl={10}  style={{backgroundColor:'white', padding:'2em'}}>
                    {reports[currentReport]}
                </Col>
            </Row>
        </Container>
    </>);
};

const SideNav = ({handleClick}) =>                
    <Col style={sideNavStyle} sm={12} md={4} lg={3} xl={2}>
        <Button onClick={() => handleClick(0)} style={linkStyle} variant="link">Application Matrix</Button>
        <Button onClick={() => handleClick(1)} style={linkStyle} variant="link">IT Roadmap</Button>
        <Button onClick={() => handleClick(2)} style={linkStyle} variant="link">Major Information Systems Roadmap</Button>
    </Col>;


const ITRoadmap = () => {

    return(<div>IT Roadmap</div>);
};


const MISRoadmap = () => {

    return(<div>Major Information Systems Modernization Roadmap</div>);
};

export default Reports;