import React from 'react';
import ITRoadmapTimeline from '../../../graphs/ITRoadmapTimeline/ITRoadmapTimeline';

// Material UI
import Paper from '@material-ui/core/Paper';

const ITRoadmap = () => {

    return(
    <Paper style={{padding:'2em', backgroundColor:'var(--theme-color-5)'}} elevation={2}>
        <h1>Application Roadmap</h1>
        <p>Viewing the lifespans of all active applications.</p>
        <ITRoadmapTimeline/>
    </Paper>);
};

export default ITRoadmap;