/*
import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import * as d3 from 'd3';

const Timeline = () => {
    
    const { 
        applications, 
        calculateTimelineMetric
    } = useData();

    const [applicationMetrics, setApplicationsMetrics] = useState({
        TIMEMetric: calculateTimelineMetric(applications),
    })

    useEffect(() => {
        setApplicationsMetrics({
            TIMEMetric: calculateTimelineMetric(applications),
        })
    }, [applications]);

    // Applications Metrics

    const { timeline } = applicationMetrics;
    

    l

    return (
        <div>
        
        </div>
    );
};

export default Timeline;
*/

// move over to graphs folder
// move over to react-dom d3-math
// have this file call in the data instead of passing as props
// finish the data function in dataprovider

import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

// width/height of the chart bounds, data the data, indi the x values
function ActiveAppTimeline({ width, height, data }){

    const { ticks, xValues } = data;

    const ref = useRef();

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        
        const svg = d3.select(ref.current)

        const xScale = d3.scaleLinear()
            .domain([0, ticks.length - 1])   // how many ticks
            .range([0, width]);   // how long the x axis is

        const yScale = d3.scaleLinear()
            .domain([0, Math.max(...xValues)])   // input values
            .range([height, 0]);   // how long the y axis is

        const xAxis = d3.axisBottom(xScale).ticks(ticks.length).tickFormat(index => ticks[index]%5 === 0 ? ticks[index] : '');
        svg.select('.x-axis').style('transform', 'translateY(200px)').call(xAxis);

        const yAxis = d3.axisLeft(yScale);
        svg.select('.y-axis').call(yAxis);

        const myLine = d3.line()
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(d3.curveCardinal);

        svg
            .selectAll('.line')
            .data([xValues])
            .join('path')
            .attr('class', 'line')
            .attr('d', myLine)
            .attr('fill', 'none')
            .attr('stroke', 'blue');
    }


    return (
        <div>
            <svg ref={ref} style={{ backgroundColor: `eee`, overflow: 'visible', width: `${width}`, height: `${height}` }}>
                <g className='x-axis' />
                <g className='y-axis' />
            </svg>
        </div>
        
    )

}

export default ActiveAppTimeline;