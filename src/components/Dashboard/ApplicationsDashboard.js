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
import CircularProgress from '@material-ui/core/CircularProgress';

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
    // const useStyles = makeStyles({
    //     root: {
    //         minWidth: 275,
    //         border: '1px solid black',
    //         margin: '1em',
    //     },
    //     title: {
    //         fontSize: '2em',
    //         color:'black',
    //     },
    //     font: {
    //         fontFamily: 'Georgia'
    //     },
    //     pos: {
    //         marginBottom: 12,
    //     },
    // });

    // const classes = useStyles();

    return (
    <>
    <Container style={{padding:'0'}} fluid>


        <Row>
            <Col style={{padding:0}} sm={12} md={7} lg={12} xl={9}>
                <Container fluid>
                    <Row>
                        <Col style={{marginTop:'1em'}} sm={12} md={4}>
                            <MetricCard title="IT Applications" metric={applications.length} 
                                content={`Software programs or a group of programs owned and managed by a department, and used by the department's employees or by citizens/constituents`}
                                />
                        </Col>

                        <Col style={{marginTop:'1em'}} sm={12} md={4}>
                        <MetricCard title="IT Projects" metric={projects.length} 
                                content={`A project is an effort to create, modify or maintain a specific application, infrastructure or service.`}
                                />
                        </Col>

                        <Col style={{marginTop:'1em'}} sm={12} md={4}>
                            <MetricCard title="Departments/Agencies" metric={departments.length} 
                                    content={`Each department or agency under the Hawai'i State Executive Branch has their own applications and services they use and maintain.`}
                                    />
                        </Col>

                        <Col style={{marginTop:'1em'}} sm={12}>
                            <Paper elevation={2} square>
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
                        <Paper style={{height:'100%', marginRight:'1em', marginLeft:'1em'}} elevation={2}>
                            {/* <Card style={{padding:'2em'}} id="TIME-description">
                                <CardContent>
                                    {TIMEModelDescription}
                                </CardContent>
                            </Card> */}
                            {TIMEModelDescription}
                        </Paper>
            </Col>
        </Row>

        <Row style={{marginTop:'1em'}}>
            <Col>
                <Paper elevation={2} square>
                <ActiveAppTimeline data={timeline} />
                </Paper>
            </Col>
        </Row>

        <Row >
            <Col style={{marginTop:'1em'}} sm={12} md={6}>
                <Paper elevation={2} square>
                    <Graph graph={<BusinessCriticalityChart/>} title="Business Criticality Chart" content={BusinessCriticalityDescription}/>
                </Paper>
            </Col>

            <Col style={{marginTop:'1em'}} sm={12} md={6}>
                <Paper style={{height:'100%'}} elevation={2} square>
                    <Graph 
                        graph={<FunctionalVsTechnicalGraph/>} 
                        title="Measure of Functional and Technical Ratings of All Applications" 
                        content={null}/>
                </Paper>
            </Col>
        </Row>
    </Container>
    </>
    );
};

const MetricCard = ({title, metric, content}) => {
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
        <Paper elevation={2} square>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        {title}
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more">
                            <ExpandMoreIcon />
                        </IconButton>
                    </Typography>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {content}
                        </CardContent>
                    </Collapse>

                    <Divider />
                    <Typography variant="h3" component="h2">
                        {metric ? metric : <CircularProgress/>}
                    </Typography>
                </CardContent>
            </Card>
        </Paper>
    );
}

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
            <Card style={{height:'100%', borderRadius:'0px'}}>
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
                        {graph ? graph : null}

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
    <div style={{ padding: '4em', height: '100%'}} id="TIME-description">
        <h1>TIME Model</h1>
        <Divider style={{ background: 'var(--theme-color-4)' }} light={true} />
        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', height:'100%'}}>
            <div style={{flex:1}}>
            <p style={{ marginTop: '1em' }}>
            <span className="firstcharacter">T</span>olerate:
        An application with high technical quality, but sub-optimal functional business value. The applications should be redesigned for better business alignment.
        </p>
            </div>
            <div style={{flex:1}}>
            <p>
            <span className="firstcharacter">I</span>nvest:

          An application with high technical and business value. There is an attributable and recognizable value - and high and/or critical usage. The application is worth continued investment to get even better returns or reduce more costs.

        </p>
            </div>
            <div style={{flex:1}}>
            <p>
            <span className="firstcharacter">M</span>igrate:
         An application has high business value, but a poor technical fit. Discard the application but migrate its data and users to a new application or to a better-fit existing application.
        </p>
            </div>
            <div style={{flex:1}}>
            <p>
            <span className="firstcharacter">E</span>liminate:
         Eliminate useless applications with low business value and a poor technical fit (possible reasons; no business value, not used, low utility, based on obsolete software)
        </p>
            </div>
        </div>







    </div>
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
                                <b>Mission Critical:</b> The application is fundamentally necessary for the success of a specific operation. Any breaks in service are intolerable and will be immediately significantly damaging.
                            </li>
                            <li>
                                <b>Business Critical:</b> The application is relied on by the business to carry out normal business operations to keep them running successfully. Short breaks in service are not catastrophic in the short-term.
                            </li>
                            <li>
                                <b>Business Operational:</b> The application contributes to an efficient business operation but isn't in the direct line of service to customers.
                            </li>
                            <li>
                                <b>Administrative Service:</b> The application's failures can be tolerated a little more and do not affect customers.
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
