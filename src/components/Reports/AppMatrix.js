import React from 'react';
import { useData } from '../../providers/DataProvider';
import { Table } from 'react-bootstrap';
import _, { uniq } from 'lodash';

const AppMatrix = () => {
    const { departments, applications } = useData();
    const capabilities = enumerateBusinessCapabilities(applications);
    return(
        <div>
        App Matrix
        <Table striped hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    {capabilities.map(capability => {
                        const names = _.split(capability, '/');
                        const headerName = names.map(name => <p style={{textDecoration:'underline'}}>{name}</p>);
                        return (
                            <th>{headerName}</th>
                        );
                    })}
                    <th><p>1</p><p>12</p><p>13</p></th>
                    <th>Col 1</th>
                    <th>Col 1</th>
                </tr>
            </thead>
            <tbody>
                {departments.map(dep => {
                    let departmentName = dep.name;
                    let displayedName;
                    const MAX_DISPLAYED_CHARACTERS = 75;
                    if(departmentName.length > MAX_DISPLAYED_CHARACTERS) {
                        displayedName = departmentName.slice(0,MAX_DISPLAYED_CHARACTERS-1);
                    } else {
                        displayedName = departmentName;
                    }
                    return (
                        <tr key={dep.id}>
                            <td>{departmentName.length > MAX_DISPLAYED_CHARACTERS ? `${displayedName}...` : displayedName}</td>
                            <td>yo
                            </td>
                            <td>yo</td>
                            <td>yo</td>
                            <td>yo</td>
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
        if(_.findIndex(capabilities, (c)=> c === cap)) {
            capabilities.push(cap);
        }
    });
    return _.sortBy(capabilities, x => x);
};

export default AppMatrix