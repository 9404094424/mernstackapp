import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router";


function Header() {
    return (
        <Navbar expand="lg" className="header">
            <Container>
                <Navbar.Brand >Contact_Book_Application</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="text-center header-part">
                        <Nav.Link >
                            <Link to="">Home</Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link to="/contactpage">Contact_Book_Add</Link>
                        </Nav.Link>
                         <Nav.Link >
                            <Link to="/showcontact">Show Contact Book</Link>
                        </Nav.Link>
                         <Nav.Link >
                            <Link to="/search">Search</Link>
                        </Nav.Link>
                         <Nav.Link >
                            <Link to="/pagination">Pagination</Link>
                        </Nav.Link>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Header;