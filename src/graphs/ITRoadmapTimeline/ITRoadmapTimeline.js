import React from 'react';
import { useData } from '../../providers/DataProvider';
import _ from 'lodash';
import moment from 'moment'
import { scaleTime, scaleBand} from 'd3';
import { getMinDate, getMaxDate, buildData, getApplications, fieldToRating, mapRatingToColor } from './ITRoadmapTimelineFunctions';
// Material UI
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
// React bootstrap
import { Col } from 'react-bootstrap';

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
    let missingApplicationsData = [];

    const projectStatusColor = mapRatingToColor('projectStatus', fieldToRating(projectStatus));
    const businessValueColor = mapRatingToColor('businessValue', fieldToRating(businessValue));
    const projectRiskColor = mapRatingToColor('projectRisk', fieldToRating(projectRisk));

    let missingData = [];
    if(!projectStatus) missingData.push('projectStatus')
    if(!businessValue) missingData.push('businessValue')
    if(!projectRisk) missingData.push('projectRisk')
    if(!planningStarted && !approved && !projectedStart && !cancelled && !projectedCompletion) missingData.push('lifecycle')

    const svgWidth = 300;
    const svgHeight = 200;
    const svgMargin = {top: 20, right: 10, bottom: 10, left: 10};

    let dates = [];
    if(planningStarted) dates.push(planningStarted);
    if(approved) dates.push(approved);
    if(projectedStart) dates.push(projectedStart);
    if(cancelled) dates.push(cancelled);
    if(projectedCompletion) dates.push(projectedCompletion);

    if(applicationsData.length > 0) {
        _.forEach(applicationsData, a => {
            if(a['lifecycle:plan']) dates.push(a['lifecycle:plan'])
            if(a['lifecycle:active']) dates.push(a['lifecycle:active'])
            if(a['lifecycle:endOfLife']) dates.push(a['lifecycle:endOfLife'])

            if(!a['lifecycle:plan'] && !a['lifecycle:active'] && !a['lifecycle:endOfLife']) {
                missingApplicationsData.push(a);
            }
        })
    }
    if(applicationsData.length === missingApplicationsData.length)  missingData.push('Application Lifecycle')

    let minDate = getMinDate(dates); // Returns a moment object
    let maxDate = getMaxDate(dates); // Returns a moment object

    if(dates.length === 1 || maxDate.diff(minDate) === 0) {
        maxDate = moment();
    }

    let timelineData = [];
    if(!_.includes(missingData, 'lifecycle')) timelineData.push(data)
    timelineData = [...timelineData, ...applicationsData];

    let x;
    let y;
    x = scaleTime()
        .domain([minDate.toDate(), maxDate.toDate()])
        .range([0, svgWidth - svgMargin.right - svgMargin.left]);
    y = scaleBand()
            .domain(timelineData.map(d => d.id))
            .range([0, svgHeight - svgMargin.bottom - svgMargin.top])
            .padding(0.2);

    const ProjectBar = () => {
        let projectDates = [];
        if(planningStarted) projectDates.push({phase: 'planningStarted', date: moment(planningStarted).toDate()});
        if(approved) projectDates.push({phase: 'approved', date: moment(approved).toDate()});
        if(projectedStart) projectDates.push({phase: 'projectedStart', date: moment(projectedStart).toDate()});
        if(projectedCompletion) projectDates.push({phase: 'projectedCompletion', date: moment(projectedCompletion).toDate()});

        if(projectDates.length > 1) {
            const startDate = projectDates[0].date;
            const endDate = projectDates[projectDates.length-1].date;
            let lines = [];
            _.forEach(projectDates, p => lines.push(p));

            return (<>
                <Tooltip title={
                    <React.Fragment>
                            <Typography variant="h6">{name}</Typography>
                            { projectDates.map(p => <Typography variant="body1">{_.startCase(p.phase)}: {moment(p.date).format('MMM YYYY')}</Typography>)}
                    </React.Fragment>}>
                    <rect fill="var(--theme-color-2)" 
                    x={x(startDate)} 
                    y={y(id)} 
                    width={x(endDate) - x(startDate)} 
                    height={y.bandwidth()}/>
                </Tooltip>
                { lines.map(l => 
                    <Tooltip title={
                        <React.Fragment>
                            <Typography variant="body1">{_.startCase(l.phase)}: {moment(l.date).format('MMM YYYY')}</Typography>
                        </React.Fragment>}>                    
                    <line strokeWidth={1} strokeDasharray={0} opacity={0.5} stroke='black' x1={x(l.date)} x2={x(l.date)} 
                        y1={y(id)} y2={y(id)+y.bandwidth()}/>
                    </Tooltip>
                    )}
            </>);
        } else if(projectDates.length === 1) {
            let lines = [];
            _.forEach(projectDates, p => lines.push(p));
            return (<>
                { lines.map(l => 
                    <Tooltip title={
                        <React.Fragment>
                            <Typography variant="h6">{name}</Typography>
                            <Typography variant="body1">{_.startCase(l.phase)}: {moment(l.date).format('MMM YYYY')}</Typography>
                        </React.Fragment>}> 
                    <line strokeWidth={3} stroke='var(--theme-color-2)' x1={x(l.date)} x2={x(l.date)} 
                        y1={y(id)} y2={y(id)+y.bandwidth()}/>
                    </Tooltip>
                    )}
            </>);
        } else { return null }
    }

    const ApplicationBar = ({app}) => {
        let applicationDates = [];
        if(app['lifecycle:plan']) applicationDates.push({phase: 'plan', date: moment(app['lifecycle:plan']).toDate()})
        if(app['lifecycle:active']) applicationDates.push({phase: 'active', date: moment(app['lifecycle:active']).toDate()})
        if(app['lifecycle:endOfLife']) applicationDates.push({phase: 'endOfLife', date: moment(app['lifecycle:endOfLife']).toDate()})

        if(applicationDates.length > 1) {
            const startDate = applicationDates[0].date;
            const endDate = applicationDates[applicationDates.length-1].date;
            let lines = [];
            _.forEach(applicationDates, p => lines.push(p));

            return (<>
                <Tooltip title={
                    <React.Fragment>
                            <Typography variant="h6">Application: {app.name}</Typography>
                            { applicationDates.map(p => <Typography variant="body1">{_.startCase(p.phase)}: {moment(p.date).format('MMM YYYY')}</Typography>)}
                    </React.Fragment>}>
                    <rect fill="var(--theme-color-1)" 
                    x={x(startDate)} 
                    y={y(app.id)} 
                    width={x(endDate) - x(startDate)} 
                    height={y.bandwidth()}/>
                </Tooltip>
                { lines.map(l => 
                    <line strokeWidth={2} stroke='var(--theme-color-1)' x1={x(l.date)} x2={x(l.date)} 
                        y1={y(app.id)} y2={y(app.id)+y.bandwidth()}/>
                    )}
            </>);
        } else if(applicationDates.length === 1) {
            let lines = [];
            _.forEach(applicationDates, p => lines.push(p));
            return (<>
                { lines.map(l => 
                    <Tooltip title={
                        <React.Fragment>
                            <Typography variant="h6">{app.name}</Typography>
                            <Typography variant="body1">{_.startCase(l.phase)}: {moment(l.date).format('MMM YYYY')}</Typography>
                        </React.Fragment>}> 
                    <line strokeWidth={2} stroke='var(--theme-color-1)' x1={x(l.date)} x2={x(l.date)} 
                        y1={y(app.id)} y2={y(app.id)+y.bandwidth()}/>
                    </Tooltip>
                    )}
            </>);
        } else { 
            return null;
        }
    }

    const ApplicationBars = () => {
        if(applicationsData.length === 0) { return null}
        else {
            return (<>
            {applicationsData.map(app => <ApplicationBar key={`Appbar:${app.id}`} app={app}/>)}
            </>);
        }
    }
    const Axis = () => {
        return (
        <>
            <text fontSize={10} x={x(minDate.toDate())+2} y={-4}>{minDate.format('MMM YYYY')}</text>
            <text fontSize={10} textAnchor='end' x={x(maxDate.toDate())-2} y={-4}>{maxDate.format('MMM YYYY')}</text>
            <line strokeWidth={0.5} stroke="black" x1={x(minDate.toDate())} y1={0} y2={0} x2={x(maxDate.toDate())}/>
            <line strokeWidth={0.5} stroke="black" x1={x(minDate.toDate())} y1={-3} y2={3} x2={x(minDate.toDate())}/>
            <line strokeWidth={0.5} stroke="black" x1={x(maxDate.toDate())} y1={-3} y2={3} x2={x(maxDate.toDate())}/>
        </>);
    }
    const GraphTitle = () => (<text textAnchor='middle' x={svgWidth/2} y={svgMargin.top-2}>Timeline</text>);
    const Legend = () => {
        return (<g transform={`translate(${(svgWidth-svgMargin.left-svgMargin.right)/2},${svgHeight-svgMargin.top-svgMargin.bottom})`}>
            <rect width={8} height={8} fill='var(--theme-color-2)'/>
            <text fontSize='8' x={10} y={7}>Project</text>
            <rect x={50} width={8} height={8} fill='var(--theme-color-1)'/>
            <text fontSize='8' x={60} y={7}>Application</text>
        </g>);
    }
    return (
    <Col style={{marginTop:'1em'}} sm={12} md={4}>
        <Paper style={{padding:'1em'}} square elevation={3}>
                Status: { projectStatus ? <Chip size='small' style={{background:projectStatusColor, color:'white'}} label={_.startCase(projectStatus)}/>
                    : <Chip size='small' style={{background:projectStatusColor}} label='n/a'/>}
            <Typography variant="h5">{name}</Typography>
            <Typography variant="caption">{ownerAgencyName}</Typography>
                <div>
                { businessValue ?  <Chip style={{background:businessValueColor, color:'white'}} label={_.startCase(businessValue)}/>
                    : null}
                { projectRisk ? <Chip style={{background:projectRiskColor, color:'white'}} label={_.startCase(projectRisk)}/>
                    : null}                
                { missingData.length > 0 ? 
                    <Typography component='p' style={{margin:'0.5em'}} variant='caption'>
                        Missing Data: {missingData.map((o,index) => 
                            <Typography style={{fontStyle:'italic'}} variant='caption'>
                                {`${_.startCase(o)}${index === missingData.length-1 ? '' : ', '}`}
                            </Typography>
                        )}
                    </Typography>
                    : null}
                </div>
        <Divider/>
        {_.includes(missingData, 'lifecycle') && missingApplicationsData.length > 0 ? null
            :
                <svg style={{marginBottom:'1em'}} viewBox={`0, 0, ${svgWidth}, ${svgHeight}`}>
                    <GraphTitle/>
                    <g transform={`translate(${svgMargin.left},${svgMargin.top})`}>
                        <ProjectBar/>
                        <ApplicationBars/>
                        <Axis/>
                        <Legend/>
                    </g>
                </svg>
        }

                { missingApplicationsData.length > 0 ?
                    missingApplicationsData.map(app => {
                        return (<Tooltip title={
                            <React.Fragment>
                                <Typography style={{fontStyle:'italic'}} variant='body1'>Missing Lifecycle Data</Typography>
                                <Typography variant='h6'>{app.name}</Typography>
                            </React.Fragment>
                        }><Chip label={app.name}/></Tooltip>);
                    })
                : null}
        </Paper>
    </Col>);
}











export default ITRoadmapTimeline;