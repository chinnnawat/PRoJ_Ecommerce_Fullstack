import React from 'react'
import { Navbar , Nav , Container, Image} from 'react-bootstrap';
import {FaShoppingCart, FaUser, FaStar} from 'react-icons/fa';
// import logoImage from '../../public/logo-removebg-preview.png'
import logo from '../../src/assests/logo-removebg-preview.png'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar style={{ backgroundColor: '#ffff', color : '#000'}} variant='light' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <Image src={logo} alt='Logo Phithong' fluid style={{ width: '100px', height: '100px' }}/>
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <LinkContainer to='/promotion'>
                                <Nav.Link>
                                    <FaStar/> Promotion
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <FaShoppingCart/> Cart
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/signIn'>
                                <Nav.Link>
                                    <FaUser/> LOGIN OR REGISTER
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header