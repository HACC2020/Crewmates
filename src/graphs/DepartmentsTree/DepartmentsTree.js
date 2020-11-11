import { useData } from '../../providers/DataProvider';
import _ from 'lodash';
import Tree from 'react-d3-tree';

// Material UI
import Paper from '@material-ui/core/Paper';

const DepartmentsTree = () => {
    const { departments, applications } = useData();

    //let hierarchyData = buildData(departments, applications);
    const root = buildTree(departments, applications)

    // const margin = ({top: 10, right: 120, bottom: 10, left: 40});
    // const width = 750;
    // const height = 750;

    const dimensionStyle = {
        height: '600px',
    };

    const customTreeStyle = {
        links: { strokeWidth:.2 },
        nodes: {
            node: {
                circle: { strokeWidth:0, fill: 'var(--theme-color-2)' },
            },
            leafNode: {
                circle: { strokeWidth: .2, fill: 'var(--theme-color-4)' },
          },
        },
      };
    
    return (
        <Paper style={dimensionStyle} elevation={2} square>
        <Tree translate={{x:300, y:300}}
            scaleExtent={{min:0.1, max: 10}}
            zoom={1} orientation="horizontal" 
            pathFunc="diagonal" 
            transitionDuration={250} 
            initialDepth={1} 
            data={root}
            depthFactor={150}
            separation={{siblings: 1, nonSiblings: 3}}
            textLayout={{textAnchor: "middle", x: 0, y: -20, transform: `rotate(-10)` }}
            styles={customTreeStyle}/>
        </Paper>
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

    // Exception
    // root.children.push({
    //     name:'Legislature'
    // });

    _.forEach(topLevelDepartments, dep => {
        const childApps = _.filter(applications, app => {
            return dep.name === app.ownerAgencyName;
        });
        
        let childAppsWithData = [];
        _.forEach(childApps, c => {
            childAppsWithData.push({
                ...c,
                nodeSvgShape: {
                    shape: 'circle',
                    shapeProps: {
                      r: 10,
                      strokeWidth: 0,
                      fill: getAppColor(c)
                    }
                }
            })
        });

        root.children.push({
            name: dep.name,
            children: [...childAppsWithData],
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

        let childAppsWithData = [];
        _.forEach(childApps, c => {
            childAppsWithData.push({
                ...c,
                nodeSvgShape: {
                    shape: 'circle',
                    shapeProps: {
                      r: 10,
                      strokeWidth: 0,
                      fill: getAppColor(c)
                    }
                }
            })
        });

        // Insert into the children array of its parent
        if(i >= 0) {
            root.children[i].children.push({
                name: d.name,
                children: childAppsWithData
            });
        }
    })

    return root;
}

const getAppColor = (app) => {
    const { timeTag } = app;
    if(timeTag === 'Invest') return 'var(--warning-color-green)';
    if(timeTag === 'Tolerate') return 'var(--warning-color-lightgreen)';
    if(timeTag === 'Migrate') return 'var(--warning-color-yellow)';
    if(timeTag === 'Eliminate') return 'var(--warning-color-red)';
    return '--theme-color-4'
};

export default DepartmentsTree;