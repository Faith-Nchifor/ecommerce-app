// navigation bar of the application
import { AuthContext } from '@/context/authContext';
import Link from 'next/link';
import { useContext } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const Menu = () => {
  const {user,logout} = useContext(AuthContext)
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">Shopper </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto justify-content-center">
          <Link href="/" className='me-md-2 text-decoration-none'>Home</Link>
          <Link href="/categories" className='me-md-2 text-decoration-none'>Categories</Link>
          <Link href="/products" className='me-md-2 text-decoration-none'>Products</Link>
          {!user ? <Link href="/login" className='me-md-2 text-decoration-none'>Login</Link>:
          (
            <NavDropdown title={user.firstName} id="basic-nav-dropdown">
            
           
            <NavDropdown.Item href="/cart">
              Your Cart
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="#" onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
          )}
          
        </Nav>
        <Nav>

        <Link href="/cart" className='me-md-2 text-decoration-none'>Cart</Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default Menu;
