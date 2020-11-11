import React from 'react';
import { scaleLinear, line, curveCardinal, axisBottom, axisLeft, select } from 'd3';

const ActiveAppTimeline = ({data}) => {

    const { ticks, xValues } = data;

    const width = 750;
    const height = 250;
    const margin = {top: 30, right: 30, bottom: 30, left: 30};
    const xRange = [margin.left, width - margin.right];
    const yRange = [height - margin.bottom, margin.top];

    const xScale = scaleLinear()
        .domain([0, ticks.length - 1])   // num x ticks
        .range(xRange);   // how long the x axis is

    const yScale = scaleLinear()
        .domain([0, Math.max(...xValues)])   // num y ticks
        .range(yRange);   // how long the y axis is

    // line
    const drawLine = () => {

        let myLine = line()
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(curveCardinal);

        return (
            <path
              className="line"
              d={myLine(xValues)}
              fill='none'
              stroke='var(--theme-color-2)'
            />
        );
      }

    // axis
    const drawAxes = () => {
        // position the axes
        const xAxis = axisBottom(xScale)
            .ticks(ticks.length)
            .tickFormat(index => ticks[index] % 5 === 0 ? ticks[index] : '');
        
        const yAxis = axisLeft(yScale)
            ;

        const xAxisRef = axis => {
            axis && xAxis(select(axis));
        }

        const yAxisRef = axis => {
            axis && yAxis(select(axis));
        }

        const xTransform = `translate(0, ${height-margin.bottom})`;

        return (
            <>
                <g transform={xTransform} ref={xAxisRef} />
                <g transform={`translate(${margin.left},0)`} ref={yAxisRef} />
            </>
        );
    }

    // chart title
    const title = <text textAnchor={'middle'} fontSize={'16px'} x={ width / 2 } y={ margin.top }>Current Applications Per Year</text>;

    const yAxes = () => {
        const axes =  [20,30,40,50,60,70,80,90];
        return (
            <g transform={`translate(${margin.left},${height-margin.bottom})`}>
                {axes.map(val => (
                <line 
                    key={`axes:${val}`}
                    strokeDasharray={3}
                    opacity={0.1} 
                    x1={0} 
                    y1={yScale(val)-yScale(10)} 
                    x2={width-margin.right-margin.left} 
                    y2={yScale(val)-yScale(10)} 
                    stroke="black" />  
                ))}
            </g>
        );
    };
    return (
        <div>
            <svg style={{overflow: 'visible'}} viewBox={`0, 0, ${width}, ${height}`}>
                {drawLine()}
                {drawAxes()}
                {yAxes()}
            {title}
            </svg>
        </div>
        
    )

}

export default ActiveAppTimeline;