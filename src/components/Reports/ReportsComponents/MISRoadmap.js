import React, { useState, useEffect } from 'react';
import { useData } from '../../../providers/DataProvider';
import Chip from '@material-ui/core/Chip';
import { scaleLinear, axisTop, select } from 'd3';
import { Container, Row, Col } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import moment from 'moment';

const MISRoadmap = () => {

	const { applications, projects, calculateMISRelations } = useData();

	const [projectsMetrics, setProjectsMetrics] = useState({
        MISRelations: calculateMISRelations(projects),
    });

    useEffect(() => {
        setProjectsMetrics({
            MISRelations: calculateMISRelations(applications, projects),
        });
    }, [applications, projects, calculateMISRelations]);

    // data for table
    const { MISRelations } = projectsMetrics;
    const { MISAppsSuccessors, MISAppsStandalone } = MISRelations;

    const margin = {top: 50, right: 20, bottom: 10, left: 20};

    // render bar for a legacy application
    const Legs = ({data, height}) => {
        return (
            data.legacy.map((legacy, index) => {
                let end = 431;
                let start =  431; // half of total
                const eol = legacy['lifecycle:endOfLife'];
                const active = legacy['lifecycle:active'];
                const plan = legacy['lifecycle:plan'];
                const color = 'orangered';  // change later
                let circ = false;

                if ((eol === null) || (active === null)) {
                    circ = true;
                }

                if (eol !== null) {
                    let months = (parseInt(eol.substring(0,4)) - 1985) * 12;
                    months += parseInt(eol.substring(5,7));
                    end = months;
                }

                if (active !== null) {
                    let months = (parseInt(active.substring(0,4)) - 1985) * 12;
                    months += parseInt(active.substring(5,7));
                    start = months;
                } else if (plan !== null) {
                    let months = (parseInt(plan.substring(0,4)) - 1985) * 12;
                    months += parseInt(plan.substring(5,7));
                    start = months;
                }

                return (
                    <g key={`${legacy.name}${data.name}`} transform={`translate(${start},${height - (index + 1) * 35} )`}>
                        {!circ ? <rect height={25} width={end - start} fill={color}/> :
                            <circle cy={25/2} r={25/4} fill={color} />
                        }
                        <text transform={`translate(0, -1)`} fontSize={'.5em'} fill={'black'}>{legacy.name}</text>
                    </g>
                )}
            )
        )
    }

    // render bar for projects related to an application
    const Projs = ({data, height}) => {
        return (
            data.projects.map((project, index) => {
                let end = 431;
                let start =  431;
                const eol = project['lifecycleCustom:projectedCompletion'];
                const active = project['lifecycleCustom:projectedStart'];
                const color = 'var(--theme-color-2)';
                let circ = false;

                if ((eol === null) || (active === null)) {
                    circ = true;
                }   

                if (eol !== null) {
                    let months = (parseInt(eol.substring(0,4)) - 1985) * 12;
                    months += parseInt(eol.substring(5,7));
                    end = months;
                }

                if (active !== null) {
                    let months = (parseInt(active.substring(0,4)) - 1985) * 12;
                    months += parseInt(active.substring(5,7));
                    start = months;
                }

                return (
                    <g key={`${project.name}${data.name}`} transform={`translate(${start},${(index + 1) * 35} )`}>
                        {!circ ? <rect height={25} width={end - start} fill={color}/> :
                            <circle cy={25/2} r={25/4} fill={color} />
                        }
                        <text transform={`translate(5, -1)`} fontSize={'.5em'} fill={'black'}>{project.name}</text>
                    </g>
                )}
            )
        )
    }

    // render bar for a modernization application
    const Modern = ({data, height}) => {
        let end = 431;
        let start =  431; // half of total
        const eol = data.modern['lifecycle:endOfLife'];
        const active = data.modern['lifecycle:active'];
        const plan = data.modern['lifecycle:plan'];
        const color = 'var(--theme-color-1)';  // change later
        let circ = false;

        if ((eol === null) || (active === null)) {
            circ = true;
        }

        if (eol !== null) {
            let months = (parseInt(eol.substring(0,4)) - 1985) * 12;
            months += parseInt(eol.substring(5,7));
            end = months;
        }

        if (active !== null) {
            let months = (parseInt(active.substring(0,4)) - 1985) * 12;
            months += parseInt(active.substring(5,7));
            start = months;
        } else if (plan !== null) {
            let months = (parseInt(plan.substring(0,4)) - 1985) * 12;
            months += parseInt(plan.substring(5,7));
            start = months;
        }

        return (
            <g transform={`translate(${start},0 )`}>
                {!circ ? <rect height={25} width={end - start} fill={color}/> :
                    <circle cy={25/2} r={25/4} fill={color} />
                }
                <text transform={`translate(5, -1)`} fontSize={'.5em'} fill={'black'}>{data.modern.name}</text>
            </g>
        )
    }

    // creates the app details for apps with a legacy parent
    const AppDetails = ({ data }) => {
        const { modern, legacy } = data;
        const modernActive = modern['lifecycle:active'];
        const modernPlan = modern['lifecycle:plan'];
        return (
            <div>
                TIME Tag: <ChipHelper data={data}/>
                <h3>{modern.name}</h3>
                {/*show available date related to app*/}
                {modernActive ? <p style={{color: 'grey'}} >Active Start Date: {moment(modernActive).format('YYYY MMM D')}</p> :
                modernPlan ? <p style={{color: 'grey'}} >Planning Start Date: {moment(modernPlan).format('YYYY MMM D')}</p> : null}
                <Row>
                    <Col sm={6} md={6}> <h5 style={{ textDecoration: 'underline'}}>Legacy App Details</h5> </Col>
                    <Col sm={6} md={6}> <h5 style={{ textDecoration: 'underline'}}>Modernized App Details</h5> </Col>
                </Row>
                <Row>
                    <Col sm={6} md={6}>
                        <p style={{fontSize: 13}}><b>Business Criticality</b>
                        <br/><span style={{padding: '2em'}}>
                        {legacy[0].businessCriticality ? _.startCase(legacy[0].businessCriticality) : 'Missing Data'}</span></p>
                    </Col>
                    <Col sm={6} md={6}>
                        <p style={{fontSize: 13}}><b>Business Criticality</b>
                        <br/><span style={{padding: '2em'}}>
                        {modern.businessCriticality ? _.startCase(modern.businessCriticality) : 'Missing Data'}</span></p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} md={6}>
                        <p><b>Functional Fit</b>
                        <br/><span style={{padding: '2em'}}>
                        {legacy[0].functionalFit ? _.startCase(legacy[0].functionalFit) : 'Missing Data'}</span></p>
                    </Col>
                    <Col sm={6} md={6}>
                        <p><b>Functional Fit</b>
                        <br/><span style={{padding: '2em'}}>
                        {modern.functionalFit ? _.startCase(modern.functionalFit) : 'Missing Data'}</span></p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} md={6}>
                        <p><b>Technical Fit</b>
                        <br/><span style={{padding: '2em'}}>
                        {legacy[0].technicalFit ? _.startCase(legacy[0].technicalFit) : 'Missing Data'}</span></p>
                    </Col>
                    <Col sm={6} md={6}>
                        <p><b>Technical Fit</b>
                        <br/><span style={{padding: '2em'}}>
                        {modern.technicalFit ? _.startCase(modern.technicalFit) : 'Missing Data'}</span></p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} md={6}>
                        <p><b>Hosting Type</b>
                        <br/><span style={{padding: '2em'}}>
                        {legacy[0].hostingTypeTag ? _.startCase(legacy[0].hostingTypeTag) : 'Missing Data'}</span></p>
                    </Col>
                    <Col sm={6} md={6}>
                        <p><b>Hosting Type</b>
                        <br/><span style={{padding: '2em'}}>
                        {modern.hostingType ? _.startCase(modern.hostingTypeTag) : 'Missing Data'}</span></p>
                    </Col>
                </Row>
            </div>
        );
    }

    // creates the app details for apps without a legacy parent
    const AppStandaloneDetails = ({ data }) => {
        const { modern } = data;
        const modernActive = modern['lifecycle:active'];
        const modernPlan = modern['lifecycle:plan'];
        return (
            <div>
                TIME Tag: <ChipHelper data={data}/>
                <h3 style={{color: 'var(--prussian-blue)'}}>{modern.name}</h3>
                {/*show available date related to app*/}
                {modernActive ? <p style={{color: 'grey'}} >Active Start Date: {moment(modernActive).format('YYYY MMM D')}</p> :
                modernPlan ? <p style={{color: 'grey'}} >Planning Start Date: {moment(modernPlan).format('YYYY MMM D')}</p> : null}
                <Row>
                    <Col> <h5 style={{ textDecoration: 'underline'}}>Application Details</h5> </Col>
                </Row>
                <Row>
                    <Col sm={6} md={6}>
                        <p><b>Business Criticality</b>
                        <br/><span style={{padding: '2em'}}>
                        {modern.businessCriticality ? modern.businessCriticality : 'Missing Data'}</span></p>
                    </Col>
                    <Col sm={6} md={6}>
                        <p><b>Functional Fit</b>
                        <br/><span style={{padding: '2em'}}>
                        {modern.functionalFit ? modern.functionalFit : 'Missing Data'}</span></p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6} md={6}>
                        <p><b>Hosting Type</b>
                        <br/><span style={{padding: '2em'}}>
                        {modern.hostingTypeTag ? modern.hostingTypeTag : 'Missing Data'}</span></p>
                    </Col>
                    <Col sm={6} md={6}>
                        <p><b>Technical Fit</b>
                        <br/><span style={{padding: '2em'}}>
                        {modern.technicalFit ? modern.technicalFit : 'Missing Data'}</span></p>
                    </Col>
                </Row>
            </div>
        );
    }

    // creates and color codes the status chip
    const ChipHelper = ({ data }) => {
        const { modern } = data;
        const tag = modern.timeTag ? modern.timeTag : 'n/a';
        let color = 'lightgrey';
        let textColor = 'black';
        
        switch (tag) {
            case 'Tolerate':
                color = 'blue';
                textColor = 'white';
                break;
            case 'Invest':
                color = 'var(--warning-color-green)';
                textColor = 'white';
                break;
            case 'Migrate':
                color = 'var(--warning-color-yellow)';
                textColor = 'black';
                break;
            case 'Eliminate':
                color = 'var(--warning-color-red)';
                textColor = 'white';
                break;
            default:
                color = 'lightgrey';
                textColor = 'black';
                break;
        }

        return (<Chip style={{backgroundColor: `${color}`, color: `${textColor}`}} size="medium" label={tag}/>);
    }

    // bottom half of each card, which is where the svg code sits
    const SVGwrap = ({data, index, legacy}) => {
        // each bar will have height 25 marginTopBot 5
        const numProjects = data.projects.length * 35;
        let numLegacy = 0;  // number of legacy apps
        if (legacy) {
            numLegacy = data.legacy.length * 35;
        }
        // projects and legacy height total plus modern app height
        const height = numProjects + numLegacy + 35 + margin.top + margin.bottom; 
        const width = 580;

        return (
            <React.Fragment>
                { legacy ? <AppDetails data={data}/> : 
                <AppStandaloneDetails data={data}/>}

                <svg style={{overflow: 'visible'}} viewBox={`0, 0, ${width}, ${height}`}>
                    {drawAxes()}
                    <g transform={`translate(${margin.left}, ${35})`}>
                        { legacy ? <Legs data={data} height={height - margin.top - margin.bottom} /> : ''}
                        <Projs data={data} height={height - margin.top - margin.bottom} />
                        <Modern data={data} height={height - margin.top - margin.bottom} />
                    </g>
                    <line 
                        opacity={0.3} 
                        x1={0} 
                        y1={height - 1} 
                        x2={width} 
                        y2={height - 1} 
                        stroke="black" />
                    <circle cx={width / 4} cy={height + 10} r={25/5} fill={'var(--theme-color-4)'} stroke={'black'} strokeWidth={0.2} />
                    <text transform={`translate(${width / 4 + 10}, ${height + 14})`} fontSize={'.8em'} fill={'black'}>Insufficient Data</text>
                    <rect x={width / 2 -10} y={height + 5} height={10} width={20} fill={'var(--theme-color-4)'}/>
                    <text transform={`translate(${width / 4 * 2 + 18}, ${height + 14})`} fontSize={'.8em'} fill={'black'}>Sufficient Data</text>
                </svg>
            
            </React.Fragment>
        )
    };

    // render block for apps that are successors to a legacy app
    const MISsuccessors = MISAppsSuccessors.map((data, index) => {
        return (
            <Col key={`${data}${index}`} style={{marginTop: '1em'}} sm={12} md={6}>
                <Paper style={{ padding: '2em', backgroundColor: 'white', color: 'black'}} elevation={2} square>
                    <SVGwrap key={data.modern.id} data={data} index={index} legacy={true} />
                </Paper>
            </Col>  
            );
    });

    // render block for apps that are not a successor app
    const MISstandalone = MISAppsStandalone.map((data, index) => {
        return (
            <Col key={`${data}${index}`} style={{marginTop: '1em'}} sm={12} md={6}>
                <Paper style={{ padding: '2em', backgroundColor: 'white', color: 'black'}} elevation={2} square>
                    <SVGwrap key={data.modern.id} data={data} index={index} legacy={false} />
                </Paper>
            </Col>
            );
    });


    // Function to spit out correct x coordinate of the bar ticks
    const xMonthScale = scaleLinear()
        .domain([1985, 2030])
        .range([0, 580 - margin.left - margin.right]);

    // axis
    const drawAxes = () => {
        
        const years = [1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025, 2030];
        // position the axes
        const topAxis = axisTop(xMonthScale)
            .ticks(years.length)
            .tickValues(years)
            .tickFormat(value => `${value}`)
            .tickSize(4);

        const topAxisRef = axis => {
            axis && topAxis(select(axis));
        }

        const topTransform = `translate(${margin.left}, 20)`;

        return (
            <React.Fragment>
                <g transform={topTransform} ref={topAxisRef} />
            </React.Fragment>
        );
    };

    const fields = [{name: 'Legacy', color: 'var(--warning-color-red)'},
                    {name: 'Project', color: 'var(--theme-color-2)'},
                    {name: 'Modern', color: 'var(--theme-color-1)'},];

    const legend = fields.map(field => {
        return (
            <React.Fragment key={field.name}>
                <Chip  style={{backgroundColor: `${field.color}`, marginLeft: 10, marginBottom: 10, color: 'white'}} size="medium" label={field.name}/>
                
            </React.Fragment>
        )
    });

    // component return function
    return(
        <Container style={{padding:'0'}} fluid>
            <Row>
                <Col>
                    <Paper style={{ padding:'2em', backgroundColor:'var(--theme-color-2)', color:'white'}} elevation={2} square>
                        <Typography variant="h3">Major Information Systems - Modernization Roadmap</Typography>
                        <Typography variant="body2">
                            A major information system (MIS) application is an application that is critical to day to day operations.
                            This Roadmap shows the projects and applications that are working towards the modernization of these
                            important systems.

                        </Typography>
                    </Paper>
                </Col>
            </Row>

            <Row style={{marginTop:'1em'}}>
                <Col>
                    
                        {legend}
                        <div style={{overflowY:'scroll', height:'80vh'}}>
                            <Container style={{padding: '0'}} fluid>
                                <Row style={{marginTop: '1em', marginBottom: '2em'}}>
                                    {MISsuccessors}
                                </Row>
                            </Container>
                            <Container style={{padding: '0'}} fluid>
                                <Row style={{marginTop: '1em', marginBottom: '2em'}}>
                                    {MISstandalone}
                                </Row>
                            </Container>
                        </div>
                    
                </Col>
            </Row>
            {/* 
            <svg viewBox={`0, 0, 580, 20`}>
                <g>
                    {drawAxes()}
                </g>
            </svg>
            <div style={{overflowY:'scroll', overflowX:'scroll', height:'80vh'}}>
                {MISsuccessors}
                {MISstandalone}
            </div>
            */}
    	</Container>
    );
};

export default MISRoadmap;