import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ApplicationTimeline from '../../../graphs/ITRoadmapTimeline/ApplicationTimeline';
import ProjectTimeline from '../../../graphs/ITRoadmapTimeline/ProjectTimeline';
import { buildData, getAverageLifeSpan, getMode } from '../../../graphs/ITRoadmapTimeline/projectTimelineFunctions';
import { useData } from '../../../providers/DataProvider';
import _ from 'lodash';
// Material UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

const ITRoadmap = () => {
    const { projects } = useData();
    const projectData = buildData(projects);
    const averageProject = getAverageLifeSpan(projectData);
    const modeProject = getMode(projectData);

    console.log(projects.length);
    console.log(projectData.length);
    return(
    <Container style={{padding:'0'}} fluid>
        <Row>
            <Col>
                <Paper style={{ padding:'2em', backgroundColor:'var(--theme-color-2)', color:'white'}} elevation={2} square>
                    <Typography variant="h3">Project Timeline</Typography>
                    <Typography variant="body1">Viewing the projected start and completion dates of all projects.</Typography>
                </Paper>
            </Col>
        </Row>

        <Row style={{marginTop:'1em'}}>
            <Col style={{marginTop:'1em'}} sm={12} md={3}>
                <Paper style={{ padding:'2em', height:'100%'}} elevation={2} square>
                    <Typography variant="h5">Viewing:</Typography>
                    <Divider/>
                    <Typography style={{marginTop:'0.5em'}} variant="h3">{projectData.length} <Typography variant="h6" component="span">projects</Typography></Typography>                    
                </Paper>
            </Col>
            <Col style={{marginTop:'1em'}} sm={12} md={3}>
                <Paper style={{ padding:'2em', height:'100%'}} elevation={2} square>
                    <Typography variant="h5">Average Time Between Project Start and Completion</Typography>
                    <Divider/>
                    <Typography style={{marginTop:'0.5em'}} variant="h3">{averageProject} <Typography variant="h6" component="span">months</Typography></Typography>                    
                </Paper>
            </Col>
            <Col style={{marginTop:'1em'}} sm={12} md={3}>
                <Paper style={{ padding:'2em', height:'100%'}} elevation={2} square>
                    <Typography variant="h5">Most Common Time Between Project Start and Completion</Typography>
                    <Divider/>
                    <Typography style={{marginTop:'0.5em'}} variant="h4">{_.floor(_.divide(modeProject.months, 12), 2)} years <Typography variant="h6" component="span">({modeProject.numProjects} projects)</Typography></Typography> 
                    
                </Paper>
            </Col>
            <Col style={{marginTop:'1em'}} sm={12} md={3}>
                <Paper style={{ padding:'2em', height:'100%'}} elevation={2} square>
                    <Typography variant="h5">Projects with Missing Data</Typography>
                    <Divider/>
                    <Typography style={{marginTop:'0.5em'}} variant="h3">{projects.length - projectData.length} <Typography variant="h6" component="span">projects</Typography></Typography> 
                </Paper>
            </Col> 
        </Row>

        <Row style={{marginTop:'1em'}}>
            <Col>
                <Paper style={{padding:'2em', backgroundColor:'var(--theme-color-5)'}} elevation={2} square>
                    <ProjectTimeline/>
                </Paper>
            </Col>
        </Row>

        <Row style={{marginTop:'1em'}}>
            <Col>
                <Paper style={{ padding:'2em', backgroundColor:'var(--theme-color-2)', color:'white'}} elevation={2} square>
                    <Typography variant="h3">Application Timeline</Typography>
                    <Typography variant="body1">Viewing the lifespans of all applications.</Typography>
                </Paper>
            </Col>
        </Row>
        <Row style={{marginTop:'1em'}}>
            <Col>
                <Paper style={{padding:'2em', backgroundColor:'var(--theme-color-5)'}} elevation={2} square>
                    <ApplicationTimeline/>
                </Paper>
            </Col>
        </Row>
    </Container>
    );
};

export default ITRoadmap;