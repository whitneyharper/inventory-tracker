import React from "react";
import NavBar from "../Components/NavBar";
import Product from "../Components/Product";

function ProductPage() {
    return(
        <>
            <NavBar inventoryLink={true}/> 
            <Product />
        </>
        

    )
}

export default ProductPage;