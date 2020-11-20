import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { Container, Row, Col} from 'react-bootstrap';
import CancelledCompletedChart from '../../graphs/Projects/CancelledCompletedChart';
import ProjectRiskToValueChart from '../../graphs/ProjectRiskToValueChart/ProjectRiskToValueChart';
import ProjectBusinessValueChart from '../../graphs/Projects/ProjectBusinessValueChart';
import ProjectRiskChart from '../../graphs/Projects/ProjectRiskChart';
import ProjectStatusChart from '../../graphs/Projects/ProjectStatusChart';

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
    }, [projects, calculateProjectCancelledCompleted, calculateProjectStatusMetric, calculateBusinessValueMetric, calculateProjectRiskMetric, calculateProjectRiskToValueMetric, calculateProjectDates]);

    // Project Metrics
    // const { projectStatusMetric, projectBusinessValueMetric, projectRiskMetric, projectRiskToValueMetric, projectDateMetric, projectCancelledCompleted } = projectsMetrics;
    const { projectRiskToValueMetric } = projectsMetrics;

    return (
        <Container style={{padding:'0'}} fluid>
            <Row>
                <Col style={{marginTop:'1em'}} sm={12} md={4}>
                    <Paper elevation={2} square>
                        <GraphCard graph={<CancelledCompletedChart/>} title="Cancelled Vs. Completed Projects" content={null}/>
                    </Paper>
                </Col>

                <Col style={{marginTop:'1em'}} sm={12} md={4}>
                    <Paper style={{height:'100%'}} elevation={2} square>
                        <GraphCard graph={<ProjectBusinessValueChart/>} title="Project Business Value" content={ProjectBusinessValueDescription}/>
                    </Paper>
                </Col>

                <Col style={{marginTop:'1em'}} sm={12} md={4}>
                    <Paper style={{height:'100%'}} elevation={2} square>
                        <GraphCard graph={<ProjectRiskChart/>} title="Project Risk" content={ProjectRiskDescription}/>
                    </Paper>
                </Col>

                <Col style={{marginTop:'1em'}} sm={12} md={8}>
                    <Paper elevation={2} square>
                        <GraphCard graph={<ProjectRiskToValueChart data={projectRiskToValueMetric}/>} title="Project Risk vs Business Value" content={null}/>
                    </Paper>
                </Col>

                <Col style={{marginTop:'1em'}} sm={12} md={4}>
                    <Paper style={{height:'100%'}} elevation={2} square>
                        <GraphCard graph={<ProjectStatusChart/>} title="Project Status" content={ProjectStatusDescription}/>
                    </Paper>
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
            <Card style={{borderRadius:'0px', height:'100%'}}>
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

const ProjectBusinessValueDescription = (<>
      <h3>What is Business Value?</h3>
      <ul>
          <li>
              <b>Marginal Benefit:</b> Small quality or financial improvements.
          </li>

          <li>
              <b>Little Benefit:</b> Some quality and financial improvements.
          </li>

          <li>
              <b>Large Benefit:</b> Remarkable quality and/or financial improvements.
          </li>

          <li>
              <b>Signifiant Benefit:</b> Significant improvements in quality and/or financials.
          </li>
        </ul>
</>);

const ProjectRiskDescription = (<React.Fragment>
      <h3>What do these Risks Mean?</h3>
      <ul>
          <li>
              <b>Low Risk:</b> No risks or a minor risk that can be easily mitigated.
          </li>

          <li>
              <b>Moderate Risk:</b> Some effects on quality, timeline or budget that can be mitigated by project management.
          </li>

          <li>
              <b>High Risk:</b> Remarkable effects on quality, timeline or budget require management support.
          </li>

          <li>
              <b>Severe Risk:</b> Intolerable effects on quality and/or timeline and/or budget of a project, requires dedicated management attention and support.
          </li>

          <li>
              <b>Missing Data:</b> Data on project risk was not provided.
          </li>
        </ul>
</React.Fragment>);

const ProjectStatusDescription = (
    <React.Fragment>
        <h3>Different Values of Project Status</h3>
        <ul>
            <li>
                <b>Green:</b> No impact on time, budget, or quality.
            </li>
            <li>
                <b>Yellow:</b> Impact on one of time, budget, or quality.
            </li>
            <li>
                <b>Red:</b> Impact on all three: time, budget, and quality.
            </li>
            <li>
                <b>Missing:</b> No data provided.
            </li>
        </ul>
    </React.Fragment>
);

const BusinessValueVsProjectRiskDescription = (<>
              <h3>What is Business Value?</h3>
              <ul>
                  <li>
                      <b>Marginal Benefit:</b> Small quality or financial improvements.
                  </li>

                  <li>
                      <b>Little Benefit:</b> Some quality and financial improvements.
                  </li>

                  <li>
                      <b>Large Benefit:</b> Remarkable quality and/or financial improvements.
                  </li>

                  <li>
                      <b>Significant Benefit:</b> Significant improvements in quality and/or financials.
                  </li>
                </ul>
</>);
export default ProjectsDashboard;
