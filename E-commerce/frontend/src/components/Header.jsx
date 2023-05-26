import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userAction'

const Header = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <>
            <Navbar bg="dark" expand="lg" variant='dark' collapseOnSelect>
                <Container>

                    <LinkContainer to='/'>
                        <Navbar.Brand >🛒 ONIOS</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">

                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    &nbsp; cart
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>

                                </NavDropdown>
                            )
                                : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <i className="fas fa-user"></i>
                                            &nbsp; sign in
                                        </Nav.Link>
                                    </LinkContainer>
                                )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header
