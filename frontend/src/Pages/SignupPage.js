import React from 'react';
import {Container, Col} from 'react-bootstrap';
import LoginForm from '../Components/LoginForm';


function Signup(){
    return(
        <>
            <Container>
                    <Col xs={12} md={8} lg={6} className="bg-white m-5 p-5 mx-auto border shadow-lg ">
                        <LoginForm text='Create an Account' title="Sign-up"/>
                    </Col>
            </Container>
        </>
    )
}

export default Signup;