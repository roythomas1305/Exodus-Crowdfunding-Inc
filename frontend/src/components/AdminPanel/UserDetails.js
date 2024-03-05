import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../Auth/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong, faUser, faEnvelope, faUsersCog } from '@fortawesome/free-solid-svg-icons';

const UserDetails = () => {
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/userlist/${id}`);
                if (!response.ok) {
                    throw new Error('Error fetching user details');
                }
                const data = await response.json();
                // Check if the user is an admin
                if (user && user.role === 'admin') {
                    setUserDetails(data);
                } else {
                    throw new Error('Unauthorized');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [id, user]); // Add user to the dependency array

    if (!userDetails) {
        return <div>You are Unauthorized</div>;
    }

    return (
        <div className="container mt-5">
            <h1><FontAwesomeIcon icon={faUser} /> User Details</h1>
            <div className="row">
                <div className="col-md-6">
                    <h2><FontAwesomeIcon icon={faUser} /> {userDetails.username}</h2>
                    <p><FontAwesomeIcon icon={faEnvelope} /> Email: {userDetails.email}</p>
                    <p><FontAwesomeIcon icon={faUsersCog} /> Role: {userDetails.role}</p>
                    <Link as={Link} to='/userlist' className='btn btn-primary' ><FontAwesomeIcon icon={faRightLong} /> View More Users</Link>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
