import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../store/actions/userActions';

const Header = () => {

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">E-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/cart"><i className="fas fa-shopping-cart" /> Cart</Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  {/* <LinkContainer to="/profile"></LinkContainer> */}
                  <Nav.Link as={Link} to="/profile" className='text-dark'>Profile</Nav.Link>
                  <Nav.Link onClick={logoutHandler} className='text-dark'>Logout</Nav.Link>
                </NavDropdown> 
              ) : (
                <Nav.Link as={Link} to="/login"><i className="fas fa-user" /> Sign In</Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id="adminmenu">
                  <Nav.Link as={Link} to="/admin/userlist" className='text-dark'>Users</Nav.Link>
                  <Nav.Link as={Link} to="/admin/productlist" className='text-dark'>Products</Nav.Link>
                  <Nav.Link as={Link} to="/admin/orderlist" className='text-dark'>Orders</Nav.Link>
                </NavDropdown> 
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;
