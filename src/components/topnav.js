import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import AuthenticationButton from "./authentication-button";
function topnav() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav>
            <Nav.Link to="/" exact href="/">
              Home
            </Nav.Link>
            <Nav.Link to="/Politics" exact href="/Politics">
              Politics
            </Nav.Link>
            <Nav.Link to="/Sports" exact href="/Sports">
              Sports
            </Nav.Link>
            <Nav.Link to="/Economy" exact href="/Economy">
              Economy
            </Nav.Link>
            <Nav.Link to="/Entertainment" exact href="/Entertainment">
              Entertainment
            </Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown title="Users" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action4">
                <NavLink
                  to="/profile"
                  exact
                  className="nav-link"
                  activeClassName="router-link-exact-active"
                >
                  Profile
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                <NavLink
                  to="/CreatePost"
                  exact
                  className="nav-link"
                  activeClassName="router-link-exact-active"
                >
                  Create Post
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                <NavLink
                  to="/SeeDraft"
                  exact
                  className="nav-link"
                  activeClassName="router-link-exact-active"
                >
                  See Draft Post
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                <NavLink
                  to="/Bookmarks"
                  exact
                  className="nav-link"
                  activeClassName="router-link-exact-active"
                >
                  See My Bookmarks
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">
                <AuthenticationButton />
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default topnav;
