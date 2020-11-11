import React from 'react';
import { useData } from '../../providers/DataProvider';
import { pie, arc } from 'd3';

const CancelledCompletedChart = () => {
    const { projects, calculateProjectCancelledCompleted } = useData();
    const { cancelled, projectedCompleted, missing } = calculateProjectCancelledCompleted(projects);
    const totalProjects = cancelled + projectedCompleted + missing;
    const calcPercent = p => `${((p / totalProjects) * 100).toFixed(1)}%`;
    const percentages = [calcPercent(projectedCompleted), calcPercent(missing), calcPercent(cancelled)];

    const data = [ {key: "Projected Completion", value: projectedCompleted}, {key: "Missing Data", value: missing},
                    {key: "Cancelled", value: cancelled} ]

    const width = 150;
    const height = 135;
    const margin = 40;
    const radius = width / 2 - margin;
    const colors = ['var(--warning-color-green)', 'var(--missing-data-color)', 'var(--warning-color-red)'];

    const pieChart = () => {
        let myPie = pie()
            .value(d => d.value)

        let dataReady = myPie(data);

        let myArc = arc()
            .innerRadius(0)
            .outerRadius(radius)

        const transform = `translate(${(width / 3)}, ${height / 2})`;

        return (
            <g  transform={transform} >
                {colors.map((c, index) => 
                    <React.Fragment key={`${c}`}>
                        <path
                            className='line'
                            d={myArc(dataReady[index])}
                            fill={colors[index]}
                            stroke='black'
                            strokeWidth='0px'
                        />
                        <text
                            transform={`translate(${myArc.centroid(dataReady[index])})`}
                            fontSize={4}
                            fill='white'
                            textAnchor='middle'>
                            {percentages[index]}
                        </text>
                    </React.Fragment>
                    )
                }
            </g>
        )

    }

    const legend = () => {
        const x = width / 3 * 2 - 5;
        const y = height / 4;
        return (
            <>
            {colors.map((d, index) => 
                <g fill={colors[index]}key={`${d}`}>
                    <circle cx={x} cy={y + index * 6} r={2}/>
                    <text x={x + 5} y={y + 2 + index * 6} fontSize={'5px'}>{data[index].key}</text>
                </g>
            )}
            </>
        );
    }

    return (
    <svg style={{overflow: 'visible'}} fontSize={`2`} viewBox={`0, 0, ${width}, ${height}`}>
        {pieChart()}
        {legend()}
    </svg>);
}

export default CancelledCompletedChart;