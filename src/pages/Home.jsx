import React, { useEffect, useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img.png'
import '../styles/home.scss';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import Services from '../services/Services';
import ProductsList from '../components/UI/ProductsList';
import products from '../assets/data/products'
import counterImgList from '../assets/images/counter-timer-img.png'
import Clock from '../components/UI/Clock';

const Home = () => {

    const [trendingProducts, setTrendingProducts] = useState([])

    const [bestSalesProduct, setBestSalesProducts] = useState([])

    const year = new Date().getFullYear();

    useEffect(() => {
        const filterdTrendingProducts = products.filter(item => item.category === "chair");

        const filterBestSalesProducts = products.filter(item => item.category === "sofa");

        setTrendingProducts(filterdTrendingProducts);
        setBestSalesProducts(filterBestSalesProducts);
    }, [])

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
                        <Col lg='12'>
                            <h2 className='section_title'>Trending Products</h2>
                        </Col>
                        <ProductsList data={trendingProducts} />
                    </Row>
                </Container>
            </section>

            <section className='best_sales'>
                <Container>
                    <Row>
                        <Col lg='12' className='text-center'>
                            <h2 className='section_title'>Best Sales</h2>
                        </Col>

                        <ProductsList data={bestSalesProduct} />
                    </Row>
                </Container>
            </section>
            <section className="timer_count">
                <Container>
                    <Row>
                        <Col lg='6' md='6'>
                            <div className="clock_top-content">
                                <h4 className='text-white fs-6 mb-2'>Limited Offer</h4>
                                <h3 className='text-white fs-5 mb-3'>Quality Armchair</h3>
                            </div>

                            <Clock />

                            <motion.button whileTap={{ scale: 1.2 }} className='buy_btn store_btn'>
                                <Link to="/shop">
                                    Visit Store
                                </Link>
                            </motion.button>
                        </Col>
                        <Col lg='6' md='6' className='text-end'>
                            <img src={counterImgList} alt='' />
                        </Col>

                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Home;