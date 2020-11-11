import React, { useState, useEffect } from 'react';
import { useData } from '../../../providers/DataProvider';
import Chip from '@material-ui/core/Chip';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { scaleLinear, scaleBand, min, max, axisBottom, axisTop, select } from 'd3';

import './styles.css';

const MISRoadmap = () => {

	const { applications, projects, calculateMISRelations } = useData();

	const [projectsMetrics, setProjectsMetrics] = useState({
        MISRelations: calculateMISRelations(projects),
    });

    useEffect(() => {
        setProjectsMetrics({
            MISRelations: calculateMISRelations(applications, projects),
        });
    }, [applications, projects]);

    // data for table
    const { MISRelations } = projectsMetrics;
    const { MISApps, MISAppsSuccessors, MISAppsStandalone } = MISRelations;
  	// console.log(MISApps);
  	 console.log(MISAppsSuccessors);
  	// console.log(MISAppsStandalone);

    const margin = {top: 50, right: 20, bottom: 10, left: 20};

    const Legs = ({data, height}) => {
        const total = 540;
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
                    <g transform={`translate(${start},${height - (index + 1) * 35} )`}>
                        {!circ ? <rect height={25} width={end - start} fill={color}/> :
                            <circle cy={25/2} r={25/2} fill={color} />
                        }
                        <text transform={`translate(0, -1)`} fontSize={'.5em'} fill={'black'}>{legacy.name}</text>
                    </g>
                )}
            )
        )
    }

    const Projs = ({data, height}) => {
        const total = 540;
        return (
            data.projects.map((project, index) => {
                let end = 431;
                let start =  431;
                const eol = project['lifecycleCustom:projectedCompletion'];
                const active = project['lifecycleCustom:projectedStart'];
                const color = 'lightblue';
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
                    <g transform={`translate(${start},${(index + 1) * 35} )`}>
                        {!circ ? <rect height={25} width={end - start} fill={color}/> :
                            <circle cy={25/2} r={25/2} fill={color} />
                        }
                        <text transform={`translate(5, -1)`} fontSize={'.5em'} fill={'black'}>{project.name}</text>
                    </g>
                )}
            )
        )
    }

    const Modern = ({data, height}) => {
        const total = 540;
        let end = 431;
        let start =  431; // half of total
        const eol = data.modern['lifecycle:endOfLife'];
        const active = data.modern['lifecycle:active'];
        const plan = data.modern['lifecycle:plan'];
        const color = 'lightgreen';  // change later
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
                    <circle cy={25/2} r={25/2} fill={color} />
                }
                <text transform={`translate(5, -1)`} fontSize={'.5em'} fill={'black'}>{data.modern.name}</text>
            </g>
        )
    }

    const SVGwrap = ({data, index}) => {
        // each bar will have height 35 marginTopBot 5
        const numProjects = data.projects.length * 35;
        const numLegacy = data.legacy.length * 35;
        const height = numProjects + numLegacy + 35 + margin.top + margin.bottom;   // projects and legacy height total plus modern app height
        const width = 580;
        const grey = index % 2 === 0 ? 'lightgrey' : 'white';
        return (
            <div style={{background: grey}}>
                <svg viewBox={`0, 0, ${width}, ${height}`}>
                    <text fill={'#004e59'} fontSize={'16px'} x={ 10 } y={ 20 }>{data.modern.name}</text>
                    <line 
                        opacity={0.3} 
                        x1={10} 
                        y1={25} 
                        x2={width - 10} 
                        y2={25} 
                        stroke="black" />
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        <Legs data={data} height={height - margin.top - margin.bottom} />
                        <Projs data={data} height={height - margin.top - margin.bottom} />
                        <Modern data={data} height={height - margin.top - margin.bottom} />
                    </g>
                </svg>
            </div>
        )
    }

    const MISsuccessors = MISAppsSuccessors.map((data, index) => {
        return (<SVGwrap key={data.modern.id} data={data} index={index} />);
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

    const fields = [{name: 'legacy', color: 'orangered'},
                    {name: 'project', color: 'lightblue'},
                    {name: 'modern', color: 'lightgreen'},
                    {name: 'circle: missing data for timeline', color: 'white'}];

    const legend = fields.map(field => {
        return (
            <React.Fragment>
                <Chip key={field.name} style={{backgroundColor: `${field.color}`, marginLeft: 10, marginBottom: 10}} size="medium" label={field.name}/>
                
            </React.Fragment>
        )
    });

    return(
        <div>
            <h1>Major Information Systems Modernization Roadmap</h1>
            {legend}
            <svg viewBox={`0, 0, 580, 20`}>
                <g>
                    {drawAxes()}
                </g>
            </svg>
            <div style={{overflowY:'scroll', overflowX:'scroll', height:'80vh'}}>
                {MISsuccessors}
            </div>
    	</div>
    );
};

export default MISRoadmap;