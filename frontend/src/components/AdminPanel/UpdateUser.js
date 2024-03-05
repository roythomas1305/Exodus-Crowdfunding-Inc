import React, { useState, useEffect, useContext, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Auth/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUser, faEnvelope, faLock, faUsersCog } from '@fortawesome/free-solid-svg-icons';

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    });

    const fetchUserDetails = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/userlist/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchUserDetails();
    }, [fetchUserDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/updateuser/${id}`, formData);

            if (response.status === 200) {
                console.log('User updated successfully');
                alert("User updated ");
                navigate('/userlist');
            } else {
                console.error('Failed to update user');
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
            <h1><FontAwesomeIcon icon={faEdit} /> Update User</h1>
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
                <Button variant="warning" type="submit">
                    <FontAwesomeIcon icon={faEdit} /> Update
                </Button>
            </Form>
        </div>
    );
}

export default UpdateUser;

