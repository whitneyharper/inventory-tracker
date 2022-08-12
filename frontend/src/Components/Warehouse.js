import React, {useState, useEffect} from "react";
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import Select from 'react-select';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';
const axios = require('axios').default;

let schema = yup.object().shape({
    name: yup.string().required("Warehouse Name is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required").matches(/(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])/, "Please use state abbreviations"),
    inventory: yup.array()
})

function Warehouse() {
    
    const { user } = useAuthContext();
    const navigate = useNavigate();
    let {id} = useParams();

    const [products, setProducts] = useState([]); 
    const [warehouses, setWarehouses] = useState([]);
    const [error, setError] = useState(null); 

    const url = "/inventories";


    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get(url, {
                    headers: {
                        "Authorization" : `Bearer ${user.token}`
                    }
                })

                if(response){
                    setProducts(response.data.products);
                }
                 
            } catch(error) {
                console.log('Error fetching and parsing data', error);
                setError(error.response.data.message);
            }
        }
            
            if(user){
                fetchData();
            } 
    }, [user]);

   
    useEffect(() => {
        const fetchData =  async() => {
            try{
                const response = await axios.get("/warehouses", {
                    headers: {
                        "Authorization" : `Bearer ${user.token}`
                    }
                });

                if(response){
                    setWarehouses(response.data.warehouses); 
                }
                              
            } catch(error){
                console.log('Error fetching and parsing data', error);
                setError(error.response.data.message);
            }
        }       

        if(user){
            fetchData();
        } 
        
    }, [user]);

    //variable that hold the id in products state that matches the id of useParams
    const warehouseId = warehouses.filter((warehouse) => {
        return warehouse._id === id;
    });

    const inventoryId = warehouseId.length !== 0 ? warehouseId[0].inventory.map((i) => {
        return {
            value: i._id,
            label: i.name            
        }
    }) : null;


    let productIds = [];

    (async () => {
        if (inventoryId.length !== 0) {
            inventoryId.filter(i => {
                if (i.value.length !== 0) {
                    productIds.push(i.value);
                }
                return i.value
            }
        )}
    })()

   

 
    
    

    const handleDelete = async() => {     
        try {
            if (!user){
                setError("You must be logged in");
                return;
            } 
            
            const response = await axios.delete(`/warehouses/${id}`, {
                headers: {
                    "Authorization" : `Bearer ${user.token}`
                }
            });   
            
            if(response){
                navigate('/warehouse') ; 
            }
        } catch(err) {
            console.log('not working', err);
            setError(err.response.data.message);
        }            
    }

    return(
        <>
            {(warehouseId.length > 0) ? 
        <>
            <Container className="mb-5 mt-5">
                <Row>
                    <Col>
                        <h1>{warehouseId[0].name}</h1>
                    </Col>
                </Row>
            </Container>    
            <Formik
                enableReinitialize={true}
                initialValues={{
                    name: warehouseId[0].name,
                    city: warehouseId[0].city,
                    state: warehouseId[0].state,
                    inventory: [...productIds] ? [...productIds] : []
                }}
                
                validationSchema={schema}
                onSubmit={async(values, actions) => {
                    
                    //POST
                    try {

                        if (!user) {
                            setError("You must be logged in");
                            return;
                        }
                        
                        actions.setSubmitting(true);

                        const response = await axios.put(
                            `/warehouses/${id}`, 
                            values,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization" : `Bearer ${user.token}`
                                },
                            }
                            )

                            if (response){
                                actions.setSubmitting(false);
                                navigate('/warehouse');
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
                    errors,
                    setFieldValue
                }) => (
                    <Container>
                            <Form noValidate onSubmit={handleSubmit}>
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
                                            defaultValue={warehouseId[0].inventory.map((i) => {
                                                return {                                                 
                                                    label: i.name
                                                }
                                            })}                                            
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
                                    <Col xs={6}>
                                        <Button type="submit">Submit</Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button variant="danger" onClick={handleDelete} type="button" >Delete</Button>
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

export default Warehouse;