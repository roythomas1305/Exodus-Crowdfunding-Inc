import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../Auth/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDonate, faUser } from '@fortawesome/free-solid-svg-icons';

function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Redirect if not logged in or not an admin
  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleCampaignControl = () => {
    navigate('/campaignlist');
  };

  const handleUserControl = () => {
    navigate('/userlist');
  };

  return (
    <div>
      <h1 className='mt-5 mb-5'>Exodus Crowdfunding Inc. Admin Dashboard</h1>
      <Button variant="primary" type="button" onClick={handleCampaignControl} className='mt-5 mb-5 my-5'>
        <FontAwesomeIcon icon={faDonate} /> Go to Campaign Control Center
      </Button>
      <Button variant="info" type="button" onClick={handleUserControl} className='mt-5 mb-5 mx-5'>
        <FontAwesomeIcon icon={faUser} /> Go to User Control Center
      </Button>
      <h1 className='mt-5 mb-5'>Hello, {user.username}, you are an Admin of Exodus Crowdfunding Inc.</h1>
      <h2 className='mt-5 mb-5'>Welcome to the Admin Dashboard!</h2>
      <h3 className='mt-5 mb-5'>Here you can manage your campaigns, users, and more.</h3>
      <h3 className='mt-5 mb-5'>You have special administrational access to our data</h3>
      <h3 className='mt-5 mb-5'>Please be careful with what you do!</h3>
      <h3 className='mt-5 mb-5'>Enjoy your stay as an Admin!</h3>
    </div>
  );
}

export default AdminDashboard;


