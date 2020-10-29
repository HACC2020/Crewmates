import React, { useState, useEffect } from 'react';
import { useData } from '../../providers/DataProvider';

const MISDashboard = () => {
    const { applications, calculateMajorInformationSystems } = useData();

    const [numberMIS, setNumberMIS] = useState(calculateMajorInformationSystems(applications));
    useEffect(() => { setNumberMIS(calculateMajorInformationSystems(applications))}, []);

    return (
    <>
        <div>
            <h1>TODO: Major Informations Systems Dashboard</h1>
            Number: {numberMIS}
        </div>
    </>
    );
};

export default MISDashboard;