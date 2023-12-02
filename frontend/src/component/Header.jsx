import React from 'react'
import { Navbar , Nav , Container, Image} from 'react-bootstrap';
import {FaShoppingCart, FaUser, FaStar} from 'react-icons/fa';
// import logoImage from '../../public/logo-removebg-preview.png'
import logo from '../../src/assests/logo-removebg-preview.png'
const Header = () => {
    return (
        <header>
            <Navbar style={{ backgroundColor: '#ffff', color : '#000'}} variant='light' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Brand href='/'>
                        <Image src={logo} alt='Logo Phithong' fluid style={{ width: '100px', height: '100px' }}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <Nav.Link href='/promotion'>
                                <FaStar/> Promotion
                            </Nav.Link>
                            <Nav.Link href='/cart'>
                                <FaShoppingCart/> Cart
                            </Nav.Link>
                            <Nav.Link href='/signIn'>
                                <FaUser/> LOGIN OR REGISTER
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header