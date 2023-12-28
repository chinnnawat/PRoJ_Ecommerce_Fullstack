import React from 'react'
import { Badge, Navbar , Nav , Container, Image, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart, FaUser, FaStar} from 'react-icons/fa';
// import logoImage from '../../public/logo-removebg-preview.png'
import logo from '../../src/assests/logo-removebg-preview.png'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    // ฟังก์ชันที่ถูกส่งเข้าไปใน useSelector มีการเลือก state.cart ซึ่งหมายถึง state ที่ชื่อ "cart" ใน Redux store.
    // useSelector ใช้เพื่อเลือกข้อมูลที่อยู่ใน Redux
    const {cartItems} = useSelector((state) => state.cart);

    const { userInfo } = useSelector((state) => state.auth);

    const[logoutApiCall] = useLogoutMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async() =>{
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

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
                                    {
                                        cartItems.length > 0 && (
                                            <Badge pill bg='success' style={{marginLeft:'5px'}}>
                                                {cartItems.reduce((a,c) => a+c.qty, 0)}
                                            </Badge>
                                        )
                                    }
                                </Nav.Link>
                            </LinkContainer>

                            {/* userInfo */}
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        LogOut
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <FaUser/> LOGIN OR REGISTER
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header