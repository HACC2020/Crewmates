import React from 'react';
import { useData } from '../../providers/DataProvider';
import { pie, arc } from 'd3';


const ProjectPhaseChart = () => {
    const { projects } = useData();

    const data = buildData(projects);

    const totalProjects = projects.length;

    const width = 150;
    const height = 135;
    const margin = 40;
    const radius = width / 2 - margin;
    const colors = ['blue', 'red', 'green', 'yellow', 'pink', 'purple', 'grey'];

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
                            {data[index].key}
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
            <React.Fragment>
            {colors.map((d, index) => 
                <g fill={colors[index]}key={`${d}`}>
                    <circle cx={x} cy={y + index * 6} r={2}/>
                    <text x={x + 5} y={y + 2 + index * 6} fontSize={'5px'}>{data[index].key}</text>
                </g>
            )}
            </React.Fragment>
        );
    }

    return (
    <svg style={{overflow: 'visible'}} fontSize={`2`} viewBox={`0, 0, ${width}, ${height}`}>
        {pieChart()}
        {/*{legend()}*/}
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