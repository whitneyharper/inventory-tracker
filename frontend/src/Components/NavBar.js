import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
    
    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Inventory Tracking</Navbar.Brand>                   
                    <Nav className="mx-auto">
                        <Link to='/warehouse'>Warehouse</Link>                                        
                    </Nav>                 
                </Container>
            </Navbar>                
        </>
    )
}

export default NavBar;