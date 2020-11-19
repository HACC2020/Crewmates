import React from 'react';
import { useData } from '../../providers/DataProvider';
import { pie, arc } from 'd3';


const ProjectPhaseChart = () => {
    const { projects } = useData();

    const data = buildData(projects);


    const width = 200;
    const height = 135;
    const margin = 40;
    const radius = width / 3 - 25;  // pie chart to take up about 1/3 of the width
    const colors = ['blue', 'red', 'green', 'yellow', 'pink', 'purple', 'grey'];

    const pieChart = () => {
        let myPie = pie()
            .value(d => d.value)

        let dataReady = myPie(data);

        let myArc = arc()
            .innerRadius(23)
            .outerRadius(radius)

        const transform = `translate(${(width / 2)}, ${height / 2})`;
        
        const textTransform = i => {
            let arc = myArc.centroid(dataReady[i]);
            let x = arc[0];
            let y = arc[1];
            let h = Math.sqrt((x * x) + (y * y));

            arc[0] += x/h * 14;
            arc[1] += y/h * 20 + i;

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
                    <React.Fragment key={`${c}`}>
                        <line 
                            x1={myArc.centroid(dataReady[index])[0]}
                            x2={textTransform(index)[0]}
                            y1={myArc.centroid(dataReady[index])[1]}
                            y2={textTransform(index)[1]}
                            stroke='black'
                            strokeWidth='.5px' />
                        <path
                            className='line'
                            d={myArc(dataReady[index])}
                            fill={colors[index]}
                            stroke='black'
                            strokeWidth='0px'
                        />
                        <text
                            transform={`translate(${textTransform(index)})`}
                            fontSize={4.5}
                            fontWeight='normal'
                            fill='black'
                            textAnchor={anchor(index)}>
                            {`${data[index].key} ${data[index].value}`}
                        </text>
                    </React.Fragment>
                    )
                }
            </g>
        )

    }

    return (
    <svg style={{overflow: 'visible'}} fontSize={`2`} viewBox={`0, 0, ${width}, ${height}`}>
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

    const today = '2020-11-18';

    projects.forEach(project => {
        if (project['lifecycleCustom:cancelled']) {
            cancelled++;
        }
        else if (project['lifecycleCustom:projectedCompletion'] <= today) {
            projectedCompletion++;
        }
        else if (project['lifecycleCustom:projectedStart'] <= today) {
            projectedStart++;
        }
        else if (project['lifecycleCustom:approved'] <= today) {
            approved++;
        }
        else if (project['lifecycleCustom:planningStarted'] <= today) {
            planning++;
        }
        else if (project['lifecycleCustom:projectedCompletion']) {
            future++;
        }
        else if (project['lifecycleCustom:projectedStart']) {
            future++;
        }
        else if (project['lifecycleCustom:approved']) {
            future++;
        }
        else if (project['lifecycleCustom:planningStarted']) {
            future++;
        }
        else {
            missing++;
        }
    });

    return [ {key: 'Planning', value: planning}, {key: 'Approved', value: approved}, {key: 'Projected to have Started', value: projectedStart},
                {key: 'Projected to have been Completed', value: projectedCompletion}, {key: 'Cancelled', value: cancelled},
                {key: 'Future Project', value: future}, {key: 'Missing Data', value: missing} ];
}

export default ProjectPhaseChart;