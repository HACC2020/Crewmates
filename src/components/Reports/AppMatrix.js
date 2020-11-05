import React from 'react';
import { useData } from '../../providers/DataProvider';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
import Chip from '@material-ui/core/Chip';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const AppMatrix = () => {
    const { departments, applications } = useData();

    // Enumerate an array of all business caps., alphabeticall ordered and unique.
    const capabilities = enumerateBusinessCapabilities(applications);

    return(
        <div>
        App Matrix
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
}

export default AppMatrix;