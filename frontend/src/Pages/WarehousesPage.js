import React from 'react';
import {ButtonGroup, Button, Container, Row, Col} from 'react-bootstrap';
import WarehouseNavBar from '../Components/WarehouseNavBar';
import WarehouseTable from '../Components/WarehouseTable';
import { useNavigate } from 'react-router-dom';

function WarehousesPage(){

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/warehouse/create')
    }

    return(
        <>
            <WarehouseNavBar />
            <Container>
                <Row>
                    <Col>
                        <ButtonGroup className="mt-5">
                            <Button variant="success" className="me-4" type="button" to='/warehouse/create' onClick={handleClick}>Create New Warehouse</Button>           
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>
            <WarehouseTable />
        </>
    )
}

export default WarehousesPage;