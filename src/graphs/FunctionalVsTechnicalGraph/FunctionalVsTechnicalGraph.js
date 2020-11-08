import React from 'react';
import { useData } from '../../providers/DataProvider';

const FunctionalVsTechnicalGraph = () => {
    const { applications } = useData();

    const width = 500;
    const height = 500;

    return (
        <svg viewBox={`0, 0, ${width}, ${height}`}>
            <text>Functional Vs Technical Graph :)</text>
        </svg>
    );
};

export default FunctionalVsTechnicalGraph;