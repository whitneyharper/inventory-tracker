import React from 'react';
import {Container, Form, Row, Col, Button,} from 'react-bootstrap';
import { Formik } from 'formik';
// import * as yup from 'yup';

function LoginForm(){
    return(
        <>
            <Container>
                <Row>
                    <Col>
                        <h6 className='text-muted text-start pb-3'>
                            Welcome to Inventory Tracker
                        </h6>
                        <h1 className="pb-3 text-start">
                            Log into your <br></br>Account
                        </h1>
                        <Formik
                            initialValues={{
                                email:"",
                                password: "",
                            }}
                            // validationSchema={}
                            onSubmit={(values) => {
                                
                                }}
                            >
                             {({
                                handleSubmit,
                                handleBlur,
                                handleChange,               
                                isSubmitting,
                                values,
                                touched,
                                errors,            
                            }) => (
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
                                    <Button className="btn btn-dark w-100 font-weight-bold mt-2 pb-2">
                                        Log In
                                    </Button>
                                </Form>  
                            )
                            }
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LoginForm;