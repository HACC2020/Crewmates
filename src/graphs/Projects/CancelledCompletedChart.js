import React from 'react';
import { useData } from '../../providers/DataProvider';
import { pie, arc } from 'd3';
// Material UI
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

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
                        <Tooltip placement="right" title={
                            <React.Fragment>
                                { data[index].key === 'Missing Data' ? 
                                    <Typography variant='h6'>{percentages[index]} IT projects are missing data.</Typography>
                                    : <Typography variant='h6'>{percentages[index]} IT projects have a {data[index].key} date.</Typography>
                                }
                            </React.Fragment>
                        }>
                            <path
                                className='line'
                                d={myArc(dataReady[index])}
                                fill={colors[index]}
                                stroke='black'
                                strokeWidth='0px'
                            />
                        </Tooltip>
                        <text
                            transform={`translate(${myArc.centroid(dataReady[index])})`}
                            fontSize={4}
                            fill='white'
                            textAnchor='middle'>
                            {percentages[index]}
                        </text>
                    </React.Fragment>
                    )}
            </g>)
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
    const Title = () => {
        return (
            <text fontSize={8} textAnchor='middle' x={width/2} y={15}>IT Projects - Cancelled Vs. Completed</text>
        );
    }
    return (
    <svg style={{overflow: 'visible'}} fontSize={`2`} viewBox={`0, 0, ${width}, ${height}`}>
        {pieChart()}
        {legend()}
        <Title/>
    </svg>);
}

export default CancelledCompletedChart;