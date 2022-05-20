import React, {useEffect, useState} from "react";
import {Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
const axios = require('axios').default;



function InventoryTable() {
    
    const [products, setProducts] = useState([]);      

    const url = "http://localhost:5000/inventory";

    useEffect(() => {
        const fetchData =  async() => {
            try{
                const response = await axios.get(url);
                setProducts(response.data.products);                
            } catch(error){
                console.log('Error fetching and parsing data', error);
            }
        }       
        fetchData();
    }, [setProducts]);

    // const history = useHistory();
    // const handleClick = (id) => {
    //     history.push('/inventory/' + id)
    // }
    // const handleDelete = async(productIdToRemove) => {        
    //         await axios.delete(`http://localhost:5000/inventory/${productIdToRemove}`);
    //         setProducts((prev) => prev.filter(
    //             product => product.id !== productIdToRemove))       
    // }

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
                        
                        {/* <td><Button variant="info" className="text-white">Edit</Button></td>
                        <td><Button variant="danger" onClick={() => handleDelete(product._id)} type="submit">Delete</Button></td> */}
                    </tr>
                    </tbody>
                )
            })}
            
       
    </Table>
 )
}

export default InventoryTable;