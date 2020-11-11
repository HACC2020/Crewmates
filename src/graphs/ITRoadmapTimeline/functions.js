
import moment from 'moment';
import _ from 'lodash';

const getTheYear = date => {
    const dateMoment = moment(date);
    return dateMoment.get('year');    
}

// date format: YYYY-MM-DD
const getMonthsFromDate = (minYear, date) => {
    const dateAsMoment = moment(date);
    const year = dateAsMoment.get('year');
    const month = dateAsMoment.get('month');

    return ((year - minYear) * 12) + month;
}

const buildRoadmapData = (applications, minYear) => {
    let data = [];
    _.forEach(applications, app => {
        let color = 'var(--missing-data-color)';
        let textColor = 'var(--theme-color-5)';
        let highlightColor = 'var(--missing-data-color-active)';

        const rating = fieldToRating(app.timeTag);
        if(rating === 1) {
            color = 'var(--warning-color-red)';
            textColor = 'white';
            highlightColor = 'var(--warning-color-red-active)'
        } 
        if(rating === 2) {
            color = 'var(--warning-color-orange)';
            highlightColor = 'var(--warning-color-orange-active)'
        } 
        if(rating === 3) {
            color = 'var(--warning-color-yellow)';
            highlightColor = 'var(--warning-color-yellow-active)'
        } 
        if(rating === 4) {
            textColor = 'white';
            color = 'var(--warning-color-green)';
            highlightColor = 'var(--warning-color-green-active)'
        } 

        const appData = {
            id: app.id,
            start: getMonthsFromDate(minYear, app['lifecycle:active']),
            end: getMonthsFromDate(minYear, app['lifecycle:endOfLife']),
            label: app.name,
            department: app.ownerAgencyName,
            color: color,
            textColor: textColor,
            highlightColor: highlightColor,
            data: app
        };

        data.push(appData); // Insert into new array
    });
    return data;
};

/* Given a field and an application return an integer representing 
    a rating of that field.
    
    Ex: 
    const field = 'timeTag';
    const fieldValue = 'Invest';

    const rating = fieldToRating(field, fieldValue);
    // 4
*/
const fieldToRating = (fieldValue) => {
    let rating = 0;
    switch (fieldValue) {

        // If it's a businessCriticality value
        case 'missionCritical':
            rating = 1;
            break;
        case 'businessCritical':
            rating = 2;
            break;
        case 'businessOperational':
            rating = 3;
            break;
        case 'administrativeService':
            rating = 4;
            break;

        // If it's TIME tag
        case 'Eliminate':
            rating = 1;
            break;
        case 'Migrate':
            rating = 2;
            break;
        case 'Tolerate':
            rating = 3;
            break;
        case 'Invest':
            rating = 4;
            break;

        // If it's functionalFit
        case 'poor':
            rating = 1;
            break;
        case 'insufficient':
            rating = 2;
            break;
        case 'adequate':
            rating = 3;
            break;
        case 'excellent':
            rating = 4;
            break;
        default:
            rating = 0;
            break;
    }

    return rating;
};

export { getTheYear, getMonthsFromDate, buildRoadmapData };