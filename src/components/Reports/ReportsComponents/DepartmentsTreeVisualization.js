import DepartmentsTree from '../../../graphs/DepartmentsTree/DepartmentsTree';

// Material UI
import Paper from '@material-ui/core/Paper';

const DepartmentsTreeVisualization = () => {
    return (
        <Paper style={{padding:'2em', backgroundColor:'var(--theme-color-5)'}} elevation={2}>
            <h2>Departments Tree Visualization</h2>
            <DepartmentsTree/>
        </Paper>);
};

export default DepartmentsTreeVisualization;