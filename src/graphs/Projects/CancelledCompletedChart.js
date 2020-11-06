import React, { useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { pie, arc } from 'd3';

const CancelledCompletedChart = () => {
    const { projects, calculateProjectCancelledCompleted } = useData();
    const { cancelled, projectedCompleted, missing } = calculateProjectCancelledCompleted(projects);
    const data = [ {"key": "a", "value": projectedCompleted}, {"key": "b", "value": cancelled}, {"key": "c", "value": missing} ]

    const width = 150;
    const height = 150;
    const margin = 40;
    const radius = width / 2 - margin;
    //const margin = {top: 10, right: 5, bottom: 15, left: 5};
    const colors = ['green', 'red', 'grey'];

    const pieChart = () => {
        let myPie = pie()
            .value(d => d.value)

        let dataReady = myPie(data);

        let myArc = arc()
            .innerRadius(0)
            .outerRadius(radius)

        const transform = `translate(${width/2}, ${height/2})`;

        return (
            <g  transform={transform} >
                <path
                    className='line'
                    d={myArc(dataReady[0])}
                    fill={colors[0]}
                    stroke='black'
                    strokeWidth='.5px'
                />
                <path
                    className='line'
                    d={myArc(dataReady[1])}
                    fill={colors[1]}
                    stroke='black'
                    strokeWidth='.5px'
                />
                <path
                    className='line'
                    d={myArc(dataReady[2])}
                    fill={colors[2]}
                    stroke='black'
                    strokeWidth='.5px'
                />
            </g>
        )

    }

    return (
    <svg style={{overflow: 'visible'}} fontSize={`2`} viewBox={`0, 0, ${width}, ${height}`}>
        {pieChart()}
    </svg>);
}

export default CancelledCompletedChart;