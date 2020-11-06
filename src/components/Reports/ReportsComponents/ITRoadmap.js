import { useData } from '../../../providers/DataProvider';
import _ from 'lodash';
import ITRoadmapTimeline from '../../../graphs/ITRoadmapTimeline/ITRoadmapTimeline';

const ITRoadmap = () => {
    const { applications, projects } = useData();

    // console.log(_.filter(projects, (o) => {
    //     //console.log(compareDates(o['lifecycle:endOfLife']));
    //     //return compareDates(getToday(), o['lifecycle:active']);
    //     //return o['lifecycle:active'] && o['lifecycle:endOfLife'];
    //     //return o['lifecycle:endOfLife'] && !compareDates(o['lifecycle:endOfLife']);
    //     //return compareDates(o['lifecycle:active'], getToday()) && !o['successors'];
    //     return o['lifecycle:active'] && o['lifecycle:endOfLife'] && compareDates(o['lifecycle:endOfLife'], getToday());
    //     //return o['lifecycleCustom:approved'] && !o['lifecycleCustom:projectedStart'];
    // }));

    // console.log(calculateAverageApplicationLifespan(applications));
    // console.log(average(calculateAverageApplicationLifespan(applications)));
    // console.log(getLongApplications(applications));
    // console.log(getMigrateEliminate(applications));
    //console.log(calculateTimeDifference('2020-10-02', '2020-10-05'));
    const getTheYear = date => {
        const dateObj = new Date(date);
        return typeof dateObj.getFullYear();    
    }
    console.log(getTheYear('2014-05-05'));

    return(<ITRoadmapTimeline/>);
};

const compareDates = (date1, date2) => {
    return date1 < date2;
};

const getToday = () => {
    const todayDateObject = new Date();
    const todayYear = todayDateObject.getFullYear();
    const todayMonth = String(todayDateObject.getMonth() + 1).padStart(2, '0');
    const todayDay = String(todayDateObject.getDate()).padStart(2, '0');
    return todayYear + '-' + todayMonth + '-' + todayDay;
};


const calculateAverageApplicationLifespan = applications => {
    // Get all applications with an active and endOfLife date
    const apps = _.filter(applications, (app) => app['lifecycle:active'] && app['lifecycle:endOfLife']);
    let appsLifespans = [];
    
    _.forEach(apps, o => {
        const appStartDate = o['lifecycle:active'];
        const appEndDate = o['lifecycle:endOfLife'];
        appsLifespans.push(calculateTimeDifference(appStartDate, appEndDate));
    })
    return appsLifespans;
};


// Calculate difference between two dates in days
const calculateTimeDifference = (date1, date2) => {
    // Format: 'year-month-day'  Ex. '2000-11-04'
    const newDate1 = new Date(date1);
    const newDate2 = new Date(date2);
    return (newDate2.getTime() - newDate1.getTime())/ (1000 * 3600 * 24);
};

const average = (array) => {
    const sum = _.reduce(array, (sum, currentItem) => {
        return sum + currentItem;
    });
    return sum/array.length;
};

const getLongApplications = applications => {
    const apps = _.filter(applications, (app) => app['lifecycle:active'] && app['lifecycle:endOfLife'])
    return _.filter(apps, o => {
        const appStartDate = o['lifecycle:active'];
        const appEndDate = o['lifecycle:endOfLife'];
        return calculateTimeDifference(appStartDate, appEndDate) > 1461; 
    })
}

const getMigrateEliminate = applications => {
    const apps = _.filter(applications, (app) => app['lifecycle:active'] && app['lifecycle:endOfLife'])

    return _.filter(apps, o => {
        return o['timeTag'] === 'Migrate' || o['timeTag'] === 'Eliminate';
    })
}


export default ITRoadmap;