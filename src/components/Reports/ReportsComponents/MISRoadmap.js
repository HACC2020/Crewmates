import React, { useState, useEffect } from 'react';
import { useData } from '../../../providers/DataProvider';
import Chip from '@material-ui/core/Chip';

const MISRoadmap = () => {

	const { applications, projects, calculateMISRelations, calculateMajorInformationSystems } = useData();
	console.log(calculateMISRelations);

	const [projectsMetrics, setProjectsMetrics] = useState({
        MISRelations: calculateMISRelations(projects),
        wtf: calculateMajorInformationSystems(applications)
    });

    useEffect(() => {
        setProjectsMetrics({
            MISRelations: calculateMISRelations(applications, projects),
            wtf: calculateMajorInformationSystems(applications)
        });
    }, [applications, projects]);

    // data for table
    const { MISRelations, wtf } = projectsMetrics;
    const { MISApps, current, future } = MISRelations;
    console.log(wtf);
  	console.log(MISApps);
  	console.log(current);
  	console.log(future);

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