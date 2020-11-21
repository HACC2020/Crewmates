import React from 'react';
import { useData } from '../../providers/DataProvider';
import { scaleLinear, scaleBand, min, max } from 'd3';
import _ from 'lodash';
// Material UI
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const FunctionalVsTechnicalGraph = () => {
    const { applications } = useData();

    const width = 750;
    const height = 750;

    const margin = {top: 20, right: 20, bottom: 0, left: 50 };

    const xRange = [0, width - margin.left - margin.right]; // Where plotting on the x-axis starts
    const yRange = [height - margin.bottom - margin.top, 0]; // Where plotting on the y-axis starts

    const filteredApplications = _.filter(applications, app => {
        return app.functionalFit && app.technicalFit
    })

    const data = buildData(filteredApplications);

    // Function to calculate the height of a bar given a data value (i.e., the value of invest, tolerate)
    const y = scaleBand()
        .domain([0, 1, 2, 3, 4])
        .range(yRange);

    const x = scaleBand()
        .domain([0, 1, 2, 3, 4])
        .range(xRange);

    const colorScale = scaleLinear()
        .domain([ min(_.flatten(data), d => d), max(_.flatten(data), d => d) ])
        .range([0.2, 3]);

    const Gridlines = () =>  
            <g transform={`translate(${margin.left},${margin.top})`}>
                {/* Vertical Lines */}
                <line x1={x(0)} y1={y(0)} x2={x(0)} y2={y(4)} strokeWidth={1} stroke="white"/>
                <line x1={x(1)} y1={y(0)} x2={x(1)} y2={y(4)} strokeWidth={1} stroke="white"/>
                <line x1={x(2)} y1={y(0)} x2={x(2)} y2={y(4)} strokeWidth={1} stroke="white"/>
                <line x1={x(3)} y1={y(0)} x2={x(3)} y2={y(4)} strokeWidth={1} stroke="white"/>
                <line x1={x(4)} y1={y(0)} x2={x(4)} y2={y(4)} strokeWidth={1} stroke="white"/>

                {/* Horizontal Lines */}
                <line x1={x(0)} y1={y(0)} x2={x(4)} y2={y(0)} strokeWidth={1} stroke="white"/>
                <line x1={x(0)} y1={y(1)} x2={x(4)} y2={y(1)} strokeWidth={1} stroke="white"/>
                <line x1={x(0)} y1={y(2)} x2={x(4)} y2={y(2)} strokeWidth={1} stroke="white"/>
                <line x1={x(0)} y1={y(3)} x2={x(4)} y2={y(3)} strokeWidth={1} stroke="white"/>
                <line x1={x(0)} y1={y(4)} x2={x(4)} y2={y(4)} strokeWidth={1} stroke="white"/>
            </g>;

    /* The heart of this graph */
    const Cells = () => {
        const ratingLabels = ['Poor', 'Insufficient', 'Adequate', 'Excellent'];

        return (
        <g transform={`translate(${margin.left},${margin.top})`}>
            {data.map((xCell, xIndex) => {
                return (
                <React.Fragment key={`xCell:${xIndex}`}>
                    {xCell.map((yCell, yIndex) => {
                        const color = getColor(xIndex, yIndex);
                        const calculatedOpacity = colorScale(yCell);
                        return (
                            <g key={`fnVsTec:${x(xIndex)},${y(yIndex+1)}`} transform={`translate(${x(xIndex)},${y(yIndex+1)})`}>
                                <Tooltip title={
                                    <React.Fragment>
                                        <Typography variant='h6'>
                                            {yCell} applications have {ratingLabels[xIndex]} Functional Fit
                                            and {ratingLabels[yIndex]} Technical Fit.
                                        </Typography>
                                    </React.Fragment>
                                }>
                                    <rect width={x.bandwidth()} height={y.bandwidth()} opacity={calculatedOpacity} fill={color}/>
                                </Tooltip>
                                <text fontSize={16}
                                    textAnchor="middle" x={x.bandwidth()/2} y={y.bandwidth()/2} fill="black">{yCell}</text>
                            </g>
                        )
                    })}
                </React.Fragment>);
            })}
        </g>);
    }

    const Axes = () => {
        const xArrow = 
            <g transform={`translate(${x(4)+7},${y(0)})`}>
                <line x1={0} y1={0} x2={-5} y2={-5} strokeWidth={1} stroke="black"/>
                <line x1={0} y1={0} x2={-5} y2={5} strokeWidth={1} stroke="black"/>
            </g>;
        const yArrow = 
            <g transform={`translate(${x(0)},${y(4)-7})`}>
                <line x1={0} y1={0} x2={5} y2={5} strokeWidth={1} stroke="black"/>
                <line x1={0} y1={0} x2={-5} y2={5} strokeWidth={1} stroke="black"/>
            </g>;
        return (<g transform={`translate(${margin.left},${margin.top})`}>
            <line x1={x(0)} y1={y(0)} x2={x(4)+7} y2={y(0)} strokeWidth={1} stroke="black"/>
            {xArrow}
            <line x1={x(0)} y1={y(0)} x2={x(0)} y2={y(4)-5} strokeWidth={1} stroke="black"/>
            {yArrow}
        </g>);
    }

    const Labels = () => {
        const labels = ['Poor', 'Insufficient', 'Adequate', 'Excellent'];

        const yLabels =
            <g transform={`translate(${margin.left},${margin.top})`}>
                {labels.map((label, index) => {
                    return (
                        <g  key={`technical-label-${index}-${label}`}
                            transform={`
                            translate(${x(0) - 5},${y(index) - (y.bandwidth()/2)})
                            rotate(270)
                        `}>
                            <text textAnchor="middle">{label}</text>
                        </g>
                    );
                })}
            </g>;
        const xLabels =
            <g transform={`translate(${margin.left},${margin.top})`}>
                {labels.map((label, index) => {
                    return (
                        <g  key={`functional-label-${index}-${label}`}
                            transform={`
                                translate(${x(index)+(x.bandwidth()/2)},${y(0) + 15})
                            `}>
                            <text textAnchor="middle">{label}</text>
                        </g>
                    );
                })}
            </g>;
        return (
            <>
            {xLabels}
            {yLabels}
            </>
        );
    };

    const AxesTitles = () => {
        const yAxisTitle = 
            <g transform={`
                translate(${x(0)-35},${y(2)})
                rotate(270)
            `}>
                <text textAnchor="middle">Technical Fit Rating</text>
            </g>;

        const xAxisTitle = 
        <g transform={`
            translate(${x(2)},${y(0)+40})
        `}>
            <text textAnchor="middle">Functional Fit Rating</text>
        </g>;

        return (
            <g transform={`translate(${margin.left},${margin.top})`}>
                {yAxisTitle}
                {xAxisTitle}
            </g>
        );
    }

    return (
        <svg viewBox={`0, 0, ${width}, ${height}`} transform={`translate(0,50)`}>
            <Cells/>
            <Gridlines/>
            <Axes/>
            <Labels/>
            <AxesTitles/>
        </svg>
    );
};

