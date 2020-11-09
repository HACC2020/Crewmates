import React, { useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { scaleLinear, scaleBand, max, select } from 'd3';


const BusinessCriticalityChart = () => {
    const { applications, calculateBusinessCriticalityMetric } = useData();
    const { administrativeService, businessOperational, businessCritical, missionCritical, missing } = 
        calculateBusinessCriticalityMetric(applications);

    // The data to display
    const CRITICALITY_DATA = [
        {name:'Administrative Service', value: administrativeService, color:'green'},
        {name:'Business Operational', value: businessOperational, color:'blue'},
        {name:'Business Critical', value: businessCritical, color:'skyblue'},
        {name:'Mission Critical', value: missionCritical, color:'red'},
        {name:'Missing', value: missing, color:'gray'}
    ];

    const width = 500;
    const height = 500;
    const margin = {top: 20, right: 30, bottom: 15, left: 30};
    const xRange = [margin.left, width - margin.right]; // Plotting on the x-axis starts from 40-500
    const yRange = [height - margin.bottom, margin.top]; // Plotting on the x-axis starts from 470-20


    // Function to calculate the height of a bar given a data value (i.e., the value of invest, tolerate)
    const y = scaleLinear()
        .domain([0, max(CRITICALITY_DATA, d => d.value)])
        .range(yRange);

    const x = scaleBand()
        .domain(CRITICALITY_DATA.map(d => d.name))
        .rangeRound(xRange)
        .padding(.1);

    const bars = CRITICALITY_DATA.map((d, index) => 
        <g key={`BusinessCriticality-${x(d.name)}-${y(d.value)}`} fill={d.color}>
            <rect 
                x={x(d.name)} 
                y={y(d.value)}
                height={y(0)-y(d.value)}
                width={x.bandwidth()}/>
            <text
                x={x(d.name)+(x.bandwidth()/2)} 
                y={y(d.value)-2}
                fill="black"
                textAnchor="middle" 
                fontSize="6em"
                >{d.value}</text>
        </g>);

    const titleX = 0;
    const titleY = 30;

    const yTitle = <text fontSize={`5em`} x={titleX} y={titleY}>Business Criticality</text>;

    const labels = CRITICALITY_DATA.map((d, index) => {
        const labelX =  x(d.name)+(x.bandwidth()/2);
        const labelY = (height-margin.bottom+10);
        return (
            <text key={`BusinessCriticality-${labelX}-${labelY}`} 
                fontSize={`3em`}
                textAnchor="middle" 
                x={labelX} y={labelY} key={d.name}>{d.name}</text>
        );
    });
    return (
    <svg fontSize={`2`} viewBox={`0, 0, ${width}, ${height}`}>
        <g translate={`translate${margin.left},${height-margin.bottom}`}>
            {bars}
            {yTitle}
            {labels}
        </g>
    </svg>);
}

export default BusinessCriticalityChart;