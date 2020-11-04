import React from 'react';
import { useData } from '../../providers/DataProvider';
import { Table } from 'react-bootstrap';

const AppMatrix = () => {
    const { departments, applications } = useData();

    return(
        <div>
        App Matrix
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Col 1</th>
                    <th>Col 2</th>
                    <th>Col 3</th>
                    <th>Col 4</th>
                    <th>Col 5</th>
                </tr>
            </thead>
            <tbody>
                {departments.map(dep => {
                    let departmentName = dep.name;
                    let displayedName;
                    const MAX_DISPLAYED_CHARACTERS = 40;
                    if(departmentName.length > MAX_DISPLAYED_CHARACTERS) {
                        displayedName = departmentName.slice(0,24);
                    } else {
                        displayedName = departmentName;
                    }
                    return (
                        <tr key={dep.id}>
                            <td>{departmentName.length > MAX_DISPLAYED_CHARACTERS ? `${displayedName}...` : displayedName}</td>
                            <td>yo</td>
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

};

export default AppMatrix