/**
 * Returns 2D array representing cells. Each cell contains the amount of
 * applications in each rating.
 * @param {*} applications 
 */
const buildData = applications => {
    let arr = new Array(4);
    const values = ['poor', 'insufficient', 'adequate', 'excellent'];

    // Make 2d array and populat with zeros.
    for(let i = 0; i < 4; i++) {
        arr[i] = new Array(4);
        for(let j = 0; j < 4; j++) {
            arr[i][j] = 0;
        }
    }
    
    /* Functional fit represents x-axis */
    /* Technical fit represents y-axis */
    _.forEach(applications, app => {
        const x = _.indexOf(values, app.functionalFit);
        const y = _.indexOf(values, app.technicalFit);
        arr[x][y]++;
    });

    return arr;
}

const getColor = (x, y) => {
    const rating = (x+y)/2;
    let color = '';
    if(rating === 0) color = 'var(--warning-color-red)';
    if(rating > 0 && rating < 1) color = 'var(--warning-color-red)';
    if(rating === 1) color = 'var(--warning-color-orange)';
    if(rating > 1 && rating < 2) color = 'var(--warning-color-yellow)';
    if(rating === 2) color = 'var(--warning-color-lightgreen)';
    if(rating > 2) color = 'var(--warning-color-green)';
    return color;
}

export default FunctionalVsTechnicalGraph;