import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';

const ProjectsDashboard = () => {
    const { 
        projects,
        calculateProjectStatusMetric,
        calculateBusinessValueMetric,
        calculateProjectRiskMetric
    } = useData();

    const [projectsMetrics, setProjectsMetrics] = useState({
        projectStatusMetric: calculateProjectStatusMetric(projects),
        projectBusinessValueMetric: calculateBusinessValueMetric(projects),
        projectRiskMetric: calculateProjectRiskMetric(projects)
    });

    useEffect(() => {
        setProjectsMetrics({
            projectStatusMetric: calculateProjectStatusMetric(projects),
            projectBusinessValueMetric: calculateBusinessValueMetric(projects),
            projectRiskMetric: calculateProjectRiskMetric(projects)
        });
    }, [projects, calculateProjectStatusMetric, calculateBusinessValueMetric, calculateProjectRiskMetric]);

    // Projectst Metrics
    const { projectStatusMetric, projectBusinessValueMetric, projectRiskMetric } = projectsMetrics;

    return (
    <>
        <div>
            <h1>TODO: Projects Dashboard</h1>
        </div>
    </>   
    );
};

export default ProjectsDashboard;