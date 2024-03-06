import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faPlus, faUser, faEnvelope, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../Auth/UserContext';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:5000/userlist')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleDelete = (id) => {
        if (user.id === id) {
            alert("You can't delete your own account!");
            return;
        }

        axios.delete(`http://localhost:5000/deleteuser/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    setUsers(users.filter(user => user.id !== id));
                    console.log('User deleted successfully');
                } else {
                    console.error('Failed to delete user:', response.data.error);
                }
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    };


    if (!user || user.role !== 'admin') {
        return <div>You must be an admin to view this page.</div>;
    }

    return (
        <div>
            <div className="container mt-5">
                <h1><FontAwesomeIcon icon={faUser} /> Users</h1>
                <Link to={`./userform`} className='btn btn-primary m-3' variant="primary" type="submit"><FontAwesomeIcon icon={faPlus} /> Create New User</Link>
                <div className="row">
                    {users.map((user) => (
                        <div className='col-md-4 mb-3' key={user.id}>
                            <div className='card h-100'>
                                <div className='card-body bg-secondary'>
                                    <h3 className='card-title'><FontAwesomeIcon icon={faUser} /> {user.username}</h3>
                                    <p className='card-text'><FontAwesomeIcon icon={faEnvelope} /> Email: {user.email}</p>
                                    <p className='card-text'><FontAwesomeIcon icon={faUsersCog} /> Role: {user.role}</p>
                                    <Link as={Link} to={`/userdetails/${user.id}`} className='btn btn-info m-3' variant="info" type="submit">
                                        <FontAwesomeIcon icon={faEye} /> Details
                                    </Link>
                                    <Link as={Link} to={`/updateuser/${user.id}`} className='btn btn-warning m-3' variant="warning" type="submit">
                                        <FontAwesomeIcon icon={faEdit} /> Update
                                    </Link>
                                    <button className='btn btn-danger m-3' onClick={() => handleDelete(user.id)}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserList;
