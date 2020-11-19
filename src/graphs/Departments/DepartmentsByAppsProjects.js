import React from 'react';
import { useData } from '../../providers/DataProvider';
import { scaleLinear, scaleBand, range } from 'd3';
import _ from 'lodash';

const DepartmentsByAppsProjects = () => {
    const { departments, applications, projects } = useData();

    const data = buildData(departments, applications, projects);

    const width = 400;
    const height = 600;
    const margin = {top: 30, right: 50, bottom: 10, left: 150};
    const xRange = [0.5, width - margin.left - margin.right]; // Plotting on the x-axis starts from 40-500
    const yRange = [0, height - margin.top - margin.bottom]; // Plotting on the x-axis starts from 470-20
    
    let applicationsProjectsMax = 0;
    _.forEach(data, d => {
        if(d.applications > applicationsProjectsMax) applicationsProjectsMax = d.applications;
        if(d.projects > applicationsProjectsMax) applicationsProjectsMax = d.projects;
    })

    const x = scaleLinear()
    .domain([0, applicationsProjectsMax])
    .range(xRange);

    const y = scaleBand()
        .domain(range(data.length))
        .rangeRound(yRange)
        .padding(0.1);

    const bars = data.map((d, index) => {
        return (
            <g key={`${d.department}-${index}`} transform={`translate(${margin.left}, ${margin.top})`}>
                <text textAnchor='end' x={-5} y={y(index)+(y.bandwidth()/2)}>{d.department}</text>
                <g>
                    <rect 
                        x={0} 
                        y={y(index)}
                        width={x(d.applications)}
                        height={y.bandwidth()/2}
                        fill={`var(--theme-color-1)`}
                        />
                    <text
                        x={x(d.applications)+2} 
                        y={y(index)+(y.bandwidth()/4)+2}
                        fill="black"
                    >{d.applications}</text>
                </g>
                <g>
                    <rect 
                        x={0} 
                        y={y(index)+(y.bandwidth()/2)}
                        width={x(d.projects)}
                        height={y.bandwidth()/2}
                        fill={`var(--theme-color-3)`}
                        />
                    <text
                        x={x(d.projects)+2} 
                        y={y(index)+(y.bandwidth()*(3/4))+2}
                        fill="black"
                    >{d.projects}</text>
                </g>
            </g>);
    });

    const legend = 
        <g transform={`translate(${width-margin.right-(width/7)}, ${margin.top+(5)})`}>
            <rect
                fill={`var(--theme-color-1)`}
                width={5}
                height={5}
                />
            <text x={7} y={5}>Number of Applications</text>
            <rect
                y={10}
                fill={`var(--theme-color-3)`}
                width={5}
                height={5}
                />
            <text x={7} y={15}>Number of Projects</text>
        </g>;

    const title =
    <g transform={`translate(${width/2}, ${margin.top/2})`}>
        <text fontSize={10} textAnchor="middle">Departments/Agencies by Number of Applications and Projects</text>
    </g>
    return (
        <svg fontSize={7} viewBox={`0, 0, ${width}, ${height}`}>
            {bars}
            {legend}
            {title}
        </svg>
    );
};

const buildData = (departments, applications, projects) => {
    let data = [];

    // Get Top level departments

    _.forEach(departments, d => {
        if(d.parent === null) {
            data.push({
                department: d.name,
                applications: countApplications(d.name, applications),
                projects: countProjects(d.name, projects)
            })
        }
    });
    
    return data;
};

const countApplications = (department, applications) => {
    let count = 0;

    _.forEach(applications, app => {
        let owner = app.ownerAgencyName;
        let topLevelDepartment = owner.split(' / ');
        if(department === topLevelDepartment[0]) count++;
    })

    return count;
}

const countProjects = (department, projects) => {
    let count = 0;

    _.forEach(projects, p => {
        let owner = p.ownerAgencyName;
        let topLevelDepartment = owner.split(' / ');
        if(department === topLevelDepartment[0]) count++;
    })

    return count;
}

export default DepartmentsByAppsProjects
