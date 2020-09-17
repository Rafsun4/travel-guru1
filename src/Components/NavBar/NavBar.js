import React from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import './NavBar.css';
import logo from '../../images/Logo.png';
import { Link, useHistory } from 'react-router-dom';

const NavBar = () => {
    const history = useHistory();
    const handleLoginRoute = () => {
        history.push("/user");
    };
    return (
        <Container>
            <Navbar className="pr-5">
                <Link to="/home"><Navbar.Brand className="nav_brand px-5">
                    <img src={logo} alt="logo" />
                </Navbar.Brand></Link>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </Form>
                <Nav className="ml-auto nav">
                    <Link className="mr-5 text-white font-weight-bold " to="/news">News</Link>
                    <Link className="mr-5 text-white font-weight-bold" to="/destination">Destination</Link>
                    <Link className="mr-5 text-white font-weight-bold" to="/blog">Blog</Link>
                    <Link className="mr-5 text-white font-weight-bold" to="/Contact">Contact</Link>
                    <Button onClick={handleLoginRoute} className="btn btn-sm btn-warning px-4 py-2 font-weight-bold">Login</Button>
                </Nav>
            </Navbar>
        </Container>
    );
};

export default NavBar;