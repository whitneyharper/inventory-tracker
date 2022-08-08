import React from 'react';
import {Container, Form, Row, Col, Button,} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"), 
});

function LoginForm(props){
    return(
        <>
            <Container>
                <Row>
                    <Col>
                        <h6 className='text-muted text-start pb-3'>
                            Welcome to Inventory Tracker
                        </h6>
                        <h1 className="pb-3 text-start">
                            {props.text}
                        </h1>
                        <Formik
                            initialValues={{
                                email:"",
                                password: "",
                            }}
                            validationSchema={schema}
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
                                <Form className='mb-4' noValidate onSubmit={handleSubmit}>
                                    <Form.Group as={Row} className="mb-2 pb-3" controlId="formGroupEmail">
                                        <Form.Label className="text-start">Email address</Form.Label>
                                        <Col sm={12}>
                                            <Form.Control 
                                                type="email" 
                                                placeholder="Enter email" 
                                                name="email" 
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={errors.email && touched.email} 
                                            />
                                            <Form.Control.Feedback  type="invalid">{errors.email}</Form.Control.Feedback> 
                                        </Col>
                    
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-2 pb-3" controlId="formGroupPassword">
                                        <Form.Label className="text-start">Password</Form.Label>
                                        <Col sm={12}>
                                            <Form.Control 
                                                type="password" 
                                                placeholder="Password" 
                                                name="password" 
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={errors.password && touched.password}
                                            />
                                            <Form.Control.Feedback  type="invalid">{errors.password}</Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Button className="btn btn-danger w-100 font-weight-bold mt-2 pb-2">
                                        {props.title}
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