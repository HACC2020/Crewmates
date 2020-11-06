import React from 'react';
import { scaleLinear, line, curveCardinal, axisBottom, axisLeft, select, max } from 'd3';

const ProjectRiskToValueChart = ({data}) => {

    const { marginalValueRisks, littleValueRisks, largeValueRisks, significantValueRisks } = data;
    const benefits = ['significant', 'large', 'little', 'marginal'];
    const projectRisks = ['severe',  'high','moderate' ,'low'];
    const colors = ['green', 'lightgreen', 'orange', 'red'];

    const width = 475;
    const height = 250;
    const margin = {top: 0, right: 0, bottom: 2, left: 2};
    const xRange = [margin.left, width - margin.right];
    const yRange = [height - margin.bottom, margin.top];

    const maxes = [ max(marginalValueRisks), max(littleValueRisks), max(largeValueRisks), max(significantValueRisks) ];
    const yMax = max(maxes);

    const xScale = scaleLinear()
        .domain([0, 3])   // num x ticks
        .range(xRange);   // how long the x axis is

    const yScale = scaleLinear()
        .domain([0, yMax + 5])   // num y ticks
        .range(yRange);   // how long the y axis is

    const legend = () => {
        const x = 500;
        const y = height / 4;
        return (
            <>
            <text x={x - 1} y={y} fontSize={'13px'} >Business Value</text>
            {colors.map((d, index) => 
                <g fill={colors[index]}>
                    <rect x={x} y={y + 12 + index * 15} height={10} width={10}/>
                    <text x={x + 15} y={y + 21.5 + index * 15} fontSize={'12px'}>{benefits[index]}</text>
                </g>
            )}
            </>
        );
    }

    // line
    const drawLine = () => {

        let myLine = line()
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(curveCardinal);

        return (
            <>
                <path
                  className="line"
                  d={myLine(marginalValueRisks)}
                  fill='none'
                  stroke='red'
                />
                <path
                  className="line"
                  d={myLine(littleValueRisks)}
                  fill='none'
                  stroke='orange'
                />
                <path
                  className="line"
                  d={myLine(largeValueRisks)}
                  fill='none'
                  stroke='lightgreen'
                />
                <path
                  className="line"
                  d={myLine(significantValueRisks)}
                  fill='none'
                  stroke='green'
                />
            </>
        );
      }

    // axis
    const drawAxes = () => {
        // position the axes
        const xAxis = axisBottom(xScale)
            .ticks(4)
            .tickFormat(index => projectRisks[index]);
        
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
    const title = <text textAnchor={'middle'} fontSize={'16px'} x={ width / 2 } y={ 0 }>Project Risk to Business Value</text>;

    return (
        <div>
            <svg fontSize={`2`} style={{overflow: 'visible'}} viewBox={`0, 0, ${width + 100}, ${height}`}>
                {drawLine()}
                {drawAxes()}
                {title}
                {legend()}
            </svg>
        </div>
        
    )

}

export default ProjectRiskToValueChart;