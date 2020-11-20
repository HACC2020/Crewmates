import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { scaleLinear, scaleBand, range } from 'd3';

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

    const data = [ marginal, little, large, significant, missing ];
    const labels = ['marginal', 'little', 'large', 'significant', 'missing'];
    const colors = ['var(--warning-color-orange)', 'var(--warning-color-yellow)', 'var(--warning-color-lightgreen)', 'var(--warning-color-green)', 'var(--missing-data-color)'];

    const width = 400;
    const height = 300;
    const margin = {top: 30, right: 50, bottom: 10, left: 100};
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
                <text textAnchor='end' x={-5} y={y(index)+(y.bandwidth()/4)+10}>{labels[index]}</text>
                <g>
                    <rect 
                        x={0} 
                        y={y(index)}
                        width={x(d)}
                        height={(y.bandwidth()/2)+15}
                        fill={`${colors[index]}`}
                        />
                    <text
                        x={x(d)+2} 
                        y={y(index)+(y.bandwidth()/4)+10}
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

export default ProjectBusinessValueChart;
