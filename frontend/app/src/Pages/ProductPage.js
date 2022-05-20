import React, {useState, useEffect} from "react";
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import { Formik } from 'formik';
import { useParams, useHistory } from 'react-router-dom';
const axios = require('axios').default;



function Product() {
    const history = useHistory();
    let {id} = useParams();
    const [products, setProducts] = useState([]);  
    
    console.log(products)
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

    const productId = products.filter((product) => {
        return product._id === id;
    })
    
    // const handleDelete = async(productId) => {   
    //     console.log(productId[0]._id);   
    //     if (productId[0]._id === id) {
    //         await axios.delete(`http://localhost:5000/inventory/:${id}`);
    //         history.push('/') ;    
    //     }  else {
    //         console.log("not working");
    //     }     
    // }


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
                // validationSchema={schema}
                onSubmit={async(values, actions) => {
                    actions.setSubmitting(true);

                    //POST
                    try {
                        await axios.put(
                            `http://localhost:5000/inventory/:${id}`, 
                            values,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                            )
                    } catch(err) {
                        } finally {
                            // actions.resetForm();
                            actions.setSubmitting(false);
                            history.push('/') ;
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
                            {console.log(values)}
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
                                    </Col>
                                    {/* <Col>
                                        <Button variant="danger" onClick={() => handleDelete(productId)} type="submit" >Delete</Button>
                                    </Col> */}
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