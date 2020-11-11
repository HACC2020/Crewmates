import React, { useState } from 'react';
import { useData } from '../../providers/DataProvider';
import { scaleLinear, scaleBand, min, max, axisBottom, axisTop, select } from 'd3';
import _ from 'lodash';
import moment from 'moment';
import Popper from '@material-ui/core/Popper';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { getTheYear, getMonthsFromDate, buildRoadmapData } from './functions';
import ApplicationCard from './ApplicationCard';

import './ITRoadmapTimeline.css';

const ITRoadmapTimeline = () => {
    const { applications } = useData();

    const width = 750;
    const height = 4050;
    const margin = {top: 20, right: 20, bottom: 20, left: 20};

    const filteredApplications = _.filter(applications, app => app['lifecycle:active'] && app['lifecycle:endOfLife']); 
    /* Add an option to view applications by when their end of lifecycle is scheduled */
    // const filteredApplications = _.filter(applications, app => 
    //     app['lifecycle:active'] && app['lifecycle:endOfLife'] && !moment(app['lifecycle:endOfLife']).isBefore('2025-01-01')); 

    const minYear = min(filteredApplications, app => {
        return getTheYear(app['lifecycle:active']);
    });
    const maxYear = max(filteredApplications, app => {
        return getTheYear(app['lifecycle:endOfLife'])+1;
    });

    // Years between minYear and maxYear plus one extra year for padding
    const totalYearsInMonths = ((maxYear - minYear) * 12) + 1;

    const data = buildRoadmapData(filteredApplications, minYear);

    // Function to spit out the correct y coordinate on graph
    const y = scaleBand()
        .domain(data.map(d => d.id))
        .range([0, height - margin.bottom - margin.top])
        .padding(.15);
    console.log(data.map(d => d.id));
    // Function to spit out the correct x coordinate on graph
    const x = scaleLinear()
        .domain([0, totalYearsInMonths])
        .range([0, width - margin.left - margin.right]);

    // Function to spit out correct x coordinate of the bar ticks
    const xMonthScale = scaleLinear()
        .domain([minYear, maxYear])
        .range([0, width - margin.left - margin.right]);


    /** This is the component that renders the bars on the graph
     * and the popover when you hover over a bar.
     */
    const BarPopover = ({data}) => {
        const [darken, setDarken] = useState(false);
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);

        const handleMouseEnter = (event) => {
            // setAnchorEl(anchorEl ? null : event.currentTarget);
            setDarken(true);
        };

        const handleMouseLeave = (event) => {
            // setAnchorEl(anchorEl ? null : event.currentTarget);
            setDarken(false);
        };
        const handleBarClick = (event) => {
            setAnchorEl(anchorEl ? null : event.currentTarget);
        }

        const id = open ? 'spring-popper' : undefined;

        return (
            <>
            <g  onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleBarClick} 
                transform={`translate(${x(data.start)},${y(data.id)} )`}
                cursor="pointer">
                <rect 
                    height={y.bandwidth()}
                    width={x(data.end) - x(data.start)}
                    fill={!darken ? data.color : data.highlightColor}/>
                <text transform={`translate(5, ${y.bandwidth()/2})`} fontSize={'.5em'} fill={data.textColor}>{data.label}</text>
            </g>
            <Popper placement="top-start"
                    disablePortal={false} 
                    id={id} 
                    open={open} 
                    anchorEl={anchorEl} 
                    transition>
                {({ TransitionProps }) => (
                <Fade {...TransitionProps}>
                    <ApplicationCard showDate data={data.data}/>
                </Fade>
                )}
            </Popper>  
            </>
        );
    };
    const bars = data.map(d => {
        return (<BarPopover key={d.id} data={d}/>);
    });

    // axis
    const drawAxes = () => {
        
        const years = [minYear, 1995, 2000, 2005, 2010, 2015, 2020, 2025, maxYear];
        // position the axes
        const topAxis = axisTop(xMonthScale)
            .ticks(years.length)
            .tickValues(years)
            .tickFormat(value => `${value}`)
            .tickSize(4);

        const bottomAxis = axisBottom(xMonthScale)
            .ticks(years.length)
            .tickValues(years)
            .tickFormat(value => `${value}`)
            .tickSize(4);

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

    // Draws a line at the current date
    const CurrentDateMarker = () => {
        const today = getMonthsFromDate(minYear, moment().format("YYYY-MM-DD"));
        return (
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            <polygon points={`${x(today)},-1 ${x(today)+3},-4 ${x(today)-3},-4`} style={{fill:'var(--theme-color-1)',stroke:'black',strokeWidth:0}} />
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
                y={0-6} 
                fontSize={'.5em'}>{moment().format("MMMM D, YYYY")}</text>
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

/**
 * Function to wrap a component in a transition.
 */
const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
});

export default ITRoadmapTimeline;