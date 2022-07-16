import React, {useEffect, useState, useCallback} from "react";
import {Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
const axios = require('axios').default;



function InventoryTable() {
    
    const [products, setProducts] = useState([]);      

    const url = "/inventories";

    const fetchData = useCallback(async () => {
        const response = await axios.get(url);
        setProducts(response.data.products);             
    }, [])
    
    useEffect(() => {
            try{
                fetchData();
            } catch(error) {
                console.log('Error fetching and parsing data', error);
            }
    }, [fetchData]);

 return(
    <Table striped bordered hover className="mt-5">
        <thead>
        <tr className="table-danger">
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            
        </tr>
        </thead>
        
            {products.map((product) => {
                return (
                    <tbody>
                    <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>${product.price.$numberDecimal}</td>
                        <td>{product.quantity}</td>
                        <td>{product.category}</td>
                        <td><Link to={'/inventory/' + product._id}>View</Link></td>
                    </tr>
                    </tbody>
                )
            })}
            
       
    </Table>
 )
}

export default InventoryTable;