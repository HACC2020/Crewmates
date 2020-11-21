import React, { useState, useEffect } from 'react';
import { useData } from '../providers/DataProvider';
import { scaleLinear, scaleBand, range } from 'd3';
// Material UI
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const ApplicationHostingTypeChart = () => {
    const { applications, calculateHostingTypeMetric } = useData();

    const [applicationMetrics, setApplicationMetrics] = useState({
        applicationHostingTypeMetric: calculateHostingTypeMetric(applications)
    });

    useEffect(() => {
        setApplicationMetrics({
            applicationHostingTypeMetric: calculateHostingTypeMetric(applications)
        });
    }, [applications, calculateHostingTypeMetric]);

    const { applicationHostingTypeMetric } = applicationMetrics;

    const { onPremise, coLocated, IaaS, PaaS, SaaS, missing } = applicationHostingTypeMetric;

    const data = [ onPremise, coLocated, IaaS, PaaS, SaaS, missing ];
    const labels = ['On Premise', 'Co-Located', 'IaaS', 'PaaS', 'SaaS', 'Missing'];
    const colors = ['var(--theme-color-1)', 'var(--theme-color-3)', 'var(--theme-color-1)', 'var(--theme-color-3)', 'var(--theme-color-1)', 'var(--missing-data-color)'];

    const width = 400;
    const height = 100;
    const margin = {top: 10, right: 50, bottom: 10, left: 75};
    const xRange = [0.5, width - margin.left - margin.right]; // Plotting on the x-axis starts from 40-350
    const yRange = [0, height - margin.top - margin.bottom]; // Plotting on the x-axis starts from 280-20
    
    let max = onPremise;
    if (max < coLocated) max = coLocated;
    if (max < IaaS) max = IaaS;
    if (max < PaaS) max = PaaS;
    if (max < SaaS) max = SaaS;
    if (max < missing) max = missing;

    const x = scaleLinear()
    .domain([0, max])
    .range(xRange);

    const y = scaleBand()
        .domain(range(data.length))
        .rangeRound(yRange)
        .padding(0.1);

    const bars = data.map((d, index) => {
        return (
            <g key={`${d}${index}`} transform={`translate(${margin.left}, ${margin.top})`}>
                <text textAnchor='end' x={-5} y={y(index)+(y.bandwidth()/2)+3}>{labels[index]}</text>
                <g>
                    <Tooltip placement='top' title={
                        <React.Fragment>
                            {
                                labels[index] !== 'Missing' ?
                                <Typography  variant='body1'>
                                      {`${d} `}
                                    projects are {labels[index]}
                                </Typography>
                                :
                                <Typography variant='h6'>{d} projects have missing data
                                </Typography>
                            }
                        </React.Fragment>
                    }>
                    <rect 
                        x={0} 
                        y={y(index)}
                        width={x(d)}
                        // height={(y.bandwidth()/2)+15}
                        height={y.bandwidth()}
                        fill={`${colors[index]}`}
                        />
                    </Tooltip>
                    <text
                        x={x(d)+2} 
                        y={y(index)+(y.bandwidth()/2)+3}
                        fill="black"
                    >{`${d}`}</text>
                </g>
            </g>);
    });

    return (
        <svg fontSize={9} viewBox={`0, 0, ${width}, ${height}`}>
            {bars}
        </svg>
    );
};

export default ApplicationHostingTypeChart;
