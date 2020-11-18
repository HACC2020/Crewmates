import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ITRoadmapTimeline from '../../../graphs/ITRoadmapTimeline/ITRoadmapTimeline';

// Material UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const ITRoadmap = () => {

    return(
    <Container style={{padding:'0'}} fluid>
        <Row>
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

                    <ITRoadmapTimeline/>
                </Paper>
            </Col>
        </Row>
    </Container>
    );
};

export default ITRoadmap;