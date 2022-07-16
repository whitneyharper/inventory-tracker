import React from 'react';
import { ButtonGroup, Button, Container, Col, Row } from 'react-bootstrap';
import InventoryTable from '../Components/InventoryTable';
import NavBar from '../Components/NavBar';
import { useNavigate } from 'react-router-dom';


function InventoryPage() {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/inventory/create');
    }

    return(
        <>               
            <NavBar />
            <Container>
                <Row>
                    <Col>
                        <ButtonGroup className="mt-5">
                            <Button variant="success" className="me-4" type="button"  onClick={handleClick}>Create New Product</Button>                                      
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>                 
            <InventoryTable />          
        </>
    )
}

export default InventoryPage;