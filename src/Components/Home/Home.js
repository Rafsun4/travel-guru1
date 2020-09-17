import React from 'react';
import NavBar from '../NavBar/NavBar';
import './Home.css';
import Header from '../Header/Header';

const Home = () => {
    return (
        <div className="home-style">
            <NavBar />
            <Header />
        </div>
    );
};

export default Home;