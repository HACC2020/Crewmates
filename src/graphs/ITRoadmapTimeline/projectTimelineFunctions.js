import moment from 'moment';
import _ from 'lodash';

const buildData = projects => {
    let data = _.filter(projects, p => {
        return p['lifecycleCustom:projectedStart'] && p['lifecycleCustom:projectedCompletion'];
    });

    return data;
};

const getMinDate = projects => {
    let min = moment(projects[0]['lifecycleCustom:projectedStart']);
    let current = 0;
    _.forEach(projects, p => {
        current = moment(p['lifecycleCustom:projectedStart']);
        if(current.valueOf() < min.valueOf()) min = moment(p['lifecycleCustom:projectedStart']);
    });
    return min;
};

const getMaxDate = projects => {
    let max = moment(projects[0]['lifecycleCustom:projectedCompletion']);
    let current = 0;

    _.forEach(projects, p => {
        current = moment(p['lifecycleCustom:projectedCompletion']);
        if(current.valueOf() > max.valueOf()) max = moment(p['lifecycleCustom:projectedCompletion']);
    });
    return max;
};

// Returns average lifespan in months
const getAverageLifeSpan = projects => {
    let sum = 0;
    _.forEach(projects, p => {
        const start = moment(p['lifecycleCustom:projectedStart']); // In milliseconds
        const end = moment(p['lifecycleCustom:projectedCompletion']); // In milliseconds
        const lifespan = end.diff(start, 'months');
        sum += lifespan;
    });

    const average = Math.floor(sum/projects.length);
    return average;
};

const getMode = projects => {
    const modes = _.countBy(projects, p => {
        const start = moment(p['lifecycleCustom:projectedStart']); // In milliseconds
        const end = moment(p['lifecycleCustom:projectedCompletion']); // In milliseconds
        const lifespan = end.diff(start, 'months');
        return lifespan;
    });
    let modesArray = [];
    _.forIn(modes, (value, key) => {
        modesArray.push({months: parseInt(key), numProjects: value});
    })
    const sortedModesArray = _.sortBy(modesArray, o => o.numProjects);

    return sortedModesArray[sortedModesArray.length-1];
};

export { buildData, getMinDate, getMaxDate, getAverageLifeSpan, getMode };