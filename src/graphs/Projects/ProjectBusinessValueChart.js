import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { scaleLinear, scaleBand, range } from 'd3';
import _ from 'lodash';

// Material UI
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const ProjectBusinessValueChart = () => {
    const { projects, calculateBusinessValueMetric } = useData();

    const [projectsMetrics, setProjectsMetrics] = useState({
        projectBusinessValueMetric: calculateBusinessValueMetric(projects)
    });

    useEffect(() => {
        setProjectsMetrics({
            projectBusinessValueMetric: calculateBusinessValueMetric(projects)
        });
    }, [projects, calculateBusinessValueMetric]);

    const { projectBusinessValueMetric } = projectsMetrics;

    const { marginal, little, large, significant, missing } = projectBusinessValueMetric;

    // const data = [ marginal, little, large, significant, missing ];
    // const labels = ['Marginal', 'Little', 'Large', 'Significant', 'Missing'];
    // const colors = ['var(--warning-color-orange)', 'var(--warning-color-yellow)', 'var(--warning-color-lightgreen)', 'var(--warning-color-green)', 'var(--missing-data-color)'];

    const data = [ significant, large, little, marginal, missing ];
    const labels = [ 'Significant', 'Large', 'Little', 'Marginal', 'Missing'];
    const colors = ['var(--warning-color-green)', 'var(--warning-color-lightgreen)', 'var(--warning-color-yellow)', 'var(--warning-color-orange)', 'var(--missing-data-color)'];

    const width = 400;
    const height = 300;
    const margin = {top: 40, right: 50, bottom: 10, left: 75};
    const xRange = [0.5, width - margin.left - margin.right]; // Plotting on the x-axis starts from 40-350
    const yRange = [0, height - margin.top - margin.bottom]; // Plotting on the x-axis starts from 280-20
    
    let max = marginal;
    if (max < little) max = little;
    if (max < large) max = large;
    if (max < significant) max = significant;
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
                <text fontSize={14} textAnchor='end' x={-5} y={y(index)+(y.bandwidth()/4)+10}>{labels[index]}</text>
                <g>
                    <Tooltip placement='top' title={
                        <React.Fragment>
                            {
                                labels[index] !== 'Missing' ?
                                <Typography  variant='body1'>
                                      {`${d} `}
                                    projects have {_.lowerCase(labels[index])} business value
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
                        height={(y.bandwidth()/2)+15}
                        fill={`${colors[index]}`}
                        />
                    </Tooltip>
                    <text
                        fontSize={14}
                        x={x(d)+2} 
                        y={y(index)+(y.bandwidth()/4)+10}
                        fill="black"
                    >{`${d}`}</text>
                </g>
            </g>);
    });

    const Title = () => {
        return (
            <text fontSize={18} textAnchor='middle' x={width/2} y={margin.top/2}>IT Projects - Business Value</text>
        );
    }

    return (
        <svg fontSize={9} viewBox={`0, 0, ${width}, ${height}`}>
            <Title/>
            {bars}
        </svg>
    );
};

export default ProjectBusinessValueChart;
