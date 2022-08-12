import React, {useState} from 'react';
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';
const axios = require('axios').default;

let schema = yup.object().shape({
    name: yup.string().required("Product Name is required"),
    price: yup.number().required("Price is required"),
    quantity: yup.number().required("Quantity is required"),
    category: yup.string().required("Category selection is required")
})

function ProductForm() {

    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [error, setError] = useState(null); 

    return(
        <>
            <Container className="mb-5 mt-5">
                <Row>
                    <Col>
                        <h1>New Product</h1>
                    </Col>
                </Row>
            </Container>    

            <Formik
                initialValues={{
                    name: "",
                    price: "",
                    quantity: "",
                    category: ""
                }}
                validationSchema={schema}
                onSubmit={async(values, actions) => {
        
                    //POST
                    try {

                        if (!user){
                            setError("You must be logged in");
                            return;
                        }

                        actions.setSubmitting(true);

                        const response = await axios.post(
                            "/inventories", 
                            values,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization" : `Bearer ${user.token}`
                                },
                            }
                            )
                            if (response){
                                actions.resetForm();
                                actions.setSubmitting(false);
                                navigate('/inventory') ;
                            }
                            
                    } catch(err) {
                        console.log(err)
                        setError(err.response.data.message);
                        } 
                    } }
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors
                }) => (
                    <Container>
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group as={Row} className="mb-3 justify-content-center">
                                    <Form.Label column sm={2} className="redAsterisks">
                                    Name
                                    </Form.Label>
                                    <Col sm={5}>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Product Name"
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
                                    Price
                                    </Form.Label>
                                    <Col sm={5}>
                                    <Form.Control 
                                        type="number"
                                        placeholder="Enter Price" 
                                        name="price"  
                                        value={values.price}
                                        onChange={handleChange}
                                        isInvalid={!!errors.price}
                                     />
                                    <Form.Control.Feedback  type="invalid">{errors.price}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3 justify-content-center">
                                    <Form.Label column sm={2} className="redAsterisks">
                                    Quantity
                                    </Form.Label>
                                    <Col sm={5}>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Enter Quantity" 
                                        name="quantity"  
                                        value={values.quantity}
                                        onChange={handleChange}
                                        isInvalid={!!errors.quantity}
                                        />
                                    <Form.Control.Feedback  type="invalid">{errors.quantity}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3 justify-content-center">
                                    <Form.Label column sm={2} className="redAsterisks">
                                    Category
                                    </Form.Label>
                                    <Col sm={5}>
                                    <Form.Select                                         
                                        name="category"  
                                        value={values.category}
                                        onChange={handleChange}
                                        isInvalid={!!errors.category}
                                        >
                                        <option>Choose...</option>
                                        <option>grocery</option>
                                        <option>health</option>
                                        <option>personal care</option>
                                        <option>beauty</option>
                                        <option>office</option>
                                        <option>sports</option>
                                        <option>pets</option>
                                        <option>household</option>
                                        <option>electronics</option>
                                        <option>baby</option>
                                        <option>toys</option>
                                        <option>patio & garden</option>
                                        <option>home improvement</option>
                                        <option>auto</option>
                                        <option>crafts</option>
                                        <option>entertainment</option>
                                        <option>apparel</option>
                                        <option>furniture</option>
                                    </Form.Select>
                                    <Form.Control.Feedback  type="invalid">{errors.category}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Row className='mt-5'>
                                    <Col>
                                        <Button type="submit">Submit</Button>
                                        {error && <div className="error">{error}</div>}
                                    </Col>
                                </Row>
                        </Form>   
                    </Container>
                )}
            </Formik>            
        </>        
    )
}

export default ProductForm;