import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';

const Dashboard = () => {
    const { applications } = useData();

    //const [ TIMEMetric, setTIMEMetric] = useState(null);

    //setTIMEMetric(calculateTIMEMetric(applications));

    // Appliations Metrics
    const TIMEMetric = calculateTIMEMetric(applications);
    const functionalFitMetric = calculateFunctionalFitMetric(applications);
    const technicalFitMetric = calculateTechnicalFitMetric(applications);
    const businessCriticalityMetric = calculateBusinessCriticalityMetric(applications);
    const hostingTypeMetric = calculateHostingTypeMetric(applications);
    const majorInformationSystemsCount = calculateMajorInformationSystems(applications);

    return (
        <>
        <header className="App-header">
            Dashboard
        </header>

        <div>
            <h2>Applications - Calculated TIME Model Suggestion</h2>
            <ul>
                <li>Tolerate: {TIMEMetric.tolerate}</li>
                <li>Invest: {TIMEMetric.invest}</li>
                <li>Migrate: {TIMEMetric.migrate}</li>
                <li>Eliminate: {TIMEMetric.eliminate}</li>
                <li>Missing Data: {TIMEMetric.missing}</li>
            </ul>
        </div>

        <div>
            <h2>Applications - Functional Fit</h2>
            <ul>
                <li>Excellent: {functionalFitMetric.excellent}</li>
                <li>Adequate: {functionalFitMetric.adequate}</li>
                <li>Insufficient: {functionalFitMetric.insufficient}</li>
                <li>Poor: {functionalFitMetric.poor}</li>
                <li>Missing Data: {functionalFitMetric.missing}</li>
            </ul>
        </div>

        <div>
            <h2>Applications - Technical Fit</h2>
            <ul>
                <li>Excellent: {technicalFitMetric.excellent}</li>
                <li>Adequate: {technicalFitMetric.adequate}</li>
                <li>Insufficient: {technicalFitMetric.insufficient}</li>
                <li>Poor: {technicalFitMetric.poor}</li>
                <li>Missing Data: {technicalFitMetric.missing}</li>
            </ul>
        </div>

        <div>
            <h2>Applications - Business Criticality</h2>
            <ul>
                <li>Administrative Service: {businessCriticalityMetric.administrativeService}</li>
                <li>Business Operational: {businessCriticalityMetric.businessOperational}</li>
                <li>Business Critical: {businessCriticalityMetric.businessCritical}</li>
                <li>Mission Critical: {businessCriticalityMetric.missionCritical}</li>
                <li>Missing Data: {businessCriticalityMetric.missing}</li>
            </ul>
        </div>

        <div>
            <h2>Applications - Hosting Type</h2>
            <ul>
                <li>On Premise: {hostingTypeMetric.onPremise}</li>
                <li>Co-Located: {hostingTypeMetric.coLocated}</li>
                <li>IaaS: {hostingTypeMetric.IaaS}</li>
                <li>PaaS: {hostingTypeMetric.PaaS}</li>
                <li>SaaS: {hostingTypeMetric.SaaS}</li>
                <li>Missing Data: {hostingTypeMetric.missing}</li>
            </ul>
        </div>

        <div>
            <h2>Applications - Major Information Systems</h2>
            <p>#Major Information Systems: {majorInformationSystemsCount}</p>
        </div>

        <div><h1>TODO: Projects Metrics</h1></div>
        </>
    );
};

const calculateTIMEMetric = applications => {
    let eliminate = 0;
    let invest = 0;
    let migrate = 0;
    let tolerate = 0;
    let missing = 0;

    applications.forEach(element => {
        switch (element.timeTag) {
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

    applications.forEach(element => {
        switch (element.functionalFit) {
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

    applications.forEach(element => {
        switch (element.technicalFit) {
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

    applications.forEach(element => {
        switch (element.businessCriticality) {
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

    applications.forEach(element => {
        switch (element.hostingTypeTag) {
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

    applications.forEach(element => {
        if(element.majorInformationSystemsTag === 'Major Information Systems') {
            count++;
        }
    });

    return count;
}

export default Dashboard;