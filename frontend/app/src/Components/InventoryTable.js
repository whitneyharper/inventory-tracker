import React from "react";
import {Table, Button} from 'react-bootstrap';


function InventoryTable({products}) {
    // const [data, setData] = useState(props.products.data)
    // console.log(data)
    // const products = data.products;
    
    console.log(products)

 return(
    <Table striped bordered hover className="mt-5">
        <thead>
        <tr className="table-danger">
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        </thead>
        
            {products.map((product) => {
                return (
                    <tbody>
                    <tr>
                        <td>{product.name}</td>
                        <td>${product.price.$numberDecimal}</td>
                        <td>{product.quantity}</td>
                        <td>{product.category}</td>
                        <td><Button variant="info" className="text-white">Edit</Button></td>
                        <td><Button variant="danger">Delete</Button></td>
                    </tr>
                    </tbody>
                )
            })}
            
       
    </Table>
 )
}

export default InventoryTable;