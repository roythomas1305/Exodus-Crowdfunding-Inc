import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEnvelope, faLock, faPen, faUser, faUsersCog } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const [register, setRegister] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', register);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('User already exists');
      } else {
        console.error('Error registering', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <h1><FontAwesomeIcon icon={faPen} /> Registration Page</h1>
      <div className="container mt-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label><FontAwesomeIcon icon={faUser} /> Username</Form.Label>
            <Form.Control type="text" value={register.username} name="username" onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label><FontAwesomeIcon icon={faEnvelope} /> Email</Form.Label>
            <Form.Control type="email" value={register.email} name="email" onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label><FontAwesomeIcon icon={faLock} /> Password</Form.Label>
            <Form.Control type="password" value={register.password} name="password" onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formBasicRole">
            <Form.Label><FontAwesomeIcon icon={faUsersCog} /> Role</Form.Label>
            <Form.Control as="select" value={register.role} name="role" onChange={handleChange} required>
              <option value="">Select...</option>
              <option value="campaigner">Campaigner</option>
              <option value="backer">Backer</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className='mt-5 mb-5'><FontAwesomeIcon icon={faCheck} /> Register</Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;


