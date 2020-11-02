import React, { useEffect } from 'react';
import { useData } from '../../providers/DataProvider';
import { scaleLinear, scaleBand, max, select } from 'd3';


const TIMEModelChart = () => {
    const { applications, calculateTIMEMetric } = useData();
    const { invest, tolerate, migrate, eliminate, missing } = calculateTIMEMetric(applications);

    // The data to display
    const TIMEData = [
        {name:'Invest', value:invest, color:'green'},
        {name:'Tolerate', value:tolerate, color:'blue'},
        {name:'Migrate', value:migrate, color:'skyblue'},
        {name:'Eliminate', value:eliminate, color:'red'},
        {name:'Missing', value:missing, color:'gray'}
    ];

    const width = 200;
    const height = 150;
    const margin = {top: 10, right: 5, bottom: 15, left: 20};
    const xRange = [margin.left, width - margin.right]; // Plotting on the x-axis starts from 40-500
    const yRange = [height - margin.bottom, margin.top]; // Plotting on the x-axis starts from 470-20


    // Function to calculate the height of a bar given a data value (i.e., the value of invest, tolerate)
    const y = scaleLinear()
        .domain([0, max(TIMEData, d => d.value)])
        .range(yRange);

    const x = scaleBand()
        .domain(TIMEData.map(d => d.name))
        .rangeRound(xRange)
        .padding(.1);

    const bars = TIMEData.map((d, index) => 
        <g fill={d.color}>
            <rect 
                x={x(d.name)} 
                y={y(d.value)}
                height={y(0)-y(d.value)}
                width={x.bandwidth()}/>
            <text
                x={x(d.name)+(x.bandwidth()/2)} 
                y={y(d.value)-2}
                fill="black"
                textAnchor="middle" 
                >{d.value}</text>
        </g>);

    const titleX = margin.left+((width-margin.left)/2);
    const titleY = height-(margin.bottom/2)+5;

    const yTitle = <text x={titleX} y={titleY}>TIME Model</text>;

    const labels = TIMEData.map((d, index) => {
        const labelX = x(d.name)+(x.bandwidth()/2) - 5;
        const labelY = (height-margin.bottom+4);
        return (
            <text x={labelX} y={labelY} key={d.name}>{d.name}</text>

        );
    });
    return (
    <svg fontSize={`4`} viewBox={`0, 0, ${width}, ${height}`}>
        {bars}
        {yTitle}
        {labels}
    </svg>);
}

const barTextStyle = {
    fontSize: "1px", 
};

// NOT USED AT THE MOMENT
// Represents an individual bar in a bar chart
const Bar = ({ xRect, yRect, xText, yText, width, height, color, count }) => {
    const rectRef = React.createRef();
    const countTextRef = React.createRef();

    useEffect(() => {
        animateRect(rectRef, height, yText, color, countTextRef);
    });

    return(<>
        <g>
            <rect x={xRect} y={yRect} width={width} ref={rectRef}/> 
            <text x={xText} 
                fill="white"
                textAnchor="middle" 
                style={barTextStyle}
                ref={countTextRef}>{count}</text>
        </g>

        {/* <g fill={d.color}>
            <rect 
                x={x(d.name)} 
                y={y(d.value)}
                height={y(0)-y(d.value)}
                width={x.bandwidth()}/>
            <text 
                x={x(d.name)+(x.bandwidth()/2)} 
                y={y(d.value)-2} 
                fill="black"
                textAnchor="middle" 
                >{d.value}</text>
        </g> */}
        </>
    )
};

// NOT USED AT THE MOMENT
// Apply an animation to a bar and its text element
// rectRef: the reference object to the element
// height: Specify a height
// color: Specify a color it will transition to
// countTextRef: A reference to the text element
const animateRect = (rectRef, height, yText, color, countTextRef) => {
    const rect = select(rectRef.current);
    rect.transition()
        .duration(650)
        .attr("height", height)
        .attr("fill", color)
    const text = select(countTextRef.current);
    text.transition()
        .duration(650)
        .attr("y", yText);
};

export default TIMEModelChart;