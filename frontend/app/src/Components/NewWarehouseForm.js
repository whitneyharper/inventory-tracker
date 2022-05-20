import React, {useEffect, useState} from 'react';
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import Select from 'react-select';
import NavBar from '../Components/NavBar';
const axios = require('axios').default;


let schema = yup.object().shape({
    name: yup.string().required("Warehouse Name is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required").matches(/(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])/, "Please use state abbreviations"),
    inventory: yup.array()
})


function WarehouseForm() {

    const [products, setProducts] = useState([]);
   
    const url = "http://localhost:5000/inventory";

    

    useEffect(() => {
        const fetchData =  async() => {
            try{
                const response = await axios.get(url);
                setProducts(response.data.products);                
            } catch(error){
                console.log('Error fetching and parsing data', error);
            }
        }       
        fetchData();
    }, [setProducts]);

    return(
        <>
            <NavBar />
            <Container className="mb-5 mt-5">
                <Row>
                    <Col>
                        <h1>New Warehouse</h1>
                    </Col>
                </Row>
            </Container>    

            <Formik
                initialValues={{
                    name: "",
                    city: "",
                    state: "",
                    inventory: []
                }}
                validationSchema={schema}
                onSubmit={async(values, actions) => {
                    actions.setSubmitting(true);

                    //POST
                    try {
                        await axios.post(
                            "http://localhost:5000/warehouse", 
                            values,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                            )
                    } catch(err) {
                        } finally {
                            actions.resetForm();
                            actions.setSubmitting(false);
                        }
                   

                    } }
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    setFieldValue
                }) => (
                    <Container>
                            <Form noValidate onSubmit={handleSubmit}>
                            {console.log(values)}
                                <Form.Group as={Row} className="mb-3 justify-content-center">
                                    <Form.Label column sm={2} className="redAsterisks">
                                    Name
                                    </Form.Label>
                                    <Col sm={5}>
                                    <Form.Control                                         
                                        placeholder="Warehouse Name"
                                        name="name"  
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                        />   
                                    <Form.Control.Feedback  type="invalid">{errors.name}</Form.Control.Feedback>                         
                                    </Col>                                    
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3 justify-content-center">
                                    <Form.Label column sm={2} className="redAsterisks">
                                    City
                                    </Form.Label>
                                    <Col sm={5}>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Enter City" 
                                        name="city"  
                                        value={values.city}
                                        onChange={handleChange}
                                        isInvalid={!!errors.city}
                                     />
                                    <Form.Control.Feedback  type="invalid">{errors.city}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3 justify-content-center">
                                    <Form.Label column sm={2} className="redAsterisks">
                                    State
                                    </Form.Label>
                                    <Col sm={5}>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter State" 
                                        name="state"  
                                        value={values.state}
                                        onChange={handleChange}
                                        isInvalid={!!errors.state}
                                        />
                                    <Form.Control.Feedback  type="invalid">{errors.state}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3 justify-content-center">
                                    <Form.Label column sm={2}>
                                        Inventory
                                    </Form.Label>
                                    <Col sm={5}>
                                        <Select 
                                            options={products.map((product) => {
                                                        return {
                                                            value: product._id,
                                                            label: product.name
                                                        }
                                                    })}
                                            isMulti
                                            // value={values.inventory}
                                            name="inventory"
                                            onChange={(option) => {
                                                setFieldValue("inventory", option.map((o) => {
                                                    return o.value;
                                                }))
                                            }}
                                        />
                                    </Col>                                    
                                </Form.Group>
                
                                <Row className='mt-5'>
                                    <Col>
                                        <Button type="submit">Submit</Button>
                                    </Col>
                                </Row>
                        </Form>   
                    </Container>
                )}
            </Formik>            
        </>        
    )
}

export default WarehouseForm;