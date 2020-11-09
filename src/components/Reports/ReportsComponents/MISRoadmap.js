import React, { useState, useEffect } from 'react';
import { useData } from '../../../providers/DataProvider';
import Chip from '@material-ui/core/Chip';

const MISRoadmap = () => {

	const { applications, projects, calculateMISRelations } = useData();
	console.log(calculateMISRelations);

	const [projectsMetrics, setProjectsMetrics] = useState({
        MISRelations: calculateMISRelations(projects),
    });

    useEffect(() => {
        setProjectsMetrics({
            MISRelations: calculateMISRelations(applications, projects),
        });
    }, [applications, projects, calculateMISRelations]);

    // data for table
    const { MISRelations } = projectsMetrics;
  	console.log(MISRelations);

    return(
    	<div>
    		<h1>Major Information Systems Modernization Roadmap</h1>
    		<div style={{overflowY:'scroll', overflowX:'scroll', height:'100vh'}}>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>
    			<p>hello</p>

    		</div>
    	</div>
    );
};

export default MISRoadmap;