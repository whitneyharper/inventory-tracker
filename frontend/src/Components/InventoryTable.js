import React, {useEffect, useState} from "react";
import {Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useAuthContext } from '../Hooks/useAuthContext';
const axios = require('axios').default;



function InventoryTable() {
    
    const { user } = useAuthContext();
    const [products, setProducts] = useState([]);   
    const [error, setError] = useState(null);   

    const url = "/inventories";

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        "Authorization" : `Bearer ${user.token}`
                    }
                });

                if (response){
                    setProducts(response.data.products);
                }
                 
            } catch(error) {
                console.log('Error fetching and parsing data', error);
                setError(error.response.data.message);
            }
        }

            if (user){
                fetchData();
            } else {
                setError("You must be logged in");
            }

    }, [user]);


 return(
    <>
        <Table striped bordered hover className="mt-5">
            <thead>
            <tr className="table-danger">
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th></th>
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
        {error && <div className="error">{error}</div>}
    </>
 )
}

export default InventoryTable;