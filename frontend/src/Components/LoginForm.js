import React, {useState} from 'react';
import {Container, Form, Row, Col, Button,} from 'react-bootstrap';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '../Hooks/useAuthContext';
const axios = require('axios').default;

const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"), 
});

function LoginForm(){

    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    

    return(
        <>
            <Container>
                <Row>
                    <Col>
                        <h6 className='text-muted text-start pb-3'>
                            Welcome to Inventory Tracker
                        </h6>
                        <h1 className="pb-3 text-start">
                            Log into your Account
                        </h1>
                        <Formik
                            initialValues={{
                                email:"",
                                password: "",
                            }}
                            validationSchema={schema}
                            onSubmit={async(values, actions) => {
                                actions.setSubmitting(true);

                                //POST
                                try {
                                    const response = await axios.post(
                                        "/users/login", 
                                        values,
                                        {
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                        }
                                        )

                                    if(response){
                                        localStorage.setItem('user', JSON.stringify(response.data));
                                        dispatch({type: 'LOGIN', payload: response.data});
                                        actions.resetForm();
                                        actions.setSubmitting(false);
                                        navigate('/inventory') ;
                                    }

                                } catch(err) {
                                    setError(err.response.data.message);
                                    } 
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
                                    <Button className="btn btn-danger w-100 font-weight-bold mt-2 pb-2" type="submit">
                                        Login
                                    </Button>
                                    {error && <div className="error">{error}</div>}
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