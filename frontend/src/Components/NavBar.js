import React, {useState, useEffect} from 'react';
import {Navbar, Container, Nav, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useLogout} from '../Hooks/useLogout';
import { useNavigate } from 'react-router-dom';


function NavBar(props) {
    
    const {logout} = useLogout();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [warehouseLink, setWarehouseLink] = useState(props.warehouseLink);
    const [inventoryLink, setInventoryLink] = useState(props.inventoryLink);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(user){
            setUser(user.email);
        }
    },[user]);

    useEffect(() => {
        setWarehouseLink(props.warehouseLink);
    }, [props.warehouseLink]);
    
    useEffect(() => {
        setInventoryLink(props.inventoryLink);
    },[props.inventoryLink]);


    const handleClick = () => {
        logout();
        navigate('/') ;
    }

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Inventory Tracking</Navbar.Brand>  
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />   
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Text>
                        Signed in as: {user}
                    </Navbar.Text>
                        <Nav className="mx-auto">
                        {warehouseLink && <Link to='/warehouse'>Warehouse</Link>}
                        {inventoryLink && <Link to='/inventory'>Inventory</Link>}                                  
                        </Nav>  
                        <Button onClick={handleClick}>Logout</Button> 
                    </Navbar.Collapse>                             
                </Container>
            </Navbar>                
        </>
    )
}

export default NavBar;