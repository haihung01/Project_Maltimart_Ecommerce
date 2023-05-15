import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img.png'
import '../styles/home.scss';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import Services from '../services/Services';

const Home = () => {

    const year = new Date().getFullYear();
    return (
        <Helmet title={"Home"}>
            <section className='hero_section'>
                <Container>
                    <Row>
                        <Col lg='6' md='6'>
                            <div className="hero_content">
                                <p className="hero_submititle">Trending product in {year}</p>
                                <h2>Make Your Interior More Minimalistic & Modern</h2>
                                <p>Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Sunt, amet! Architecto dolorum consequuntur
                                    exercitationem commodi ipsa praesentium aspernatur velit ratione!
                                    Illum odit autem tempore consequatur veniam ab ipsa dolorum facilis?</p>
                                <motion.button whileTap={{ scale: 1.2 }} className='buy_btn'><Link to='shop'>SHOP NOW</Link></motion.button>
                            </div>
                        </Col>
                        <Col lg='6' md='6'>
                            <div className='hero_img'>
                                <img src={heroImg} alt='' />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Services />
            <section className='trending_products'>
                <Container>
                    <Row>
                        <Col>
                            <h2></h2>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Home;