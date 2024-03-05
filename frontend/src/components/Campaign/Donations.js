import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMoneyBillWave, faDonate, faIndianRupeeSign, faPrayingHands } from '@fortawesome/free-solid-svg-icons';

const Donations = ({ campaignId, campaignName }) => { // Accept campaignId as a prop
    const [donations, setDonations] = useState([]);

    const fetchDonations = useCallback(() => {
        axios.get(`http://localhost:5000/donations/${campaignId}`) // Fetch donations for the specific campaign
            .then((response) => {
                const donationPromises = response.data.map(donation => {
                    // Fetch backer details for each donation
                    return axios.get(`http://localhost:5000/userlist/${donation.backer_id}`)
                        .then((backerResponse) => {
                            // Combine donation and backer data
                            return {
                                ...donation,
                                backer: backerResponse.data
                            };
                        });
                });
                return Promise.all(donationPromises);
            })
            .then(donations => {
                setDonations(donations);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [campaignId]); // Include dependencies

    useEffect(() => {
        fetchDonations();
    }, [fetchDonations]); // Include fetchDonations in the dependency array

    return (
        <div className="container mt-5">
            <h1><FontAwesomeIcon icon={faPrayingHands} /> Donations</h1>
            <div className="row">
                {donations.map((donation) => (
                    <div className='col-md-4 mb-3' key={donation.id}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Text>
                                    <FontAwesomeIcon icon={faUser} /> Backer : {donation.backer.username} <br />
                                    <FontAwesomeIcon icon={faDonate} /> Campaign : {campaignName} <br />
                                    <FontAwesomeIcon icon={faMoneyBillWave} /> Amount : <FontAwesomeIcon icon={faIndianRupeeSign} /> {donation.amount} /-
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Donations;

