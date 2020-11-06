import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';

const DataContext = React.createContext(null);

const DataProvider = ({children}) => {
    const [departments, setDepartments] = useState([]);
    const [departmentFields, setDepartmentFields] = useState([]);
    const [applications, setApplications] = useState([]);
    const [applicationFields, setApplicationFields] = useState([]);
    const [projects, setProjects] = useState([]);
    const [projectFields, setProjectFields] = useState([]);

    const url = 'https://opendata.hawaii.gov/api/3/action/datastore_search';
      
    // Resource IDs for all three datasets
    const departments_rid = '50e32460-83ff-4c01-a40c-bcea5e76ae8d';
    const applications_rid = '9468a555-8d1f-42fb-b1a9-c3ae0d5c756d';
    const projects_rid = '63c0030c-a8ff-419b-9139-990c475cc6e8';

    useEffect(() => {
        // Get all records from all three datasets
        getRecords(url, departments_rid, 1000, setDepartments, setDepartmentFields);
        getRecords(url, applications_rid, 1000, setApplications, setApplicationFields);
        getRecords(url, projects_rid, 1000, setProjects, setProjectFields);
    }, []);

    // Function to make HTTP GET request to a given url with optional
    // parameters: resource_id and limit.
    // setDatabase is a React Hook setter function to be called.
    // setField is also a React Hook setter function to be called.
    const getRecords = (url, resource_id, limit, setDatabase, setField) => {
        axios.get(url, {
        params: {
            resource_id,
            limit
        }
        })
        .then(function (response) {
            console.log(response);
            setDatabase(response.data.result.records);
            if(setField !== null) {
            setField(response.data.result.fields);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    /********************APPLICATIONS METRICS CALCULATION FUNCTIONS *************************/

    const calculateTIMEMetric = applications => {
        let eliminate = 0;
        let invest = 0;
        let migrate = 0;
        let tolerate = 0;
        let missing = 0;
    
        applications.forEach(app => {
            switch (app.timeTag) {
                case 'Tolerate':
                    tolerate++;
                    break;
                case 'Invest':
                    invest++;
                    break;
                case 'Migrate':
                    migrate++;
                    break;
                case 'Eliminate':
                    eliminate++;
                    break;
                default:
                    missing++;
                    break;
            }
        });
    
        return { eliminate, invest, migrate, tolerate, missing};
    };
    
    const calculateFunctionalFitMetric = applications => {
        let excellent = 0;
        let adequate = 0;
        let insufficient = 0;
        let poor = 0;
        let missing = 0;
    
        applications.forEach(app => {
            switch (app.functionalFit) {
                case 'excellent':
                    excellent++;
                    break;
                case 'adequate':
                    adequate++;
                    break;
                case 'insufficient':
                    insufficient++;
                    break;
                case 'poor':
                    poor++;
                    break;
                default:
                    missing++;
                    break;
            }
        });
    
        return { excellent, adequate, insufficient, poor, missing};
    };
    
    const calculateTechnicalFitMetric = applications => {
        let excellent = 0;
        let adequate = 0;
        let insufficient = 0;
        let poor = 0;
        let missing = 0;
    
        applications.forEach(app => {
            switch (app.technicalFit) {
                case 'excellent':
                    excellent++;
                    break;
                case 'adequate':
                    adequate++;
                    break;
                case 'insufficient':
                    insufficient++;
                    break;
                case 'poor':
                    poor++;
                    break;
                default:
                    missing++;
                    break;
            }
        });
    
        return { excellent, adequate, insufficient, poor, missing};
    };
    
    const calculateBusinessCriticalityMetric = applications => {
        let administrativeService = 0;
        let businessOperational = 0;
        let businessCritical = 0;
        let missionCritical = 0;
        let missing = 0;
    
        applications.forEach(app => {
            switch (app.businessCriticality) {
                case 'administrativeService':
                    administrativeService++;
                    break;
                case 'businessOperational':
                    businessOperational++;
                    break;
                case 'businessCritical':
                    businessCritical++;
                    break;
                case 'missionCritical':
                    missionCritical++;
                    break;
                default:
                    missing++;
                    break;
            }
        });
    
        return { 
            administrativeService, 
            businessOperational, 
            businessCritical, 
            missionCritical, 
            missing
        };
    };
    
    const calculateHostingTypeMetric = applications => {
        let onPremise = 0;
        let coLocated = 0;
        let IaaS = 0;
        let PaaS = 0;
        let SaaS = 0;
        let missing = 0;
    
        applications.forEach(app => {
            switch (app.hostingTypeTag) {
                case '@On Premise':
                    onPremise++;
                    break;
                case 'Co-Located':
                    coLocated++;
                    break;
                case 'IaaS':
                    IaaS++;
                    break;
                case 'PaaS':
                    PaaS++;
                    break;
                case 'SaaS':
                    SaaS++;
                    break;
                default:
                    missing++;
                    break;
            }
        });
    
        return { 
            onPremise, 
            coLocated, 
            IaaS, 
            PaaS, 
            SaaS,
            missing
        };
    };

    // return   ticks, xValues - data for the chart
    //          active, plan, end, missing - count of how many apps are in this stage
    const calculateTimelineMetric = applications => {
        let ticks = [];     // ticks for the x axis
        let years = [];     // initial array with the active years from the data
        let xValues = [];   // count of the number of apps active from each year
        let active = 0;     // number of apps currently active
        let plan = 0;       // number of apps in the planning stage
        let end = 0;        // number of apps past their end of life
        let missing = 0;    // number of apps with missing data for their lifecycle

        let numYears = 0;   // year max - min
        let count = 0;      // how many active apps in each year

        const todayDateObject = new Date();
        const todayYear = todayDateObject.getFullYear();
        const todayMonth = String(todayDateObject.getMonth() + 1).padStart(2, '0');
        const todayDay = String(todayDateObject.getDate()).padStart(2, '0');
        const today = todayYear + '-' + todayMonth + '-' + todayDay;

        applications.forEach(app => {
            let appActive;      // date the application is active
            let appEOL;         // date of the applications eof
            appActive = app['lifecycle:active'];
            appEOL = app['lifecycle:endOfLife'];

            if (appActive < today && (appEOL >= today || appEOL === null)) {
                years.push(parseInt(appActive.slice(0, 4)));
            } else if (app['lifecycle:plan'] !== null || appActive > today) {
                plan++;
            } else if (appEOL < today) {
                end++;
            } else if (appEOL === null) {
                missing++;
            }
        });

        active = years.length;
        years.sort();
        numYears = years[years.length - 1] - years[0];

        // gets the tick values
        for (let i = 0; i <= numYears; i++) {
            ticks.push(years[0] + i);
        }

        // actual values per year
        for (let i = 0; i <= numYears; i++) {
            count = years.filter(year => year === ticks[i]).length;
            xValues.push(count);
        }

        return { ticks, xValues, active, plan, end, missing };
    };


    /********************PROJECTS METRICS CALCULATION FUNCTIONS *************************/
    const calculateProjectCancelledCompleted = projects => {
        let cancelled = 0;
        let projectedCompleted = 0;
        let missing = 0;

        projects.forEach(project => {
            const projectCancelled = project['lifecycleCustom:cancelled'];
            const projectCompletion = project['lifecycleCustom:projectedCompletion'];

            if (projectCancelled !== null) {
                cancelled++;
            } else if (projectCompletion !== null) {
                projectedCompleted++;
            } else {
                missing++;
            }
        });
    
        return { cancelled, projectedCompleted, missing };
    };

    const calculateProjectStatusMetric = projects => {
        let green = 0;
        let yellow = 0;
        let red = 0;
        let missing = 0;
    
        projects.forEach(project => {
            switch (project.projectStatus) {
                case 'green':
                    green++;
                    break;
                case 'yellow':
                    yellow++;
                    break;
                case 'red':
                    red++;
                    break;
                default:
                    missing++;
                    break;
            }
        });
    
        return { green, yellow, red, missing };
    };
    
    const calculateBusinessValueMetric = projects => {
        let marginal = 0;
        let little = 0;
        let large = 0;
        let significant = 0;
        let missing = 0;
    
        projects.forEach(project => {
            switch (project.businessValue) {
                case 'marginalBusinessBenefit':
                    marginal++;
                    break;
                case 'littleBusinessBenefit':
                    little++;
                    break;
                case 'largeBusinessBenefit':
                    large++;
                    break;
                case 'significantBusinessBenefit':
                    significant++;
                    break;
                default:
                    missing++;
                    break;
            }
        });
    
        return { marginal, little, large, significant, missing };
    };

    const calculateProjectRiskMetric = projects => {
        let low = 0;
        let moderate = 0;
        let high = 0;
        let severe = 0;
        let missing = 0;
    
        projects.forEach(project => {
            switch (project.projectRisk) {
                case 'lowProjectRisk':
                    low++;
                    break;
                case 'moderateProjectRisk':
                    moderate++;
                    break;
                case 'highProjectRisk':
                    high++;
                    break;
                case 'severeProjectRisk':
                    severe++;
                    break;
                default:
                    missing++;
                    break;
            }
        });
    
        return { low, moderate, high, severe, missing };
    };

    const calculateMajorInformationSystems = applications => {
        let count = 0;
    
        applications.forEach(app => {
            if(app.majorInformationSystemsTag === 'Major Information Systems') {
                count++;
            }
        });
    
        return count;
    };

    return (
        <DataContext.Provider
            value={{
                departments,
                departmentFields,
                applications,
                applicationFields,
                projects,
                projectFields,
                calculateTIMEMetric,
                calculateFunctionalFitMetric,
                calculateTechnicalFitMetric,
                calculateBusinessCriticalityMetric,
                calculateHostingTypeMetric,
                calculateProjectCancelledCompleted,
                calculateProjectStatusMetric,
                calculateBusinessValueMetric,
                calculateProjectRiskMetric,
                calculateMajorInformationSystems,
                calculateTimelineMetric
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

const useData = () => {
    const data = useContext(DataContext);
    return data;
};

export { DataProvider, useData };
