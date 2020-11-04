import React from 'react';
import { scaleLinear, line, curveCardinal, axisBottom, axisLeft, select } from 'd3';

const ActiveAppTimeline = ({data}) => {

    const { ticks, xValues } = data;

    const width = 475;
    const height = 250;
    const margin = {top: 0, right: 0, bottom: 2, left: 2};
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
              stroke='blue'
            />
        );
      }

    // axis
    const drawAxes = () => {
        // position the axes
        const xAxis = axisBottom(xScale)
            .ticks(ticks.length)
            .tickFormat(index => ticks[index] % 5 === 0 ? ticks[index] : '');
        
        const yAxis = axisLeft(yScale);

        const xAxisRef = axis => {
            axis && xAxis(select(axis));
        }

        const yAxisRef = axis => {
            axis && yAxis(select(axis));
        }

        const xTransform = `translate(0, 250)`;

        return (
            <>
                <g transform={xTransform} ref={xAxisRef} />
                <g ref={yAxisRef} />
            </>
        );
    }

    // chart title
    const title = <text textAnchor={'middle'} fontSize={'16px'} x={ width / 2 } y={ 0 }>Current Apps from each Year</text>;

    return (
        <div>
            <svg style={{overflow: 'visible'}} viewBox={`0, 0, ${width}, ${height}`}>
                {drawLine()}
                {drawAxes()}
                {title}
            </svg>
        </div>
        
    )

}

export default ActiveAppTimeline;