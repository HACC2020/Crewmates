import { useData } from '../../providers/DataProvider';
import _ from 'lodash';
import Tree from 'react-d3-tree';


const DepartmentsTree = () => {
    const { departments, applications } = useData();

    //let hierarchyData = buildData(departments, applications);
    const root = buildTree(departments, applications)

    // const margin = ({top: 10, right: 120, bottom: 10, left: 40});
    // const width = 750;
    // const height = 750;

    const dimensionStyle = {
        height: '100vh'
    }
    
    return (
    <div style={{...dimensionStyle, border:'1px solid black'}}>
        <Tree translate={{x:300, y:300}}
            scaleExtent={{min:0.1, max: 5}}
            zoom={1} orientation="horizontal" pathFunc="diagonal" transitionDuration={250} initialDepth={1} data={root}/>
    </div>
        );

};

// const buildData = (departments, applications) => {
//     let tree = [];
//     tree.push({id: "Departments/Agencies", parentId: ""});
//     tree.push({id: "Legislature", parentId: "Departments/Agencies"});
//     _.forEach(departments, dep => {
//         tree.push({
//             id: dep.name,
//             parentId: dep.parent || "Departments/Agencies"
//         })
//     })
//     _.forEach(applications, app => {
//         tree.push({
//             id: app.name,
//             parentId: app.ownerAgencyName,
//             data: app
//         })
//     });
//     return tree;
// };

const buildTree =  (departments, applications) => {
    let root = {
        name: 'Departments/Agencies',
        children: []
    };

    let topLevelDepartments = _.filter(departments, d => !d.parent);
    let subDepartments = _.filter(departments, d => d.parent);
    console.log(subDepartments);
    root.children.push({
        name:'Legislature'
    });

    _.forEach(topLevelDepartments, dep => {
        const childApps = _.filter(applications, app => {
            return dep.name === app.ownerAgencyName;
        });
        root.children.push({
            name: dep.name,
            children: [...childApps]
        });
    });

    _.forEach(subDepartments, d => {
        // Find the index of the sub department in root.children
        const i = _.findIndex(root.children, (child) => {
            return child.name === d.parent;
        });

        // Find the sub department's applications
        const childApps = _.filter(applications, app => {
            return d.name === app.ownerAgencyName
        });

        // Insert into the children array of its parent
        if(i >= 0) {
            root.children[i].children.push({
                name: d.name,
                children: childApps
            });
        }
    })

    return root;
}

export default DepartmentsTree;