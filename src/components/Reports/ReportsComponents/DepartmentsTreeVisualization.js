import DepartmentsTree from '../../../graphs/DepartmentsTree/DepartmentsTree';

// Material UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const DepartmentsTreeVisualization = () => {
    return (
        <Paper square style={{padding:'2em', backgroundColor:'var(--theme-color-5)', height: "100vh"}} elevation={2}>
            <Typography variant="h2">Departments Tree Visualization</Typography>
            <Typography variant="h5">IT Applications by Department</Typography>
            
            <div>
                <Legend/>
            </div>
            <DepartmentsTree/>
        </Paper>);
};

const Legend = () => {
    const width = 500;
    const height = 150;

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${15}, ${25})`}>
                <circle r={10} strokeWidth={0} fill={`var(--theme-color-2)`}/>
                <text x={12} y={2} fontSize="1em">Department/Agency</text>
            </g>
            <g transform={`translate(${15}, ${50})`}>
                <circle r={10} strokeWidth={0} fill={`var(--theme-color-4)`}/>
                <text x={12} y={2} fontSize="1em">(No applications)</text>
            </g>

            <g transform={`translate(${width/2}, ${25})`}>
                <circle r={10} strokeWidth={0} fill={`var(--warning-color-green)`}/>
                <text x={12} y={2} fontSize="1em">Invest</text>
            </g>
            <g transform={`translate(${width/2}, ${50})`}>
                <circle r={10} strokeWidth={0} fill={`var(--warning-color-lightgreen)`}/>
                <text x={12} y={2} fontSize="1em">Tolerate</text>
            </g>
            <g transform={`translate(${width/2}, ${75})`}>
                <circle r={10} strokeWidth={0} fill={`var(--warning-color-yellow)`}/>
                <text x={12} y={2} fontSize="1em">Migrate</text>
            </g>
            <g transform={`translate(${width/2}, ${100})`}>
                <circle r={10} strokeWidth={0} fill={`var(--warning-color-red)`}/>
                <text x={12} y={2} fontSize="1em">Eliminate</text>
            </g>
            <g transform={`translate(${width/2}, ${125})`}>
                <circle r={10} strokeWidth={0} fill={`var(--missing-data-color)`}/>
                <text x={12} y={2} fontSize="1em">Missing Data</text>
            </g>
        </svg>
    );

}
export default DepartmentsTreeVisualization;