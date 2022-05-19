import React from "react";
import {ButtonGroup, Button} from 'react-bootstrap';

function WarehouseButtons() {
    return(
        <ButtonGroup className="mt-5">
            <Button variant="success" className="me-4">Create New Warehouse</Button>
            <Button variant="warning">View Warehouses</Button>            
        </ButtonGroup>
    )
}

export default WarehouseButtons;