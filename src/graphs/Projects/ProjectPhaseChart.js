import React from 'react';
import { useData } from '../../providers/DataProvider';
import { pie, arc } from 'd3';
import moment from 'moment';
import _ from 'lodash';

const ProjectPhaseChart = () => {
    const { projects } = useData();

    const data = buildData(projects);


    const width = 200;
    const height = 200;
    const margin = 25;
    const marginTop = 15;
    const radius = width / 3 - margin;  // pie chart to take up about 1/3 of the width
    const colors = [
        'var(--theme-color-2)', 
        'var(--theme-color-2)', 
        'var(--theme-color-1)', 
        'var(--warning-color-green)', 
        'var(--warning-color-red)', 
        'var(--theme-color-1)', 
        'var(--missing-data-color)'];

    const pieChart = () => {
        let myPie = pie()
            .value(d => d.value)

        let dataReady = myPie(data);

        // the arc for the pie chart
        let myArc = arc()
            .innerRadius(20)
            .outerRadius(radius)

        // the outer edge of the circle, helper to draw the line correctly
        let textArc = arc()
            .innerRadius(radius)
            .outerRadius(radius)

        // move the center of the pie chart to the center of the svg container
        const transform = `translate(${(width / 2)}, ${(height / 2)+marginTop})`;
        
        // move the text to the correct spot with the line just touching it
        const textTransform = i => {
            let arc = textArc.centroid(dataReady[i]);
            let x = arc[0];
            let y = arc[1];
            let h = Math.sqrt((x * x) + (y * y));

            arc[0] > -2 ? arc[0] = 35 : arc[0] = -56; // x coordinate
            arc[1] += y/h * 20 + 2*i; // y coordinate

            return arc;
        }

        // text anchor based on which side of pie we are on
        const anchor = i => {
            if (i === 3) {  // manually set for 'projected completion'
                return "start";
            } else if ((dataReady[i].endAngle + dataReady[i].startAngle)/2 > Math.PI) {
                return "end";
            } else {
                return "start";
            }
        }

        return (
            <g  transform={transform} >
                {colors.map((c, index) => 
                    <React.Fragment key={`${c}${index}`}>
                        <path
                            className='line'
                            d={myArc(dataReady[index])}
                            fill={colors[index]}
                            stroke='black'
                            strokeWidth={0}
                        />
                        <text
                            transform={`translate(${textTransform(index)})`}
                            fontSize={4.5}
                            fontWeight='normal'
                            fill='black'
                            textAnchor={anchor(index)}>
                            {`${data[index].key} ${data[index].value}`}
                        </text>
                        <line 
                            x1={textArc.centroid(dataReady[index])[0]}
                            x2={textTransform(index)[0]}
                            y1={textArc.centroid(dataReady[index])[1]}
                            y2={textTransform(index)[1]-2}
                            stroke='black'
                            strokeWidth={0.3} />
                    </React.Fragment>
                    )
                }
            </g>
        )

    }

    const Title = () => {
        return (<text fontSize={10} textAnchor='middle' x={width/2} y={marginTop}>IT Projects - Project Phase</text>)
    }
    return (
    <svg fontSize={`2`} viewBox={`0, 0, ${width}, ${height}`}>
        <Title/>
        {pieChart()}
    </svg>);
}

const buildData = (projects) => {
    let planning = 0;
    let approved = 0;
    let projectedStart = 0;
    let cancelled = 0;
    let projectedCompletion = 0;
    let future = 0; // will be worked on in the future
    let missing = 0;

    const today = moment();

    _.forEach(projects, p => {
        let planningStarted = null;
        let approvedDate = null;
        let projectedCompletionDate = null;
        let projectedStartDate = null;
        let cancelledDate = null;

        if(p['lifecycleCustom:planningStarted'])  planningStarted = moment(p['lifecycleCustom:planningStarted']);
        if(p['lifecycleCustom:approved'])  approvedDate = moment(p['lifecycleCustom:approved']);
        if(p['lifecycleCustom:cancelled'])  cancelledDate = moment(p['lifecycleCustom:cancelled']);
        if(p['lifecycleCustom:projectedStart'])  projectedStartDate = moment(p['lifecycleCustom:projectedStart']);
        if(p['lifecycleCustom:projectedCompletion'])  projectedCompletionDate = moment(p['lifecycleCustom:projectedCompletion']);

        // Case: project is cancelled
        if (cancelledDate) {
            cancelled++;

        // Case: project is in projected completion phase
        } else if (projectedCompletionDate && projectedCompletionDate.valueOf() <= today.valueOf()) {
            projectedCompletion++;

        // Case: project is in projected start phase
        } else if (projectedStartDate && projectedStartDate.valueOf() <= today.valueOf()) {
            projectedStart++;

        // Case: project is in approved phase
        } else if (approvedDate && approvedDate.valueOf() <= today.valueOf()) {
            approved++;
        // Case: project is in planning phase
        } else if (planningStarted && planningStarted.valueOf() <= today.valueOf()) {
            planning++;
        } else if (projectedCompletionDate) {
            future++;
        } else if (projectedStartDate) {
            future++;
        } else if (approvedDate) {
            future++;
        } else if (planningStarted) {
            future++;
        } else {
            missing++;
        }
    })

    return [ {key: 'Planning', value: planning}, {key: 'Approved', value: approved}, {key: 'Projected to have Started', value: projectedStart},
                {key: 'Projected to be Completed', value: projectedCompletion}, {key: 'Cancelled', value: cancelled},
                {key: 'Future Project', value: future}, {key: 'Missing Data', value: missing} ];
}

export default ProjectPhaseChart;