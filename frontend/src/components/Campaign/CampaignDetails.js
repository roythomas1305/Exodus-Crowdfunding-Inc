import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom';
import Donations from '../Campaign/Donations';
import { UserContext } from '../Auth/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong, faCalendarAlt, faMoneyBillWave, faTag, faIndianRupeeSign, faDonate } from '@fortawesome/free-solid-svg-icons';

const CampaignDetails = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchCampaignDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/campaignlist/${id}`);
                if (!response.ok) {
                    throw new Error('Error fetching campaign details');
                }
                const data = await response.json();
                // Check if the user is the campaigner or an admin
                if (user && (user.role === 'admin' || user.id === data.campaigner_id)) {
                    setCampaign(data);
                } else {
                    throw new Error('Unauthorized');
                }
            } catch (error) {
                console.error('Error fetching campaign details:', error);
            }
        };

        fetchCampaignDetails();
    }, [id, user]); // Add user to the dependency array

    if (!campaign) {
        return <div><h1 className='text-danger'>You are Unauthorized!!!!</h1></div>;
    }

    return (
        <div className="container mt-5">
            <h1><FontAwesomeIcon icon={faDonate} /> Campaign Details</h1>
            <div className="row">
                <div className="col-md-6">
                    <h2><u>{campaign.title}</u></h2>
                    <p><em>{campaign.description}</em></p>
                    <p><FontAwesomeIcon icon={faMoneyBillWave} /> Goal Amount : <FontAwesomeIcon icon={faIndianRupeeSign} /> {campaign.goal_amount} /-</p>
                    <p><FontAwesomeIcon icon={faMoneyBillWave} /> Current Amount : <FontAwesomeIcon icon={faIndianRupeeSign} /> {campaign.current_amount} /-</p>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-success text-black" role="progressbar" style={{ width: `${Math.round((campaign.current_amount / campaign.goal_amount) * 100)}%` }} aria-valuenow={campaign.current_amount} aria-valuemin="0" aria-valuemax={campaign.goal_amount}><strong>{`${Math.round((campaign.current_amount / campaign.goal_amount) * 100)}%`}</strong></div>
                    </div>
                    <p><FontAwesomeIcon icon={faCalendarAlt} /> Deadline : {new Date(campaign.deadline).toLocaleDateString()}</p>
                    <p><FontAwesomeIcon icon={faTag} /> Category : {campaign.category}</p>
                    {/* ... rest of your code ... */}
                    {campaign.current_amount >= campaign.goal_amount && (
                        <p className='card-text'><strong><em>"Campaign successfully completed"</em></strong></p>
                    )}
                    <Link as={Link} to='/campaignlist' className='btn btn-primary' ><FontAwesomeIcon icon={faRightLong} /> View More Campaigns</Link>
                </div>
            </div>
            <Donations campaignId={id} backerName={user.name} campaignName={campaign.title} />
        </div>
    );
};

export default CampaignDetails;

