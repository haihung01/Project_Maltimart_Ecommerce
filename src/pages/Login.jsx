import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container, Row, Col, FormGroup, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/login.scss'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return <>
        <Helmet title='Login'>
            {/* <CommonSection /> */}
            <section>
                <Container>
                    <Row>
                        <Col lg='6' className='m-auto text-center'>
                            <h3 className='fw-bold mb-4'>Login</h3>

                            <Form className='auth_form'>
                                <FormGroup className='form_group'>
                                    <input
                                        type='email'
                                        placeholder='Enter your email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup className='form_group'>
                                    <input
                                        type='password'
                                        placeholder='Enter your password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </FormGroup>

                                <button type='submit' className="buy_btn auth_btn">Login</button>
                                <p>Don't have an account? <Link to='/signup'>Create an account</Link></p>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>

    </>
};

export default Login;