import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Auth/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUser, faEnvelope, faLock, faUsersCog } from '@fortawesome/free-solid-svg-icons';

function UserForm() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/createuser', formData);

            if (response.status === 201) {
                console.log('User added successfully');
                alert("User added ");
                navigate('/userlist');
            } else {
                console.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!user || user.role !== 'admin') {
        return <div>You must be an admin to view this page.</div>;
    }

    return (
        <div>
            <h1><FontAwesomeIcon icon={faUser} /> Create New User</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="Username">
                    <Form.Label><FontAwesomeIcon icon={faUser} /> Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Username" value={formData.username} name='username' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Email">
                    <Form.Label><FontAwesomeIcon icon={faEnvelope} /> Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter the Email" value={formData.email} name='email' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Password">
                    <Form.Label><FontAwesomeIcon icon={faLock} /> Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter the Password" value={formData.password} name='password' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Role">
                    <Form.Label><FontAwesomeIcon icon={faUsersCog} /> Role</Form.Label>
                    <Form.Control as="select" value={formData.role} name='role' onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="admin">Admin</option>
                        <option value="campaigner">Campaigner</option>
                        <option value="backer">Backer</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    <FontAwesomeIcon icon={faCheck} /> Submit
                </Button>
            </Form>
        </div>
    );
}

export default UserForm;


