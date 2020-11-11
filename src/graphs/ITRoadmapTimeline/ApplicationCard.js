import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import _ from 'lodash';

const ApplicationCard = ({data, showDate}) => {
    const { name, ownerAgencyName, leadingBusinessCapability,
      businessCriticality, functionalFit, technicalFit,
      timeTag, hostingTypeTag } = data;
    return (
      <Paper square elevation={2}>
        <Card style={{width:'250px', marginBottom:'1em', background:'var(--theme-color-5)'}}>
        <CardContent>
          {!showDate ? null :
            <>
            <Typography color="textSecondary" gutterBottom>
              {moment(data['lifecycle:active']).format('YYYY/MM/DD')} 
              {`  -  `}
              {moment(data['lifecycle:endOfLife']).format('YYYY/MM/DD')}
            </Typography>
            </>
          }
          <Typography variant="h6" component="h2">
            {name}
          </Typography>
          <Divider/>
          <Typography variant="caption" color="textSecondary">
            Department:{ownerAgencyName}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Business Capability: {leadingBusinessCapability}
          </Typography>
          <Divider/>
          <Typography variant="body2" component="p">
            <br/>
            {timeTag ? <>TIME Tag: {_.startCase(timeTag)}<br/></>:null}
            {businessCriticality ? <>Business Criticality: {_.startCase(businessCriticality)}<br/></>:null}
            {functionalFit ? <>Functional Fit: {_.startCase(functionalFit)}<br/></>:null}
            {technicalFit ? <>Technical Fit: {_.startCase(technicalFit)}<br/></>:null}
            {hostingTypeTag ? <>Hosting Type: {hostingTypeTag}<br/></>:null}            
          </Typography>
        </CardContent>
      </Card>
    </Paper>
    );
};

export default ApplicationCard;