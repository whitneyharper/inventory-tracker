import React, {useEffect, useState} from "react";
import {Table,DropdownButton} from 'react-bootstrap';
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Link } from "react-router-dom";
const axios = require('axios').default;

function WarehouseTable() {

    const [warehouses, setWarehouses] = useState([]);
    
    const url = "http://localhost:5000/warehouse";

    useEffect(() => {
        const fetchData =  async() => {
                const response = await axios.get(url);
                setWarehouses(response.data.warehouses);                 
        }   
        
        try{
            fetchData();
        } catch(error){
            console.log('Error fetching and parsing data', error);
        }
    }, []);

    return(
        <Table striped bordered hover className="mt-5">
            <thead>
            <tr className="table-danger">
                <th>Warehouse Name</th>
                <th>City</th>
                <th>State</th>
                <th>Inventory</th>               
            </tr>
            </thead>
            
                {warehouses.map((warehouse) => {
                    return (
                        <tbody>
                        <tr key={warehouse._id}>
                            <td>{warehouse.name}</td>
                            <td>{warehouse.city}</td>
                            <td>{warehouse.state}</td>
                            <td><DropdownButton title="Products">
                                {warehouse.inventory.map((item) => {
                                    return (
                                        <DropdownItem>{item.name}</DropdownItem>
                                    )
                                })}                                
                            </DropdownButton></td>                           
                            <td><Link to={'/warehouse/' + warehouse._id}>View</Link></td>
                        </tr>
                        </tbody>
                    )
                })}
                
           
        </Table>
     )
}

export default WarehouseTable;