import React, {useState, useEffect} from 'react';
import {Navbar, Container, Nav, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useLogout} from '../Hooks/useLogout';
import { useNavigate } from 'react-router-dom';


function NavBar() {
    
    const {logout} = useLogout();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(user){
            setUser(user.email);
        }
    },[user])
    

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
                            <Link to='/warehouse'>Warehouse</Link>                                  
                        </Nav> 
                        <Button onClick={handleClick}>Logout</Button> 
                    </Navbar.Collapse>                             
                </Container>
            </Navbar>                
        </>
    )
}

export default NavBar;