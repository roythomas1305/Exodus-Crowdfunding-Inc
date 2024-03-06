import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faPlus, faIndianRupeeSign, faMoneyBillWave, faCalendarAlt, faTag, faDonate } from '@fortawesome/free-solid-svg-icons';
import DonationForm from './DonationForm';
import { UserContext } from '../Auth/UserContext';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = () => {
    axios.get('http://localhost:5000/campaignlist')
      .then((response) => {
        setCampaigns(prevCampaigns => response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/deletecampaign/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setCampaigns(campaigns.filter(campaign => campaign.id !== id));
          console.log('Campaign deleted successfully');
        } else {
          console.error('Failed to delete campaign:', response.data.error);
        }
      })
      .catch((error) => {
        console.error('Error deleting campaign:', error);
      });
  };

  const handleDonateClick = (campaignId) => {
    setSelectedCampaignId(campaignId);
    setShowDonateModal(true);
  };

  const handleDonateModalClose = () => {
    setShowDonateModal(false);
    setSelectedCampaignId(null);
  };

  return (
    <div>
      {!user && <h1 className='text-danger'>Please log in to make a donation!!!</h1>}
      <div className="container mt-5">
        <h1><FontAwesomeIcon icon={faDonate} /> Campaigns</h1>
        <Link to={`./campaignform`} className='btn btn-primary m-3' variant="primary" type="submit"><FontAwesomeIcon icon={faPlus} /> Create New Campaign</Link>
        <div className="row">
          {campaigns.map((campaign) => (
            <div className='col-md-4 mb-3' key={campaign.id}>
              <div className='card h-100'>
                <div className='card-body bg-secondary'>
                  <h3 className='card-title'><u>{campaign.title}</u></h3>
                  <p className='card-text'><em>{campaign.description}</em></p>
                  <p className='card-text'><FontAwesomeIcon icon={faMoneyBillWave} /> Goal Amount : <FontAwesomeIcon icon={faIndianRupeeSign} /> {campaign.goal_amount} /-</p>
                  <p className='card-text'><FontAwesomeIcon icon={faMoneyBillWave} /> Current Amount : <FontAwesomeIcon icon={faIndianRupeeSign} /> {campaign.current_amount} /-</p>
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped bg-success text-black" role="progressbar" style={{ width: `${Math.round((campaign.current_amount / campaign.goal_amount) * 100)}%` }} aria-valuenow={campaign.current_amount} aria-valuemin="0" aria-valuemax={campaign.goal_amount}><strong>{`${Math.round((campaign.current_amount / campaign.goal_amount) * 100)}%`}</strong></div>
                  </div>
                  <p className='card-text'><FontAwesomeIcon icon={faCalendarAlt} /> Deadline : {new Date(campaign.deadline).toLocaleDateString()}</p>
                  <p className='card-text'><FontAwesomeIcon icon={faTag} /> Category : {campaign.category}</p>
                  {campaign.current_amount >= campaign.goal_amount ? (
                    <>
                      <p className='card-text'><strong><em>"Campaign successfully completed"</em></strong></p>
                      <Link as={Link} to={`/campaigndetails/${campaign.id}`} className='btn btn-info m-3' variant="info" type="submit">
                        <FontAwesomeIcon icon={faEye} /> Details
                      </Link>
                    </>
                  ) : new Date() > new Date(campaign.deadline) ? (
                    <p className='card-text'><strong><em>"Campaign has ended, deadline reached before obtaining funds"</em></strong></p>
                  ) : (
                    <>
                      <Link as={Link} className='btn btn-success m-3' variant="success" onClick={() => handleDonateClick(campaign.id)}>
                        <FontAwesomeIcon icon={faIndianRupeeSign} /> Donate
                      </Link>
                      <Link as={Link} to={`/campaigndetails/${campaign.id}`} className='btn btn-info m-3' variant="info" type="submit">
                        <FontAwesomeIcon icon={faEye} /> Details
                      </Link>
                    </>
                  )}
                  {user && (user.role === 'admin' || user.id === campaign.campaigner_id) && (
                    <>
                      <Link as={Link} to={`/updatecampaign/${campaign.id}`} className='btn btn-warning m-3' variant="warning" type="submit">
                        <FontAwesomeIcon icon={faEdit} /> Update
                      </Link>
                      <button className='btn btn-danger m-3' onClick={() => handleDelete(campaign.id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
      {user && <DonationForm showModal={showDonateModal} handleClose={handleDonateModalClose} campaignId={selectedCampaignId} fetchCampaigns={fetchCampaigns} />}
    </div>
  );
};

export default CampaignList;


