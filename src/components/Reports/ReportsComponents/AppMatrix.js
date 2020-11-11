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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import Popper from '@material-ui/core/Popper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import CircularProgress from '@material-ui/core/CircularProgress';

// react-spring
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

// Custom Component
import ApplicationCard from '../../../graphs/ITRoadmapTimeline/ApplicationCard';

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
        <Paper square style={{padding:'2em', marginBottom:'1em', width:'calc(100vw - 240px)'}}>
            
            <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
                <Button>View By: </Button>
                <Button onClick={handleClick}>{_.startCase(viewOptions[viewField])}
                <ArrowDropDownIcon/></Button>
            </ButtonGroup>
            {/* <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            View By: {_.startCase(viewOptions[viewField])}
                <ArrowDropDownIcon/>
            </Button> */}
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
            <Divider/>
            <div style={{marginTop:'1em'}}>
                {<CategoryChips field={viewOptions[viewField]}/>}
            </div>
        </Paper>

        <Paper square style={{height:'120vh', width:'calc(100vw - 240px)', padding:'2em', backgroundColor:'var(--theme-color-5)'}} elevation={2}>

            <Divider />
            <div style={{ height:'95%', width:`95%`, overflowY:'scroll', overflowX:'scroll',}}>
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
                                        <ApplicationChip key={o.id} appData={o} viewBy={viewOptions[viewField]}/>);
                                    
                                    return (<><td key={`${dep.id}${capability}`}>{matchingApplicationsEl}</td></>);
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

const ApplicationChip = ({appData, viewBy}) => {
    const { name } = appData;

    const [darken, setDarken] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const rating = fieldToRating(appData[viewBy]);

    let chipColor = 'var(--missing-data-color)';
    if(rating === 1) chipColor = 'var(--warning-color-red)';
    if(rating === 2) chipColor = 'var(--warning-color-yellow)';
    if(rating === 3) chipColor = 'var(--warning-color-lightgreen)';
    if(rating === 4) chipColor = 'var(--warning-color-green)';
    let darkChipColor = chipColor.slice(0, chipColor.length-1) + '-active)';
    const chipStyle = {
        backgroundColor:`${!darken ? chipColor : darkChipColor}`,
        color: `${rating === 4 ? 'white' : 'black'}`
    }
    const handleMouseEnter = (event) => {
        // setAnchorEl(anchorEl ? null : event.currentTarget);
        setDarken(true);
    };

    const handleMouseLeave = (event) => {
        // setAnchorEl(anchorEl ? null : event.currentTarget);
        setDarken(false);
    };
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const id = open ? 'spring-popper' : undefined;

    return (
        <>
            <Chip
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick} 
                style={chipStyle} size="medium" label={name}/>
            <Popper placement="top-start"
                    disablePortal={false} 
                    id={id} 
                    open={open} 
                    anchorEl={anchorEl} 
                    transition>
                {({ TransitionProps }) => (
                <Fade {...TransitionProps}>
                    <ApplicationCard data={appData}/>
                </Fade>
                )}
            </Popper> 
        </>
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

            let chipColor = 'var(--missing-data-color-active)';
            let textColor = 'white';

            if(rating === 1) chipColor = 'var(--warning-color-red)';
            if(rating === 2) chipColor = 'var(--warning-color-yellow)';
            if(rating === 3) chipColor = 'var(--warning-color-lightgreen)';
            if(rating === 4) chipColor = 'var(--warning-color-green)';

            const chipStyle = {
                backgroundColor:`${chipColor}`,
                color: textColor
            };

            return (<Chip key={val} style={chipStyle} size="medium" label={_.startCase(val)}/>);
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

export default AppMatrix;