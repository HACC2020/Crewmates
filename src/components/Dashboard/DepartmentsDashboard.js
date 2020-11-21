import React from 'react';
import DepartmentsByAppsProjects from '../../graphs/Departments/DepartmentsByAppsProjects';
import { Container, Row, Col } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const DepartmentsDashboard = () => {

    return (
        <Container style={{padding:'0'}} fluid>
            <Row>
                <Col style={{height:'100%', marginTop:'1em'}} sm={12}>
                    <Paper style={{ overflow:'scroll'}} elevation={2} square>
                        <Card>
                            <CardContent>
                                <DepartmentsByAppsProjects/>
                            </CardContent>
                        </Card>
                    </Paper>
                </Col>
            </Row>
        </Container>
    );
};

export default DepartmentsDashboard;