import React from 'react';
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

    return (
    <div style={{display:'flex'}}>
        <Dataset 
            headerTitle="Departments/Agencies"
            flexValue={1} 
            data={departments} 
            dataFields={departmentFields}/>
        <Dataset 
            headerTitle="IT Applications"
            flexValue={4} 
            data={applications} 
            dataFields={applicationFields}/>
        <Dataset 
            headerTitle="IT Projects"
            flexValue={4} 
            data={projects} 
            dataFields={projectFields}/>
    </div>
    );
};

const Dataset = ({headerTitle, flexValue, data, dataFields}) => {
    return (
        <div style={{flex: flexValue}}>
          <h1>{headerTitle}</h1>
          { data.map(record => {
            return <table style={{...styles.tableStyles, borderCollapse:'collapse',
            backgroundColor:`${record._id % 2 === 0 ? 'grey' : 'white'}`}}>
              {dataFields.map(field => {
                let row;
                if(field.id === '_id') {
                    row = null;
                } else {
                    row = 
                        <tr>
                            <td style={styles.tableStyles}><b>{field.id}</b></td>
                            <td style={styles.tableStyles}>{record[field.id]}</td>
                        </tr>
                }
                return (row)
              })}
              </table>;
          })}
        </div>
    )
};



export default Data;