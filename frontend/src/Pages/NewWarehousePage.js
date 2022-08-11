import React from 'react';
import NewWarehouseForm from '../Components/NewWarehouseForm';
import NavBar from "../Components/NavBar";

function NewWarehousePage() {
    return(
        <>
            <NavBar warehouseLink={true}/>
            <NewWarehouseForm />
        </>
        
    )
}

export default NewWarehousePage;