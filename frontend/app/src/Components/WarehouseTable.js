import React, {useEffect, useState} from "react";
import {Table, Button, DropdownButton} from 'react-bootstrap';
import DropdownItem from "react-bootstrap/esm/DropdownItem";
const axios = require('axios').default;

function WarehouseTable() {

    const [warehouses, setWarehouses] = useState([]);
    console.log(warehouses);  

    const url = "http://localhost:5000/warehouse";

    useEffect(() => {
        const fetchData =  async() => {
            try{
                const response = await axios.get(url);
                setWarehouses(response.data.warehouses);                
            } catch(error){
                console.log('Error fetching and parsing data', error);
            }
        }       
        fetchData();
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
                            <td><Button variant="info" className="text-white">Edit</Button></td>
                            <td><Button variant="danger" type="submit">Delete</Button></td>
                        </tr>
                        </tbody>
                    )
                })}
                
           
        </Table>
     )
}

export default WarehouseTable;