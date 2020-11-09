import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { Container, Row, Col } from 'react-bootstrap';
import TIMEModelChart from '../../graphs/TIMEModelChart/TIMEModelChart';
import BusinessCriticalityChart from '../../graphs/BusinessCriticalityChart/BusinessCriticalityChart';
import ActiveAppTimeline from '../../graphs/ActiveAppTimelineChart/ActiveAppTimeline';
import FunctionalVsTechnicalGraph from '../../graphs/FunctionalVsTechnicalGraph/FunctionalVsTechnicalGraph';


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const ApplicationsDashboard = () => {
    const {
        projects,
        departments,
        applications,
        calculateTimelineMetric
    } = useData();

    const [applicationMetrics, setApplicationsMetrics] = useState({

        timeline: calculateTimelineMetric(applications)
    })

    useEffect(() => {
        setApplicationsMetrics({
            timeline: calculateTimelineMetric(applications)
        })
    }, [applications, calculateTimelineMetric]);

    // Applications Metrics

    // const { TIMEMetric, functionalFitMetric, technicalFitMetric,
    //     businessCriticalityMetric, hostingTypeMetric, timeline } = applicationMetrics;
    const { timeline } = applicationMetrics;
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            border: '1px solid black',
            margin: '1em'
        },
        title: {
            fontSize: '2em',
            color:'black',
        },
        pos: {
            marginBottom: 12,
        },
    });

    const classes = useStyles();

    return (
    <>
    {/* <Card className={classes.root}> */}

    <Container fluid>
        <Row>
            <Col sm={12} md={4}>
                <Paper elevation={2}>
                    <Card>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        IT Applications
                        </Typography>
                        <Typography variant="body" component="p">
                        Software programs or a group of programs owned and managed by a department, and used by the department's employees or by citizens/constituents                        <br />
                        </Typography>
                    </CardContent>
                    </Card>
                </Paper>
            </Col>
            <Col style={{marginTop:'1em'}} sm={12} md={4}>
                <Paper elevation={2}>
                    <Card>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        IT Projects
                        </Typography>
                        <Typography variant="body" component="p">
                        A project is an effort to create, modify or maintain a specific application, infrastructure or service.                        
                        </Typography>
                    </CardContent>
                    </Card>
                </Paper>
            </Col>

            <Col style={{marginTop:'1em'}} sm={12} md={4}>
                <Paper elevation={2}>
                    <Card>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Departments
                        </Typography>
                        <Typography variant="body" component="p">
                        Each department or agency under the Hawai'i State Executive Branch has their own applications and services they use and maintain.                </Typography>
                    </CardContent>
                    </Card>
                </Paper>    
            </Col>
        </Row>

        <Row>
            <Col style={{padding:0}} sm={12} md={7} lg={12} xl={9}>
                <Container fluid>
                    <Row>
                        {/* <Col style={{marginTop:'1em'}} sm={0} md={3}></Col> */}
                        <Col style={{marginTop:'1em'}} sm={12} md={4}>
                            <Paper elevation={2}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h3" component="h2">
                                            {applications.length}
                                        </Typography>
                                        <Typography variant="h5">
                                            Applications
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Col>

                        <Col style={{marginTop:'1em'}} sm={12} md={4}>
                            <Paper elevation={2}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h3" component="h2">
                                            {projects.length}
                                        </Typography>
                                        <Typography variant="h5">
                                            Projects
                                        </Typography>                                    
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Col>

                        <Col style={{marginTop:'1em'}} sm={12} md={4}>
                            <Paper elevation={2}>
                                <Card>
                                    <CardContent>
                                    <Typography variant="h3" component="h2">
                                            {departments.length}
                                        </Typography>
                                        <Typography variant="h5">
                                            Departments/Agencies
                                        </Typography>                                    
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Col>

                        <Col style={{marginTop:'1em'}} sm={12}>
                            <Paper elevation={2}>
                                <Card>
                                    <CardContent>
                                        <TIMEModelChart/>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Col>
                    </Row>
                </Container>
            </Col>

            <Col  
                style={{padding:0, marginTop:'1em'}} 
                sm={12} md={12} lg={12} xl={3}>
                        <Paper  elevation={2}>
                            <Card style={{padding:'3em'}} id="TIME-description">
                                <CardContent>
                                    {TIMEModelDescription}
                                </CardContent>
                            </Card>
                        </Paper>
            </Col>
        </Row>

        <Row style={{marginTop:'1em'}}>
            <Col>
                <Paper elevation={2}>
                <ActiveAppTimeline data={timeline} />
                </Paper>
            </Col>
        </Row>

        <Row >
            <Col style={{marginTop:'1em'}} sm={12} md={6}>
                <Graph graph={<BusinessCriticalityChart/>} title="Business Criticality Chart" content={BusinessCriticalityDescription}/>
            </Col>

            <Col style={{marginTop:'1em'}} sm={12} md={6}>
                <Graph 
                    graph={<FunctionalVsTechnicalGraph/>} 
                    title="Measure of Functional and Technical Ratings of All Applications" 
                    content={null}/>
            </Col>
        </Row>
    </Container>
    </>
    );
};

const Graph = ({graph, title, content}) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    const useStyles = makeStyles((theme) => ({
        expand: {
          transform: 'rotate(0deg)',
          marginLeft: 'auto',
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
          }),
        },
        expandOpen: {
          transform: 'rotate(180deg)',
        },
      }));
    const classes = useStyles();

    return (
            <Card>
                <CardContent>

                    {/* <CardHeader title={title}/> */}
                    <Typography style={{marginTop:'1em'}} variant="h5">
                    { content === null ? null :
                        <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more">
                            <ExpandMoreIcon />
                        </IconButton>
                    }
                        {title}</Typography>
                    <Divider/>
                    { content === null ? null :
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {content}
                        </CardContent>
                    </Collapse>
                    }
                        {graph}

                </CardContent>

            </Card>
            // <Card>
            //     <CardContent>
            //         {graph}
            //         <Divider/>
            //         {/* <CardHeader title={title}/> */}
            //         <Typography style={{marginTop:'1em'}} variant="h5">
            //         { content === null ? null :
            //             <IconButton
            //             className={clsx(classes.expand, {
            //                 [classes.expandOpen]: expanded,
            //             })}
            //             onClick={handleExpandClick}
            //             aria-expanded={expanded}
            //             aria-label="show more">
            //                 <ExpandMoreIcon />
            //             </IconButton>
            //         }
            //             {title}</Typography>


            //     </CardContent>
            //     { content === null ? null :
            //         <Collapse in={expanded} timeout="auto" unmountOnExit>
            //             <CardContent>
            //                 {content}
            //             </CardContent>
            //         </Collapse>
            //     }
            // </Card>
    );
}

const TIMEModelDescription = (
    <>
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
    </>
);

const BusinessCriticalityDescription = (<>
                    <Typography variant="h3" paragraph>
                        What is Business Criticality?
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Business criticality identifies the department's mission and ability to function effectively.
                    </Typography>
                    <Typography  paragraph>
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
                    </Typography>
</>);

// const ActiveTimeDescription = (<>
//         <h1>Application Timeline</h1>
//         <p>This is a plot of the current active applications and the year in which they went active.</p>
//         <p>There are currently {timeline.active} applications that are active right now.</p>
//         <p>{timeline.missing} applications have no data provided on whether they are in planning, active, or have been retired.</p>
//         <p>There are {timeline.plan} applications that are planned to be active sometime in the future.</p>
//         <p>The state has retired {timeline.end} applications.</p>
// </>);

export default ApplicationsDashboard;
