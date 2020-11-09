import React, { useState, useEffect } from 'react';
import { useData } from '../../../providers/DataProvider';
import Chip from '@material-ui/core/Chip';
import { Container, Row, Col, Card } from 'react-bootstrap';

const MISRoadmap = () => {

	const { applications, projects, calculateMISRelations } = useData();

	const [projectsMetrics, setProjectsMetrics] = useState({
        MISRelations: calculateMISRelations(projects),
    });

    useEffect(() => {
        setProjectsMetrics({
            MISRelations: calculateMISRelations(applications, projects),
        });
    }, [applications, projects]);

    // data for table
    const { MISRelations } = projectsMetrics;
    const { MISApps, MISAppsSuccessors, MISAppsStandalone } = MISRelations;
  	// console.log(MISApps);
  	// console.log(MISAppsSuccessors);
  	// console.log(MISAppsStandalone);  	
  	const addIndex = MISAppsSuccessors.length;

    const InvestibleRow = ({data, index}) => {
        const grey = index % 2 ? 'lightgrey' : 'white';
        const parentStyle = {backgroundColor: grey, margin: 2, padding: 10}
        let legacyHosting = data.legacy[0].hostingTypeTag;
        legacyHosting = (legacyHosting === null) ? 'missing data' : legacyHosting;
        let modernHosting = data.modern.hostingTypeTag;
        modernHosting = (modernHosting === null) ? 'missing data' : modernHosting;

        // fix #columns in case theres no projects
        const rowSize = data.projects.length === 0 ? 6 : 4;
        const columns = data.projects.length === 0 ? false : true;

        return (
            <div style={parentStyle}>
                <h1>{data.modern.name}</h1>
                <hr/>
                <Container>
                    <Row style={{marginBottom: 10}}>
                        {columns ? <Col xs={rowSize} md={rowSize} lg={rowSize} xl={rowSize}></Col> : ''}
                        <Col xs={rowSize} md={rowSize} lg={rowSize} xl={rowSize}></Col>
                        <Col xs={rowSize} md={rowSize} lg={rowSize} xl={rowSize} style={{backgroundColor: 'lightgreen', borderRadius: 15}}>{data.modern.name}</Col>
                    </Row>
                    {data.projects.map(proj =>
                        <Row style={{marginBottom: 10}}>
                            <Col xs={4} md={4} lg={4} xl={4}></Col>
                            <Col xs={4} md={4} lg={4} xl={4} style={{backgroundColor: 'lightblue', borderRadius: 15}}>{proj.name}</Col>
                            <Col xs={4} md={4} lg={4} xl={4}></Col>
                        </Row>
                    )}
                    {data.legacy.map(legacy =>
                        <Row style={{marginBottom: 10}}>
                            <Col xs={rowSize} md={rowSize} lg={rowSize} xl={rowSize} style={{backgroundColor: 'red', borderRadius: 15}}>{legacy.name}</Col>
                            <Col xs={rowSize} md={rowSize} lg={rowSize} xl={rowSize}></Col>
                            {columns ? <Col xs={rowSize} md={rowSize} lg={rowSize} xl={rowSize}></Col> : ''}
                        </Row>
                    )}
                    <Row style={{marginBottom: 10}}>
                        <Col xs={6} md={6} lg={6} xl={6} style={{backgroundColor: 'pink', borderRadius: `15px 0px 0px 15px`}}>{legacyHosting}</Col>
                        <Col xs={6} md={6} lg={6} xl={6} style={{backgroundColor: 'lightgreen', borderRadius: `0px 15px 15px 0px`}}>{modernHosting}</Col>
                    </Row>
                </Container>
            </div>
        );
    };

    const investible = MISAppsSuccessors.map((data, index) => {
        return (<InvestibleRow key={data.modern.id} data={data} index={index} />);
    });

    const CurrentRow = ({data, index}) => {
        const grey = (index + addIndex) % 2 ? 'lightgrey' : 'white';
        const parentStyle = {backgroundColor: grey, margin: 2, padding: 10}
        let modernHosting = data.modern.hostingTypeTag;
        modernHosting = (modernHosting === null) ? 'missing data' : modernHosting;

        // if no projects then render text 'no projects'
        const noProjects = data.projects.length === 0 ? true : false;

        return (
            <div style={parentStyle}>
                <h1>{data.modern.name}</h1>
                <hr/>
                <Container>
                    <Row style={{marginBottom: 10}}>
                        <Col xs={6} md={6} lg={6} xl={6}></Col>
                        <Col xs={6} md={6} lg={6} xl={6} style={{backgroundColor: 'lightgreen', borderRadius: 15}}>{data.modern.name}</Col>
                    </Row>
                    { noProjects ? <Row style={{marginBottom: 10}}>
                        <Col xs={6} md={6} lg={6} xl={6} style={{backgroundColor: 'lightgreen', borderRadius: 15}}>No projects currently working on this App</Col>
                        <Col xs={6} md={6} lg={6} xl={6}></Col>
                    </Row> : ''}
                    {data.projects.map(proj =>
                        <Row style={{marginBottom: 10}}>
                            <Col xs={6} md={6} lg={6} xl={6} style={{backgroundColor: 'lightblue', borderRadius: 15}}>{proj.name}</Col>
                            <Col xs={6} md={6} lg={6} xl={6}></Col>
                        </Row>
                    )}
                    <Row style={{marginBottom: 10}}>
                        <Col xs={12} md={12} lg={12} xl={12} style={{backgroundColor: 'lightgreen', borderRadius: 15}}>{modernHosting}</Col>
                    </Row>
                </Container>
            </div>
        );
    };

    const current = MISAppsStandalone.map((data, index) => {
        return (<CurrentRow key={data.modern.id} data={data} index={index} />);
    });

    const fields = [{name: 'legacy', color: 'red'},
                    {name: 'project', color: 'lightblue'},
                    {name: 'modern', color: 'lightgreen'},
                    {name: 'host', color: 'pink'}];

    const legend = fields.map(field => {
        return (
            <React.Fragment>
                <Chip key={field.name} style={{backgroundColor: `${field.color}`, marginLeft: 10, marginBottom: 10}} size="medium" label={field.name}/>
                
            </React.Fragment>
        )
    });

    return(
        <div>
            <h1>Major Information Systems Modernization Roadmap</h1>
            {legend}
            <div style={{overflowY:'scroll', overflowX:'scroll', height:'80vh'}}>
                <h1>Investible Apps</h1>
                {investible}
                <h1>Current Apps</h1>
    			{current}
    		</div>
    	</div>
    );
};

export default MISRoadmap;