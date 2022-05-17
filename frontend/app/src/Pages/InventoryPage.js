import React, {useEffect, useState} from 'react';
import NavBar from '../Components/NavBar';
import Buttons from '../Components/Buttons';
import InventoryTable from '../Components/InventoryTable';
const axios = require('axios').default;

function InventoryPage() {

    const [products, setProducts] = useState([]);
    console.log(products);   

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
    }, []);

    return(
        <>
            <NavBar />
            <Buttons />
            <InventoryTable products={products}/>
        </>
    )
}

export default InventoryPage;