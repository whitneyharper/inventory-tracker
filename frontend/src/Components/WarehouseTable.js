import React, {useEffect, useState} from "react";
import {Table,DropdownButton} from 'react-bootstrap';
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Link } from "react-router-dom";
import { useAuthContext } from '../Hooks/useAuthContext';
const axios = require('axios').default;

function WarehouseTable() {

    const { user } = useAuthContext();

    const [warehouses, setWarehouses] = useState([]);
    const [error, setError] = useState(null); 
    
    const url = "/warehouses";

    useEffect(() => {
        const fetchData =  async() => {
            try{
                const response = await axios.get(url, {
                    headers: {
                        Authorization : `Bearer ${user.token}`
                    }
                });

                if (response){
                    setWarehouses(response.data.warehouses);
                }
                 
            } catch(error){
                setError(error.response.data.message);
                console.log('Error fetching and parsing data', error);
            }                  
        }   
        
        if (user) {
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
            {error && <div className="error">{error}</div>}
        </>
     )
}

export default WarehouseTable;