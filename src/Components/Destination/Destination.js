import React, { useContext } from 'react';
import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/Logo.png';
import HotelCard from './Hotels';
import { hotels } from './Data';
import GoogleMap from './GoogleMap';

const Destination = () => {
    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <Container>
                <Navbar className="pr-5">
                    <Link to="/home"><Navbar.Brand className="px-5">
                        <img src={logo} style={{ height: '60px' }} alt="logo" />
                    </Navbar.Brand></Link>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    </Form>
                    <Nav className="ml-auto nav">
                        <Link className="mr-5 text-muted font-weight-bold " to="/news">News</Link>
                        <Link className="mr-5 text-muted font-weight-bold" to="/destination">Destination</Link>
                        <Link className="mr-5 text-muted font-weight-bold" to="/blog">Blog</Link>
                        <Link className="mr-5 text-muted font-weight-bold" to="/Contact">Contact</Link>
                        <Button className="text-bold font-weight-bold">{loggedInUser.name}</Button>
                    </Nav>
                </Navbar>
            </Container>
            <div>
            <hr/>
                <Container>
                    <Row>
                        <Col md={8}>
                            <div>
                                {
                                    hotels.map(hotel => <HotelCard hotel={hotel} />)
                                }
                            </div>
                        </Col>
                        <Col md={4}>
                                <div className="googleMapContainer">
                                <GoogleMap></GoogleMap>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Destination;
