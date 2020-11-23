import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const NavMenu = (props) => {
  const padding = {
    paddingRight: 30,
    color: 'deepskyblue'
  }

  return (
    <>
      <nav>
        <Navbar collapseOnSelect expand="sm" bg="transparent" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" >
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link to="/users" style={padding}>
                  USERS
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/blogs" style={padding}>
                    BLOGS
                </Link>
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </nav>
    </>
  )
}

export default NavMenu