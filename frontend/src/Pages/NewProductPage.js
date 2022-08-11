import React from "react";
import ProductForm from '../Components/NewProductForm';
import NavBar from "../Components/NavBar";

function NewProductPage() {
    return(
        <>
            <NavBar inventoryLink={true}/> 
            <ProductForm />
        </>
    )
}

export default NewProductPage;