import React, {useState, useEffect} from "react";
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';
const axios = require('axios').default;

let schema = yup.object().shape({
    name: yup.string().required("Product Name is required"),
    price: yup.number().required("Price is required"),
    quantity: yup.number().required("Quantity is required"),
    category: yup.string().required("Category selection is required")
})

function Product() {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    let {id} = useParams();
   
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);   
    
    const url = "/inventories";
    
    useEffect(() => {
        const fetchData =  async() => {
            try{
                const response = await axios.get(url, {
                    headers: {
                        "Authorization" : `Bearer ${user.token}`
                    }
                });

                if (response){
                    setProducts(response.data.products);
                }
                                
            } catch(error){
                console.log('Error fetching and parsing data', error);
                setError(error.response.data.message);
            }
        }  

        if (user){
            fetchData();
        } else {
            setError("You must be logged in");
        }

    }, [setProducts, user]);

    //variable that hold the id in products state that matches the id of useParams
    const productId = products.filter((product) => {
        return product._id === id;
    });

  
    const handleDelete = async() => {    
         
        try {
            if (!user){
                setError("You must be logged in");
                return;
            } 
            
            const response = await axios.delete(`/inventories/${id}`, {
                headers: {
                    "Authorization" : `Bearer ${user.token}`
                }
            });      
            
            if(response){
                navigate('/inventory') ;
            }
        } catch(err) {
            setError(err.response.data.message);
        }           
    }


    return(
        <>
        {(productId.length > 0) ? 
        <>
            <Container className="mb-5 mt-5">
                <Row>
                    <Col>
                        <h1>{productId[0].name}</h1>
                    </Col>
                </Row>
            </Container>    

            <Formik
                initialValues={{
                    name: productId[0].name,
                    price: productId[0].price.$numberDecimal,
                    quantity: productId[0].quantity,
                    category: productId[0].category
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

                        const response = await axios.put(
                            `/inventories/${id}`, 
                            values,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization" : `Bearer ${user.token}`
                                },
                            }
                            )

                            if(response){
                                actions.setSubmitting(false);
                                navigate('/inventory') ;
                            }
                    } catch(err) {
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
                                    <Col xs={12} className="mx-auto">
                                        <Button type="submit" className="mx-4">Save</Button>
                                        <Button variant="danger" onClick={handleDelete} type="button" className="mx-4">Delete</Button>
                                    </Col>
                                    {error && <div className="error">{error}</div>}
                                </Row>
                        </Form>   
                    </Container>
                )}
            </Formik> 
            </>           
         : (null)  }  
        </>              
    )
}
export default Product;