import React from 'react';
import {Container, Row, Col, Image, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';


function Login(){



    return(
        <>
            <Container>
                <Row className="g-0 m-5 shadow-lg">
                    <Col lg={6} className="d-sm-none d-md-none d-none d-lg-block">
                        <Image src='chuttersnap-JWaXthlA9Cc-unsplash.jpg' className="img-fluid"  style={{minHeight: "100%"}}></Image>
                    </Col>
                    <Col xs={12} md={12} lg={6} className="bg-white p-5">
                        <LoginForm text='Log into your Account' title="Login" />
                        <Button variant="link"><Link to='/signup'>Sign-up</Link></Button>
                         
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login;