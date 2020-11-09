import React, { useState } from 'react';
import { useData } from '../../../providers/DataProvider';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
import Chip from '@material-ui/core/Chip';

// Material UI
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const AppMatrix = () => {
    const { departments, applications } = useData();

    const [ viewField, setViewField ] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null); // For View By menu

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const buttonColorTheme = createMuiTheme({
        palette: {
            primary: {
                light: '#504f79',
                main: '#7385A4',
                dark: '#000025',
                contrastText: '#ffffff',
            },
        },
    });

    const viewOptions = [
        'timeTag',
        'businessCriticality',
        'functionalFit',
        'technicalFit',
    ];
    // Enumerate an array of all business caps., alphabeticall ordered and unique.
    const capabilities = enumerateBusinessCapabilities(applications);

    return(
    <ThemeProvider theme={buttonColorTheme}>
        <Paper style={{height:'100vh', padding:'1em', backgroundColor:'var(--theme-color-5)', overflowY:'scroll', overflowX:'scroll',}} elevation={2}>
            <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                View By: {_.startCase(viewOptions[viewField])}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {viewOptions.map((option, index) => 
                    <MenuItem key={`${index}-option`} onClick={()=> {
                        setViewField(index);
                        handleClose();
                    }}>{_.startCase(option)}</MenuItem>)}
            </Menu>
            {<CategoryChips field={viewOptions[viewField]}/>}

            <div style={{ height:'750px', width:`80vw`}}>
                <Table striped bordered size="sm">
                    <thead>
                        <tr>
                            <th></th>
                            {capabilities.map(capability => {
                                // Render top row headers that represent all the business capabilities
                                let headerTitle = '';
                                if(capability === null) headerTitle = 'Missing Capability';
                                    else headerTitle = capability;
                                return (
                                    <th key={capability}>{headerTitle}</th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                    {departments.map(dep => {
                        const MAX_DISPLAYED_CHARACTERS = 75;
                        let departmentName = dep.name;
                        let displayedName;

                        // let missingBusinessCapabilityApplications = _.filter(applications, (application) => {
                        //     return (application.ownerAgencyName === departmentName) && (application.leadingBusinessCapability === null)
                        // });

                        if(departmentName.length > MAX_DISPLAYED_CHARACTERS) {
                            displayedName = departmentName.slice(0,MAX_DISPLAYED_CHARACTERS-1);
                        } else {
                            displayedName = departmentName;
                        }
                        return (
                            <tr key={dep.id}>
                                <td>{departmentName.length > MAX_DISPLAYED_CHARACTERS ? `${displayedName}...` : displayedName}</td>
                                {/* <td>{missingBusinessCapabilityApplications.map(o => 
                                    <ApplicationCard key={o.id} appData={o} viewBy={viewOptions[viewField]}/>)}
                                </td> */}
                                {capabilities.map(capability => {
                                    const matchingApplications = _.filter(applications, (application) => {
                                        return (application.ownerAgencyName === departmentName) 
                                            && (application.leadingBusinessCapability === capability);
                                    });

                                    const matchingApplicationsEl = matchingApplications.map(o => 
                                        <ApplicationCard key={o.id} appData={o} viewBy={viewOptions[viewField]}/>);

                                    return (<td key={`${dep.id}${capability}`}>{matchingApplicationsEl}</td>);
                                })}
                            </tr>
                            );
                    })}
                    </tbody>
                </Table>
            </div>
        </Paper>
    </ThemeProvider>
    );
};

const enumerateBusinessCapabilities = applications => {
    let capabilities = [];

    _.forEach(applications, application => {
        const cap = application.leadingBusinessCapability;
        const unique = _.findIndex(capabilities, (c)=> c === cap);
        if(unique === -1) {
            capabilities.push(cap);
        }
    });
    return _.sortBy(capabilities, x => x);
};

const ApplicationCard = ({appData, viewBy}) => {
    const { name } = appData;

    const rating = fieldToRating(appData[viewBy]);

    let chipColor = '';
    if(rating === 1) chipColor = 'red';
    if(rating === 2) chipColor = 'powderblue';
    if(rating === 3) chipColor = 'palegreen';
    if(rating === 4) chipColor = 'darkgreen';

    const chipStyle = {
        backgroundColor:`${chipColor}`,
        color: `${rating === 4 ? 'white' : 'black'}`
    }
    const handleClick = () => console.log(`App: ${name}`);
    return (
            <Chip style={chipStyle} size="medium" label={name} onClick={handleClick} />
    );
};

const fieldsValues = {
    'timeTag': ['Missing Data', 'Eliminate', 'Migrate', 'Tolerate', 'Invest'],
    'businessCriticality': ['Missing Data', 'missionCritical', 'businessCritical', 'businessOperational', 'administrativeService'],
    'functionalFit': ['Missing Data', 'poor', 'insufficient', 'adequate', 'excellent'],
    'technicalFit': ['Missing Data', 'poor', 'insufficient', 'adequate', 'excellent'],
};

const CategoryChips = ({field}) => {
    const values = fieldsValues[field];

    return (
        <>
        {values.map(val => {
            const rating = fieldToRating(val);

            let chipColor = '';
            
            if(rating === 1) chipColor = 'red';
            if(rating === 2) chipColor = 'powderblue';
            if(rating === 3) chipColor = 'palegreen';
            if(rating === 4) chipColor = 'darkgreen';

            const chipStyle = {
                backgroundColor:`${chipColor}`,
                color: `${rating === 4 ? 'white' : 'black'}`
            };

            return (<Chip key={val} style={chipStyle} size="medium" label={val}/>);
        })}
        </>
    );
}

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


        // If it's functionalFit or technicalFit
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
}

export default AppMatrix;