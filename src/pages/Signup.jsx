import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
// import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col, FormGroup, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/login.scss';

import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { setDoc, doc } from 'firebase/firestore';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const signup = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const storageRef = ref(storage, `images/${Date.now() + username}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('error', (error) => {
                toast.error(error.message);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    // Update user profile
                    await updateProfile(user, {
                        displayName: username,
                        photoURL: downloadURL,
                    });

                    // Store user data in Firestore database
                    await setDoc(doc(db, 'user', user.uid), {
                        uid: user.uid,
                        displayName: username,
                        email,
                        photoURL: downloadURL,
                    });

                    setLoading(false);
                }).catch((error) => {
                    toast.error(error.message);
                    setLoading(false);
                });
            });
        } catch (error) {
            toast.error('Something went wrong');
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, you can access the user data here
                console.log(user);
            } else {
                // User is signed out
            }
        });

        return () => {
            unsubscribe(); // Unsubscribe the listener when the component is unmounted
        };
    }, []);



    return <>
        <Helmet title='Signup'>
            <section>
                <Container>
                    <Row>
                        <Col lg='6' className='m-auto text-center'>
                            <h3 className='fw-bold mb-4'>Signup</h3>

                            <Form className='auth_form' onSubmit={signup}>
                                <FormGroup className='form_group'>
                                    <input
                                        type='text'
                                        placeholder='Username'
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </FormGroup>


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

                                <FormGroup className='form_group'>
                                    <input
                                        type='file'
                                        onChange={e => setFile(e.target.value)}
                                    />
                                </FormGroup>

                                <button
                                    type='submit'
                                    className="buy_btn auth_btn"
                                >
                                    Create an account
                                </button>

                                <p>
                                    Already have an account?{" "}
                                    <Link to='/login'>Login</Link>
                                </p>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>

    </>
};

export default Signup;