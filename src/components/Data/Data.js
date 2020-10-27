import React, {useState, useEffect} from 'react';
import { useData } from '../../providers/DataProvider';

const styles= {
    tableStyles: {
      border: '1px solid black'
    }
};

const Data = () => {
    const {
        departments, departmentFields,
        applications, applicationFields,
        projects, projectFields
    } = useData();

    const [isLoading, setIsLoading] = useState(true);
    const [tableView, setTableView] = useState({
        showDepartments: false,
        showApplications: true,
        showProjects: true
    });

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const datasets = 
        <>
        <button onClick={() => setTableView({...tableView, showDepartments: !tableView.showDepartments})}>
            Departments/Agencies</button>
        <button onClick={() => setTableView({...tableView, showApplications: !tableView.showApplications})}>
            IT Applications</button>
        <button onClick={() => setTableView({...tableView, showProjects: !tableView.showProjects})}>
            IT Projects</button>
        <div style={{display:'flex'}}>
            {
                tableView.showDepartments 
                ? 
                <Dataset 
                    headerTitle="Departments/Agencies"
                    flexValue={1} 
                    data={departments} 
                    dataFields={departmentFields}/>
                : null
            }
            {
                tableView.showApplications 
                ? 
                <Dataset 
                    headerTitle="IT Applications"
                    flexValue={4} 
                    data={applications} 
                    dataFields={applicationFields}/>
                : null
            }
            {
                tableView.showProjects 
                ? 
                <Dataset 
                    headerTitle="IT Projects"
                    flexValue={4} 
                    data={projects} 
                    dataFields={projectFields}/>
                : null
            }
        </div>
        </>;
    return (
        <>{ isLoading ? <h1>Loading...</h1> : datasets }</>
    );
};

const Dataset = ({headerTitle, data, dataFields}) => {
    return (
        <div>
          <h1>{headerTitle}</h1>
          { data.map(record => {
            return (
                <table key={record.id} style={{...styles.tableStyles, borderCollapse:'collapse',
                    backgroundColor:`${record._id % 2 === 0 ? 'grey' : 'white'}`}}>
                    <tbody>
                    {dataFields.map(field => {
                        let row;
                        if(field.id === '_id') {
                            row = null;
                        } else {
                            row = 
                                <tr key={field.id}>
                                    <td style={styles.tableStyles}><b>{field.id}</b></td>
                                    <td style={styles.tableStyles}>{record[field.id]}</td>
                                </tr>
                        }
                        return (row)
                    })}
                    </tbody>
                </table>
              );
          })}
        </div>
    )
};



export default Data;