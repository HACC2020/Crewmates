import moment from 'moment';
import _ from 'lodash';

const buildData = (projects, applications) => {
    // Get all projects with applications and are not major information systems
    const filteredProjects = _.filter(projects, p => {
        const applicationNames = p.applications;
        return p.applications && !isMajorInformationSystem(applicationNames, applications);
    });

    return filteredProjects;
};

const getMinDate = dates => {
    let min = moment(dates[0]);
    let current = '';
    _.forEach(dates, d => {
        current = moment(d);
        if(current.valueOf() < min.valueOf()) {
            min = current;
        }
    })
    return min;
};

const getMaxDate = dates => {
    let max = moment(dates[0]);
    let current = '';
    _.forEach(dates, d => {
        current = moment(d);
        if(current.valueOf() > max.valueOf()) {
            max = current;
        }
    })
    return max;
}

const isMajorInformationSystem = (applicationNames, applications) => {
    // Extract applications from string
    let isTrue = false;
    const applicationNamesArray = applicationNames.split(';');
    const applicationsArray = _.filter(applications, a => {
        return _.includes(applicationNamesArray, a.name);
    });

    _.forEach(applicationsArray, a => {
        if(a.majorInformationSystemsTag === 'Major Information Systems') isTrue = true;
    });
    return isTrue;
};

// Given a project's applications field
const getApplications = (applicationNames, applications) => {
    const applicationNamesArray = applicationNames.split(';');
    let applicationsData = _.filter(applications, a => {
        return _.includes(applicationNamesArray, a.name);
    });
    return applicationsData;
};

/* Given a field and an application return an integer representing 
    a rating of that field.
*/
const fieldToRating = (fieldValue) => {
    let rating = 0;
    const businessValue = ['', 'littleBusinessBenefit', 'marginalBusinessBenefit', 'largeBusinessBenefit', 'significantBusinessBenefit'];
    const projectRisk = ['', 'severeProjectRisk', 'highProjectRisk', 'moderateProjectRisk', 'lowProjectRisk'];
    const projectStatus = ['', 'red', 'yellow', 'green'];

    rating = _.findIndex(businessValue, o => o === fieldValue);
    if(rating < 0) rating = _.findIndex(projectRisk, o => o === fieldValue);
    if(rating < 0) rating = _.findIndex(projectStatus, o => o === fieldValue);
    if(rating < 0) rating = 0
    return rating;
};

const mapRatingToColor = (field, rating) => {
    let color = 'var(--missing-data-color)';
    if(field === 'projectStatus') {
        switch (rating) {
            case 1:
                color = 'var(--warning-color-red)'
                break;
            case 2:
                color = 'var(--warning-color-yellow)'
                break;
            case 3:
                color = 'var(--warning-color-green)'
                break;
            default:
                break;
        }
    } else {
        switch (rating) {
            case 1:
                color = 'var(--warning-color-red)'
                break;
            case 2:
                color = 'var(--warning-color-yellow)'
                break;
            case 3:
                color = 'var(--warning-color-lightgreen)'
                break;
            case 4:
                color = 'var(--warning-color-green)'
                break;
            default:
                break;
        }
    }
    return color;
};

export { getMinDate, getMaxDate, buildData, isMajorInformationSystem, getApplications, fieldToRating, mapRatingToColor };