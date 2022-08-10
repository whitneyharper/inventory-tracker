import React from 'react';
import {Container, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignupForm from '../Components/SignupForm';


function Signup(){
    return(
        <>
            <Container>
                    <Col xs={12} md={8} lg={6} className="bg-white m-5 p-5 mx-auto border shadow-lg ">
                        <SignupForm/>
                        <Button variant="link"><Link to='/'>Home</Link></Button>
                    </Col>
            </Container>
        </>
    )
}

export default Signup;