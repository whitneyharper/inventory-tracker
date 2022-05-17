import React from "react";
import {ButtonGroup, Button} from 'react-bootstrap';

function Buttons() {
    return(
        <ButtonGroup className="mt-5">
            <Button variant="success" className="me-4">Create New Product</Button>
            <Button variant="warning">View Inventory</Button>            
        </ButtonGroup>
    )
}

export default Buttons;