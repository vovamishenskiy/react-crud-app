import React, { useEffect } from 'react'
import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { } from 'react-router-dom'
import { logout } from '../actions/userActions'

function Header({ setSeatch }) {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    useEffect(() => { }, [userInfo])

    return (
        <Navbar collapseOnSelect expand='lg' bg='primary' variant='dark'>
            <Container>
                <Navbar.Brand href='/'>CRUD Notes</Navbar.Brand>

                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='m-auto'>
                        {userInfo && (
                            <Form inline>
                                <FormControl type='text' placeholder='search' className='mr-sm-2' onChange={(e) => setSeatch(e.target.value)} />
                            </Form>
                        )}
                    </Nav>
                    <Nav>
                        {userInfo ? (
                            <>
                                <Nav.Link href='/mynotes'>notes</Nav.Link>
                                <NavDropdown title={`${userInfo.name}`} id='collapsible-nav-dropdown'>
                                    <NavDropdown.Item href='/profile'>profile</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item onClick={logoutHandler}>logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : <Nav.Link href='/login'>login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header