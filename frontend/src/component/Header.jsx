import React from 'react'
import { Badge, Navbar , Nav , Container, Image, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart, FaUser, FaStar, FaFacebook, FaLine, FaPhone} from 'react-icons/fa';
// import logoImage from '../../public/logo-removebg-preview.png'
import logo from '../../src/assests/logo-removebg-preview.png'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';


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
                    {/* search */}
                    <SearchBox/>
                    
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        

                        {/* NaveBar Nenu */}
                        <Nav className='ms-auto'>
                            <LinkContainer to='/promotion' disabled={!userInfo || !userInfo.isAdmin}>
                                <Nav.Link>
                                    <FaStar/> Promotion
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <FaShoppingCart/> ตะกร้าสินค้า
                                    {
                                        cartItems.length > 0 && (
                                            <Badge pill bg='success' style={{marginLeft:'5px'}}>
                                                {cartItems.reduce((a,c) => a+c.qty, 0)}
                                            </Badge>
                                        )
                                    }
                                </Nav.Link>
                            </LinkContainer>

                            {/* contrac us */}
                            <NavDropdown title='ติดต่อเรา'>
                                {/* Facebok */}
                                <NavDropdown.Item as='a' href='https://www.facebook.com/p/%E0%B9%84%E0%B8%AD%E0%B8%AA%E0%B8%84%E0%B8%A3%E0%B8%B5%E0%B8%A1%E0%B9%84%E0%B8%9C%E0%B9%88%E0%B8%97%E0%B8%AD%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%99Tel0863836984-100057478269796/?paipv=0&eav=AfZFgnaZNMBK_K1WKBkPRzbW1Q3MKds8iWQMkekhSoaR1i6E66r5RQIHZRnxjrrxuSM&_rdr'
                                    target='_blank'
                                >
                                    <FaFacebook style={{color: 'blue'}}/> Facebook
                                </NavDropdown.Item>

                                {/* Line */}
                                <NavDropdown.Item as='a' href='https://lin.ee/qanl8O0'
                                    target='_blank'
                                >
                                    <FaLine style={{color:'#008556'}}/> Line
                                </NavDropdown.Item>

                                {/* Tell */}
                                <NavDropdown.Item as='a' href='tel:0863836984'>
                                    <FaPhone /> โทร: 086-383-6984
                                </NavDropdown.Item>
                                
                            </NavDropdown>

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

                            {/* Admin */}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title = 'Manage' id='adminmenu'>

                                    {/* Go to Productlist */}
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Productlist</NavDropdown.Item>
                                    </LinkContainer>

                                    {/* Go to Userlist */}
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Userlist</NavDropdown.Item>
                                    </LinkContainer>

                                    {/* Go to OrderList */}
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>OrderList</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header