import React from 'react';
import { useData } from '../../../providers/DataProvider';
import _ from 'lodash';
import ITRoadmapTimeline from '../../../graphs/ITRoadmapTimeline/ITRoadmapTimeline';
import Popper from '@material-ui/core/Popper';

const ITRoadmap = () => {
    const { applications, projects } = useData();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
      };
      const id = open ? 'simple-popper' : undefined;

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

    return(<>
        <ITRoadmapTimeline/>
        <div onMouseEnter={handleClick} onMouseLeave={handleClick} style={{width:'100',height:'100', border:'1px solid black'}}>Test</div>
        <Popper id={id} open={open} anchorEl={anchorEl}>
            <div>The content of the Popper.</div>
        </Popper>    
        </>);
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