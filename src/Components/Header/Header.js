import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import fakeData from '../FakeData/fakeData';
import { Link } from 'react-router-dom';
import './Header.css';

const Home = () => {
    const places = fakeData;
    const [showPlace, setShowPlace] = useState(places[0]);

    return (
        <section id="home" className="text-white">
            <Container className="pt-5 mt-5">
                <Row className="pl-5">
                    <Col lg={4} className="text-center text-lg-right">
                        <h1 className="placeName">{showPlace.name}</h1>
                        <p className="text-justify">{showPlace.shortDesc}</p>
                        <Link to={"/booking/" + showPlace.name}>
                            <Button variant="warning" className="btn-sm font-weight-bold">Start Booking</Button>
                        </Link>
                    </Col>
                    <Col lg={8} className="pl-5">
                        <Row>
                            {
                                places.map(place =>
                                    <Col className="placePhoto" sm={4} key={place.name}>
                                        <div onClick={() => setShowPlace(place)} 
                                            className="small mt-3 text-white   text-center d-block bg-transparent">
                                            <img src={place.photo} alt="" className="photo" />
                                            {place.name}
                                        </div>
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Home;