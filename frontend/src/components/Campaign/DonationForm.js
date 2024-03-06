import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { UserContext } from '../Auth/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const DonationForm = ({ showModal, handleClose, campaignId, fetchCampaigns }) => {
  const [amount, setAmount] = useState('');
  const { user } = useContext(UserContext);

  const handleAmountChange = (e) => setAmount(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const donationData = {
      backer_id: user.id,
      campaign_id: campaignId,
      amount: amount
    };

    axios.post('http://localhost:5000/donations', donationData)
      .then(response => {
        if (response.status === 201) {
          console.log('Donation added successfully');
          alert('Donation added');
          handleClose();
          fetchCampaigns();
        } else {
          console.error('Failed to add donation');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><FontAwesomeIcon icon={faIndianRupeeSign} /> Donate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="DonationAmount">
            <Form.Label><FontAwesomeIcon icon={faIndianRupeeSign} /> Donation Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter the Donation Amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faCheck} /> Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DonationForm;

