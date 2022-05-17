import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';

function NavBar() {
    
    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Inventory Tracking</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="#home">Warehouse</Nav.Link>                                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>                
        </>
    )
}

export default NavBar;