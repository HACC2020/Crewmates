import React from 'react';
import { useData } from '../../providers/DataProvider';
import { scaleTime, scaleBand, min, max, axisBottom, axisTop, select } from 'd3';
import moment from 'moment';
import _ from 'lodash';
import { buildData, getMinDate, getMaxDate } from './projectTimelineFunctions';

const ProjectTimeline = () => {
    const { projects } = useData();

    const width = 500;
    const height = 2500;

    const margin = {top: 20, right: 55, bottom: 20, left: 20};

    const data = buildData(projects);
    const minDate = getMinDate(data); // minDate contains a moment object
    const maxDate = getMaxDate(data); // maxDate also contains a moment object

    const x = scaleTime()
        .domain([minDate.toDate(), maxDate.toDate()])
        .range([width/2, width - margin.right]);
        // .range([margin.left+230, width - margin.right]);

    const y = scaleBand()
        .domain(data.map(d => d.id))
        .range([margin.top, height - margin.bottom])
        .padding(0.2);

    const Bars = () => {

        return (
            <g transform={`translate(${margin.left},${margin.top})`}>
                {data.map((d, index) => {
                    const MAX_LENGTH = 50;
                    let projectName = d.name;
                    if(d.name.length > MAX_LENGTH) projectName = projectName.slice(0, MAX_LENGTH) + '...'
                    return (
                        <>
                        {index % 2 !== 0 ? null :
                            <rect
                                y={y(d.id)}
                                height={y.bandwidth()}
                                width={width - margin.right}
                                fill="var(--theme-color-4)"
                                />
                        }
                        <text 
                            fontSize={7} 
                            x={0}
                            y={y(d.id)+(y.bandwidth())-1}>{projectName}</text>
                        <text 
                            textAnchor='end' 
                            fontSize={7}
                            x={x(moment(d['lifecycleCustom:projectedStart']).toDate())-2}
                            y={y(d.id)+(y.bandwidth())-1}>{moment(d['lifecycleCustom:projectedStart']).format('MMM YYYY')}</text>
                        <rect
                            x={x(moment(d['lifecycleCustom:projectedStart']).toDate())}
                            y={y(d.id)}
                            height={y.bandwidth()}
                            width={
                                x(moment(d['lifecycleCustom:projectedCompletion']).toDate()) 
                                    - x(moment(d['lifecycleCustom:projectedStart']).toDate())}
                            fill="var(--theme-color-1)"
                        />
                        <text 
                            fontSize={7} 
                            x={x(moment(d['lifecycleCustom:projectedCompletion']).toDate())+2}
                            y={y(d.id)+(y.bandwidth())-1}>{moment(d['lifecycleCustom:projectedCompletion']).format('MMM YYYY')}</text>
                        </>
                    );
                })
            }
            </g>
        );
    };
    
    const Axes = () => {
        const middleTick = Math.ceil( (maxDate.get('year') + minDate.get('year')) /2);
        const secondTick = Math.ceil( (maxDate.get('year') - minDate.get('year')) * (1/4) + minDate.get('year'));
        const fourthTick = Math.ceil( (maxDate.get('year') - minDate.get('year')) * (3/4) + minDate.get('year'));
    
        const years = [
            minDate.toDate(), 
            moment(`${secondTick}`).toDate(), 
            moment(`${middleTick}`).toDate(), 
            moment(`${fourthTick}`).toDate(), 
            maxDate.toDate()];
            
        const topAxis = axisTop(x)
            .ticks(years.length)
            .tickValues(years)
            .tickFormat(value => moment(value).format('YYYY'))
            .tickSize(4);

        const topAxisRef = axis => {
            axis && topAxis(select(axis));
        }
        const topTransform = `translate(${margin.left}, ${margin.top})`;

        return (
            // <g transform={`translate(${margin.left},${margin.top})`}>
            //     <line 
            //         opacity={0.3} 
            //         x1={x(minDate.toDate())} 
            //         y1={0} 
            //         x2={x(maxDate.toDate())} 
            //         y2={0} 
            //         stroke="black" />
            // </g>
            <g transform={topTransform} ref={topAxisRef} />
        );
    }

    const Label = () => {
        return (<g transform={`translate(${margin.left}, ${margin.top})`}>
            <text y={15} fontSize={10}>IT Project</text>
        </g>)
    }
    return (
        <svg viewBox={`0, 0, ${width}, ${height}`}>
            <Bars/>
            <Axes/>
            <Label/>
        </svg>
    );
}


export default ProjectTimeline;