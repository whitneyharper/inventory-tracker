import React from "react";
import ProductForm from '../Components/NewProductForm';
import WarehouseNavBar from '../Components/WarehouseNavBar';

function NewProductPage() {
    return(
        <>
            <WarehouseNavBar />
            <ProductForm />
        </>
    )
}

export default NewProductPage;