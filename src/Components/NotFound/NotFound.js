import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import img from '../../images/404.png';

const NotFound = () => {
    const mystyle = {
        height: "500px",
        alignItems: "center"
    };
    return (
        <Container>
            <img style={mystyle} src={img} alt="404" />
            <Link to="/home"><Button variant="warning">Go Home</Button></Link>
        </Container>
    );
};

export default NotFound;