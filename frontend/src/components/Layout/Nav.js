import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import { UserContext } from '../Auth/UserContext'; // import UserContext
import { Link } from 'react-router-dom'; // import Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faContactCard, faCrown, faDonate, faEdit, faHome, faInfoCircle, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';

function CollapsibleExample() {
  const { user, setUser } = useContext(UserContext); // use UserContext

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout');
      setUser(null);
      localStorage.removeItem('user'); // clear user data from localStorage
    } catch (error) {
      console.error('Error logging out', error);
    }
  };


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/67380/anchor-and-ship-wheel-clipart-xl.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Exodus Crowdfunding Inc.
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/"><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
            <Nav.Link as={Link} to="/campaignlist"><FontAwesomeIcon icon={faDonate} /> Campaigns</Nav.Link>
            <Nav.Link as={Link} to="/about"><FontAwesomeIcon icon={faInfoCircle} /> About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact"><FontAwesomeIcon icon={faContactCard} /> Contact Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav>
              {user ? (
                <>
                  {user.role === 'admin' && <Nav.Link as={Link} to="/admindashboard"><FontAwesomeIcon icon={faCrown} /> Admin Dashboard</Nav.Link>}
                  <Nav.Link onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} /> Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faSignIn} /> Login</Nav.Link>
                  <Nav.Link as={Link} to="/register"><FontAwesomeIcon icon={faEdit} /> Register</Nav.Link>
                </>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;


