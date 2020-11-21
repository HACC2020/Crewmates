import React from 'react';
import { useData } from '../../providers/DataProvider';
import { scaleLinear, scaleBand, max } from 'd3';
// Material UI
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const BusinessCriticalityChart = () => {
    const { applications, calculateBusinessCriticalityMetric } = useData();
    const { administrativeService, businessOperational, businessCritical, missionCritical, missing } = 
        calculateBusinessCriticalityMetric(applications);

    // The data to display
    const CRITICALITY_DATA = [
        {name:'Administrative Service', value: administrativeService, color:'var(--warning-color-green)'},
        {name:'Business Operational', value: businessOperational, color:'var(--warning-color-lightgreen)'},
        {name:'Business Critical', value: businessCritical, color:'var(--warning-color-yellow)'},
        {name:'Mission Critical', value: missionCritical, color:'var(--warning-color-red)'},
        {name:'Missing', value: missing, color:'var(--missing-data-color)'}
    ];

    const width = 150;
    const height = 150;
    // const margin = {top: 10, right: 5, bottom: 15, left: 5};
    const margin = {top: 10, right: 5, bottom: 10, left: 5};

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
        <g key={`BusinessCriticality-${x(d.name)*index}-${y(d.value)*index}`} fill={d.color}>
            <Tooltip placement="right" title={
                <React.Fragment>
                    {
                        d.name !== 'Missing' ?
                        <Typography variant='body1'>{d.value} are 
                            <span style={{borderRadius:'10px',color:d.color, background:'var(--theme-color-5)', padding:'0.2em'}}>  {d.name}  </span> 
                            applications
                        </Typography>
                        :
                        <Typography variant='h6'>{d.value} applications missing data
                        </Typography>
                    }
                </React.Fragment>
                }>
                <rect 
                    x={x(d.name)} 
                    y={y(d.value)}
                    height={y(0)-y(d.value)}
                    width={x.bandwidth()}/>
            </Tooltip>
            <text
                x={x(d.name)+(x.bandwidth()/2)} 
                y={y(d.value)-2}
                fill="black"
                textAnchor="middle" 
                fontSize="2em"
                >{d.value}</text>
        </g>);

    const labels = CRITICALITY_DATA.map((d, index) => {
        const labelX =  x(d.name)+(x.bandwidth()/2);
        const labelY = (height-margin.bottom+3);
        const labelNames = d.name.split(' ');

        return (
        <React.Fragment key={`BusinessCriticality-${labelX}-${labelY}`}>
            <text 
                fontSize={`1.5em`}
                textAnchor="middle"
                x={labelX} y={labelY}>{labelNames[0]}</text>
            { labelNames.length > 1 
                ? 
                <text key={`BusinessCriticality-${labelX+1}-${labelY+1}`} 
                fontSize={`1.5em`}
                textAnchor="middle"
                x={labelX} y={labelY+3}>{labelNames[1]}</text>
                : null

            }
        </React.Fragment>
        );
    });
    return (
    <svg fontSize={`2`} viewBox={`0, 0, ${width}, ${height}`}>
        <g translate={`translate${margin.left},${height-margin.bottom}`}>
            {bars}
            {labels}
        </g>
    </svg>);
}

export default BusinessCriticalityChart;