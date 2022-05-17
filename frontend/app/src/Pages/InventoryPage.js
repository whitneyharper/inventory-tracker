import React from 'react';
import NavBar from '../Components/NavBar';
import Buttons from '../Components/Buttons';
import InventoryTable from '../Components/InventoryTable';


function InventoryPage() {
    return(
        <>
            <NavBar />
            <Buttons />
            <InventoryTable />
        </>
    )
}

export default InventoryPage;