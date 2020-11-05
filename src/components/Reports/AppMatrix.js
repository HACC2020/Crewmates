import React, { useState } from 'react';
import { useData } from '../../providers/DataProvider';
import { Table, Dropdown, DropdownButton } from 'react-bootstrap';
import _ from 'lodash';
import Chip from '@material-ui/core/Chip';
import BusinessCriticalityChart from '../../graphs/BusinessCriticalityChart/BusinessCriticalityChart';




const AppMatrix = () => {
    const { departments, applications } = useData();

    const [ viewField, setViewField ] = useState(0);
    const viewOptions = [
        'timeTag',
        'businessCriticality',
        'functionalFit',
        'technicalFit',
    ];
    // Enumerate an array of all business caps., alphabeticall ordered and unique.
    const capabilities = enumerateBusinessCapabilities(applications);

    return(
        <div style={{padding:'1em'}}>

        <DropdownButton id="dropdown-basic-button" title={`View By: ${_.startCase(viewOptions[viewField])}`}>
            {viewOptions.map((option, index) => <Dropdown.Item key={index} onClick={()=>setViewField(index)}>{option}</Dropdown.Item>)}
        </DropdownButton>
        <p>Categories:</p>
        {<CategoryChips field={viewOptions[viewField]}/>}
        <div style={{overflowY:'scroll', overflowX:'scroll', height:'100vh'}}>
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
        </div>);
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
    'businessCriticality': ['Missing Data', 'administrativeService', 'businessOperational', 'businessCritical', 'missionCritical'],
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

            return (<Chip style={chipStyle} size="medium" label={val}/>);
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
        case 'administrativeService':
            rating = 1;
            break;
        case 'businessOperational':
            rating = 2;
            break;
        case 'businessCritical':
            rating = 3;
            break;
        case 'missionCritical':
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

        // If it's technicalFit
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