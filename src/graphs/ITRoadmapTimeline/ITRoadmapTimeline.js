import { useState } from 'react';
import { useData } from '../../providers/DataProvider';
import { scaleLinear, scaleBand, range, min, max, axisBottom, axisTop, select } from 'd3';
import _ from 'lodash';
import moment from 'moment';
import './ITRoadmapTimeline.css';

const ITRoadmapTimeline = () => {
    const { applications } = useData();

    const width = 750;
    const height = 1750;
    const margin = {top: 20, right: 20, bottom: 20, left: 20};

    // const filteredApplications = _.filter(applications, app => app['lifecycle:active'] && app['lifecycle:endOfLife']); 
    const filteredApplications = _.filter(applications, app => 
        app['lifecycle:active'] && app['lifecycle:endOfLife'] && !moment(app['lifecycle:endOfLife']).isBefore('2020-01-01')); 


    const minYear = min(filteredApplications, app => {
        return getTheYear(app['lifecycle:active']);
    });
    const maxYear = max(filteredApplications, app => {
        return getTheYear(app['lifecycle:endOfLife'])+1;
    });

    // Years between minYear and maxYear plus one extra year for padding
    const totalYearsInMonths = ((maxYear - minYear) * 12) + 1;

    const data = buildRoadmapData(filteredApplications, minYear);

    // Function to spit out the correct y coordinate of bar
    // const y = scaleBand()
    //     .domain(range(data.length))
    //     .range([0,height - margin.bottom - margin.top])
    //     .padding(0.2);
    const y = scaleBand()
        .domain(data.map(d => d.id))
        .range([0, height - margin.bottom - margin.top])
        .padding(.15);

    const x = scaleLinear()
        .domain([0, totalYearsInMonths])
        .range([0, width - margin.left - margin.right]);

    const xMonthScale = scaleLinear()
        .domain([minYear, maxYear])
        .range([0, width - margin.left - margin.right]);

    const Bar = ({data}) => {
        const [darken, setDarken] = useState(false);
        return (        
            <g  onMouseEnter={()=>setDarken(true)}
                onMouseLeave={()=>setDarken(false)} 
                transform={`translate(${x(data.start)},${y(data.id)} )`}>
                <rect 
                    height={y.bandwidth()}
                    width={x(data.end) - x(data.start)}
                    fill={!darken ? data.color : data.highlightColor}/>
                <text transform={`translate(5, ${y.bandwidth()/2})`} fontSize={'.5em'} fill={data.textColor}>{data.label}</text>
            </g>);
    };

    const bars = data.map(d => {
        return (<Bar data={d}/>)
    });

    // axis
    const drawAxes = () => {
        
        console.log(getCurrentMonths(minYear));
        const years = [minYear, 1995, 2000, 2005, 2010, 2015, 2020, 2025, maxYear];
        // position the axes
        const topAxis = axisTop(xMonthScale)
            .ticks(years.length)
            .tickValues(years)
            .tickFormat(value => `${value}`)
            .tickSize(4);

        const bottomAxis = axisBottom(xMonthScale)
            .ticks(15)
            .tickFormat(value => `${value}`);

        const topAxisRef = axis => {
            axis && topAxis(select(axis));
        }

        const bottomAxisRef = axis => {
            axis && bottomAxis(select(axis));
        }

        const topTransform = `translate(${margin.left}, ${margin.top})`;
        const bottomTransform = `translate(${margin.left}, ${height-margin.bottom})`;

        return (
            <>
                <g transform={topTransform} ref={topAxisRef} />
                <g transform={bottomTransform} ref={bottomAxisRef} />
            </>
        );
    }

    const CurrentDateMarker = () => {

        const today = getMonthsFromDate(minYear, moment().format("YYYY-MM-DD"));
        return (
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            <line 
                id="current-date-marker"
                opacity={0.3} 
                x1={x(today)} 
                y1={0} 
                x2={x(today)} 
                y2={height-margin.top-margin.bottom} 
                stroke="black" />
            <text                 
                x={x(today)} 
                y={0-2} 
                fontSize={'.5em'}>{moment().format("MMMM YYYY")}</text>
        </g>);
    }

    return (
        <div>
            <svg viewBox={`0, 0, ${width}, ${height}`}>
                {drawAxes()}
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    {bars}
                </g>
                <CurrentDateMarker/>
            </svg>
        </div>);
};

const getTheYear = date => {
    const dateMoment = moment(date);
    return dateMoment.get('year');    
}

// date format: YYYY-MM-DD
const getMonthsFromDate = (minYear, date) => {
    const dateAsMoment = moment(date);
    const year = dateAsMoment.get('year');
    const month = dateAsMoment.get('month');

    return ((year - minYear) * 12) + month;
}

// Function to generate a tick for the current date
const getCurrentMonths = minYear => {
    const today = moment().format("YYYY-MM-DD");
    console.log(today);
    return getMonthsFromDate(minYear, today);
}

const buildRoadmapData = (applications, minYear) => {
    const data = [];
    _.forEach(applications, app => {
        let color = 'var(--missing-data-color)';
        let textColor = 'black';
        let highlightColor = 'var(--missing-data-color-active)';

        const rating = fieldToRating(app.timeTag);
        if(rating === 1) {
            color = 'var(--warning-color-red)';
            textColor = 'white';
            highlightColor = 'var(--warning-color-red-active)'
        } 
        if(rating === 2) {
            color = 'var(--warning-color-orange)';
            highlightColor = 'var(--warning-color-orange-active)'
        } 
        if(rating === 3) {
            color = 'var(--warning-color-yellow)';
            highlightColor = 'var(--warning-color-yellow-active)'
        } 
        if(rating === 4) {
            textColor = 'white';
            color = 'var(--warning-color-green)';
            highlightColor = 'var(--warning-color-green-active)'
        } 

        const appData = {
            id: app.id,
            start: getMonthsFromDate(minYear, app['lifecycle:active']),
            end: getMonthsFromDate(minYear, app['lifecycle:endOfLife']),
            label: app.name,
            department: app.ownerAgencyName,
            color: color,
            textColor: textColor,
            highlightColor: highlightColor
        };

        data.push(appData); // Insert into new array
    });
    return data;
};

/* Given a field and an application return an integer representing 
    a rating of that field.
    
    Ex: 
    const field = 'timeTag';
    const fieldValue = 'Invest';

    const rating = fieldToRating(field, fieldValue);
    // 4
*/
const fieldToRating = (fieldValue) => {
    let rating = 0;
    switch (fieldValue) {

        // If it's a businessCriticality value
        case 'missionCritical':
            rating = 1;
            break;
        case 'businessCritical':
            rating = 2;
            break;
        case 'businessOperational':
            rating = 3;
            break;
        case 'administrativeService':
            rating = 4;
            break;

        // If it's TIME tag
        case 'Eliminate':
            rating = 1;
            break;
        case 'Migrate':
            rating = 2;
            break;
        case 'Tolerate':
            rating = 3;
            break;
        case 'Invest':
            rating = 4;
            break;

        // If it's functionalFit
        case 'poor':
            rating = 1;
            break;
        case 'insufficient':
            rating = 2;
            break;
        case 'adequate':
            rating = 3;
            break;
        case 'excellent':
            rating = 4;
            break;
        default:
            rating = 0;
            break;
    }

    return rating;
};

export default ITRoadmapTimeline;