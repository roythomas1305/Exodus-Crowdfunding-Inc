import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faEnvelope, faLock, faUser, faUsersCog } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
    role: ''
  });

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', login);

      if (response.data.message === "Login successful") {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        document.cookie = response.headers['set-cookie'];

        if (response.data.user.role === 'admin') {
          navigate('/admindashboard');
        } else {
          navigate('/campaignlist');
        }
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('Error logging in');
    }
  };



  const handleRegister = () => {
    navigate('/register');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <h1><FontAwesomeIcon icon={faUser} /> Login Page</h1>
      <div className="container mt-5 mb-5">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label><FontAwesomeIcon icon={faEnvelope} /> Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={login.email}
              name="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label><FontAwesomeIcon icon={faLock} /> Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={login.password}
              name="password"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicRole">
            <Form.Label><FontAwesomeIcon icon={faUsersCog} /> Role</Form.Label>
            <Form.Control
              as="select"
              value={login.role}
              name="role"
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="admin">Admin</option>
              <option value="campaigner">Campaigner</option>
              <option value="backer">Backer</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="button" onClick={handleSubmit} className='mt-5'>
            <FontAwesomeIcon icon={faCheck} /> Submit
          </Button><br></br>
          <Button variant="info" type="button" onClick={handleRegister} className='mt-5'>
            <FontAwesomeIcon icon={faEdit} /> Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;


