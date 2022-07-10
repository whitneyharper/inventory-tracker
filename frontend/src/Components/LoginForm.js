import React from 'react';
import {Container, Form, Row, Col, Button, Image} from 'react-bootstrap';
// import { Formik } from 'formik';
import './LoginForm.css'
// import * as yup from 'yup';

function LoginForm(){
    return(
        <>
            <Container>
                <Row className="g-0 m-5 shadow-lg">
                    <Col lg={6} className="d-sm-none d-md-none d-none d-lg-block">
                        <Image src='chuttersnap-JWaXthlA9Cc-unsplash.jpg' className="img-fluid"  style={{minHeight: "100%"}}></Image>
                    </Col>
                    <Col xs={12} md={12} lg={6} className="bg-white p-5">
                        <h6 className='text-muted text-start mt-4 pb-3'>
                            Welcome to Inventory Tracker
                        </h6>
                        <h1 className="pb-3 text-start">
                            Log into your <br></br>Account
                        </h1>
                        <Form className='mb-4'>
                            <Form.Group as={Row} className="mb-3 pb-3" controlId="formGroupEmail">
                                <Form.Label className="text-start">Email address</Form.Label>
                                <Col sm={12}>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3 pb-3" controlId="formGroupPassword">
                                <Form.Label className="text-start">Password</Form.Label>
                                <Col sm={12}>
                                    <Form.Control type="password" placeholder="Password" />
                                </Col>
                            </Form.Group>
                        </Form>
                        <Button className="btn btn-dark w-100 font-weight-bold mt-2 pb-2">
                            Log In
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginForm;