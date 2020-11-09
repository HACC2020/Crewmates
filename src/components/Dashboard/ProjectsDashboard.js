import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { Container, Row, Col} from 'react-bootstrap';
import CancelledCompletedChart from '../../graphs/Projects/CancelledCompletedChart';
import ProjectRiskToValueChart from '../../graphs/ProjectRiskToValueChart/ProjectRiskToValueChart';

import { makeStyles } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const ProjectsDashboard = () => {
    const {
        projects,
        calculateProjectStatusMetric,
        calculateBusinessValueMetric,
        calculateProjectRiskMetric,
        calculateProjectCancelledCompleted,
        calculateProjectRiskToValueMetric,
        calculateProjectDates
    } = useData();

    const colors = {
        powderblue: {backgroundColor:'powderblue'},
        skyblue: {backgroundColor: 'skyblue'},
        steelblue: {backgroundColor: 'steelblue'},
        white: {backgroundColor: 'white'}
    };

    const [projectsMetrics, setProjectsMetrics] = useState({
        projectStatusMetric: calculateProjectStatusMetric(projects),
        projectBusinessValueMetric: calculateBusinessValueMetric(projects),
        projectRiskMetric: calculateProjectRiskMetric(projects),
        projectCancelledCompleted: calculateProjectCancelledCompleted(projects),
        projectRiskToValueMetric: calculateProjectRiskToValueMetric(projects),
        projectDateMetric: calculateProjectDates(projects)
    });

    useEffect(() => {
        setProjectsMetrics({
            projectStatusMetric: calculateProjectStatusMetric(projects),
            projectBusinessValueMetric: calculateBusinessValueMetric(projects),
            projectRiskMetric: calculateProjectRiskMetric(projects),
            projectCancelledCompleted: calculateProjectCancelledCompleted(projects),
            projectRiskToValueMetric: calculateProjectRiskToValueMetric(projects),
            projectDateMetric: calculateProjectDates(projects)
        });
    }, [projects, calculateProjectStatusMetric, calculateBusinessValueMetric, calculateProjectRiskMetric, calculateProjectRiskToValueMetric, calculateProjectDates]);

    // Project Metrics
    const { projectStatusMetric, projectBusinessValueMetric, projectRiskMetric, projectRiskToValueMetric, projectDateMetric, projectCancelledCompleted } = projectsMetrics;

    return (
        <Container fluid>
            <Row>
                <Col style={{marginTop:'1em'}} sm={12} md={4}>
                    <Paper>
                        <GraphCard graph={<CancelledCompletedChart/>} title="Cancelled Vs. Completed Projects" content={null}/>
                    </Paper>
                </Col>
                <Col style={{marginTop:'1em'}} sm={12} md={8}>
                    <GraphCard graph={<ProjectRiskToValueChart data={projectRiskToValueMetric}/>} title="Project Risk vs Business Value" content={BusinessValueVsProjectRiskDescription}/>
                </Col>
            </Row>
        </Container>
    );
};

const GraphCard = ({graph, title, content}) => {
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
                    {graph}
                    <Divider/>
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


                </CardContent>
                { content === null ? null :
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {content}
                        </CardContent>
                    </Collapse>
                }

            </Card>
    );
}

const BusinessValueVsProjectRiskDescription = (<>
              <h3>What is Business Value?</h3>
              <ul>
                  <li>
                      Marginal Benefit: Small quality or financial improvements.
                  </li>

                  <li>
                      Little Benefit: Some quality and financial improvements.
                  </li>

                  <li>
                      Large Benefit: Remarkable quality and/or financial improvements.
                  </li>

                  <li>
                      Signifiant Benefit: Significant improvements in quality and/or financials.
                  </li>
                </ul>
</>);
export default ProjectsDashboard;
