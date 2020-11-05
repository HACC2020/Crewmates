import React, { useState } from 'react';
import { useData } from '../../providers/DataProvider';
import { Table, Dropdown, DropdownButton } from 'react-bootstrap';
import _ from 'lodash';
import Chip from '@material-ui/core/Chip';




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
        <div>
        App Matrix

        <DropdownButton id="dropdown-basic-button" title={`View By: ${_.startCase(viewOptions[viewField])}`}>
            {viewOptions.map((option, index) => <Dropdown.Item key={index} onClick={()=>setViewField(index)}>{option}</Dropdown.Item>)}
        </DropdownButton>

        <Table striped bordered size="sm">
            <thead>
                <tr>
                    <th></th>
                    <th>Missing Business Capability</th>
                    {capabilities.map(capability => {
                        // Render top row headers that represent all the business capabilities
                        return (
                            <th key={capability}>{capability}</th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {departments.map(dep => {
                    const MAX_DISPLAYED_CHARACTERS = 75;
                    let departmentName = dep.name;
                    let displayedName;

                    let missingBusinessCapabilityApplications = _.filter(applications, (application) => {
                        return (application.ownerAgencyName === departmentName) && (application.leadingBusinessCapability === null)
                    });

                    if(departmentName.length > MAX_DISPLAYED_CHARACTERS) {
                        displayedName = departmentName.slice(0,MAX_DISPLAYED_CHARACTERS-1);
                    } else {
                        displayedName = departmentName;
                    }
                    return (
                        <tr key={dep.id}>
                            <td>{departmentName.length > MAX_DISPLAYED_CHARACTERS ? `${displayedName}...` : displayedName}</td>
                            <td>{missingBusinessCapabilityApplications.map(o => <ApplicationCard key={o.id} appData={o}/>)}</td>
                            {capabilities.map(capability => {
                                const matchingApplications = _.filter(applications, (application) => {
                                    return (application.ownerAgencyName === departmentName) 
                                        && (application.leadingBusinessCapability === capability);
                                });

                                const matchingApplicationsEl = matchingApplications.map(o => <ApplicationCard key={o.id} appData={o}/>);

                                return (<td key={`${dep.id}${capability}`}>{matchingApplicationsEl}</td>);
                            })}
                        </tr>
                        );
                })}
            </tbody>
        </Table>
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

const ApplicationCard = ({appData}) => {
    const { name } = appData;

    const handleClick = () => console.log(`App: ${name}`);
    return (
            <Chip size="medium" label={name} onClick={handleClick} />
    );
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