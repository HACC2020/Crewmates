import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const ApplicationCard = ({data}) => {
    return (
        <Card style={{width:'300px'}}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {moment(data['lifecycle:active']).format('YYYY MMMM DD')} 
            {`     -     `}
            {moment(data['lifecycle:endOfLife']).format('YYYY MMMM DD')}
          </Typography>
          <Typography variant="h5" component="h2">
            {data.name}
          </Typography>
          <Typography color="textSecondary">
            {data.ownerAgencyName}
          </Typography>
          <Typography variant="body2" component="p">
            JASON FILL OUT THE REST OF THIS
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      </Card>
    );
};

export default ApplicationCard;