import React from 'react';
import { useData } from '../../providers/DataProvider';
import _ from 'lodash';
// Material UI
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// React bootstrap
import { Container, Row, Col } from 'react-bootstrap';

const ITRoadmapTimeline = () => {
    const { projects, applications } = useData();
    const data = buildData(projects, applications);
    
    return (
        <>
            {data.map(d => <ITRoadmapCard key={`ITRoadmapCard:${d.id}`} data={d}/>)}
        </>
    );
};

const ITRoadmapCard = ({data}) => {
    const { applications } = useData();

    const { id, name, ownerAgencyName,
        projectStatus, businessValue, projectRisk,
    } = data;
    const planningStarted = data['lifecycleCustom:planningStarted'];
    const approved = data['lifecycleCustom:approved'];
    const projectedStart = data['lifecycleCustom:projectedStart'];
    const cancelled = data['lifecycleCustom:cancelled'];
    const projectedCompletion = data['lifecycleCustom:projectedCompletion'];

    const applicationsData = getApplications(data.applications, applications);

    return (
    <Col style={{marginTop:'1em'}} sm={12} md={4}>
        <Paper style={{padding:'1em', height:'100%'}} square elevation={3}>
            <Typography variant="subtitle2">Status: {projectStatus || 'n/a'}</Typography>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="caption">{ownerAgencyName}</Typography>
            <Typography variant="subtitle1">Business Value: {_.startCase(businessValue) || 'n/a'}</Typography>
            <Typography variant="subtitle1">Project Risk: {_.startCase(projectRisk) || 'n/a'}</Typography>
        <Divider/>
            <svg>
                <text y={10}>ho ya</text>
            </svg>
        </Paper>
    </Col>);
}

const buildData = (projects, applications) => {
    // Get all projects with applications and are not major information systems
    const filteredProjects = _.filter(projects, p => {
        const applicationNames = p.applications;
        return p.applications && !isMajorInformationSystem(applicationNames, applications);
    });

    return filteredProjects;
};

const isMajorInformationSystem = (applicationNames, applications) => {
    // Extract applications from string
    let isTrue = false;
    const applicationNamesArray = applicationNames.split(';');
    const applicationsArray = _.filter(applications, a => {
        return _.includes(applicationNamesArray, a.name);
    });

    _.forEach(applicationsArray, a => {
        if(a.majorInformationSystemsTag === 'Major Information Systems') isTrue = true;
    });
    return isTrue;
};

// Given a project's applications field
const getApplications = (applicationNames, applications) => {
    const applicationNamesArray = applicationNames.split(';');
    let applicationsData = _.filter(applications, a => {
        return _.includes(applicationNamesArray, a.name);
    });
    return applicationsData;
};

export default ITRoadmapTimeline;