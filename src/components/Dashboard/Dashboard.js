import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';

const Dashboard = () => {
    const { applications, projects } = useData();

    //const [ TIMEMetric, setTIMEMetric] = useState(null);

    //setTIMEMetric(calculateTIMEMetric(applications));

    // Applications Metrics
    const TIMEMetric = calculateTIMEMetric(applications);
    const functionalFitMetric = calculateFunctionalFitMetric(applications);
    const technicalFitMetric = calculateTechnicalFitMetric(applications);
    const businessCriticalityMetric = calculateBusinessCriticalityMetric(applications);
    const hostingTypeMetric = calculateHostingTypeMetric(applications);
    const majorInformationSystemsCount = calculateMajorInformationSystems(applications);

    // Projectst Metrics
    const projectStatusMetric = calculateProjectStatusMetric(projects);
    const projectBusinessValueMetric = calculateBusinessValueMetric(projects);
    const projectRiskMetric = calculateProjectRiskMetric(projects);

    return (
        <>
        <header className="App-header">
            Dashboard
        </header>
        
        
        </>
    );
};

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

const calculateMajorInformationSystems = applications => {
    let count = 0;

    applications.forEach(app => {
        if(app.majorInformationSystemsTag === 'Major Information Systems') {
            count++;
        }
    });

    return count;
}

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

export default Dashboard;