import React from "react";
import NavBar from "../Components/NavBar";
import Warehouse from "../Components/Warehouse";


function WarehousePage() {
    return(
        <>
            <NavBar warehouseLink={true}/>
            <Warehouse />
        </>
    )
}

export default WarehousePage;