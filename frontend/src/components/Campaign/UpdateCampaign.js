import React, { useState, useEffect, useContext, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Auth/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faHeading, faParagraph, faMoneyBillWave, faCalendarAlt, faTag } from '@fortawesome/free-solid-svg-icons';

const UpdateCampaign = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        goal_amount: '',
        deadline: '',
        category: ''
    });

    const fetchCampaignDetails = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/campaignlist/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching campaign details:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchCampaignDetails();
    }, [fetchCampaignDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/updatecampaign/${id}`, formData);

            if (response.status === 200) {
                console.log('Campaign updated successfully');
                alert("Campaign updated ");
                navigate('/campaignlist');
            } else {
                console.error('Failed to update campaign');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {user && (user.role === 'admin' || user.id === formData.campaigner_id) ? (
                <>
                    <h1><FontAwesomeIcon icon={faEdit} /> Update Campaign</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="CampaignTitle">
                            <Form.Label><FontAwesomeIcon icon={faHeading} /> Campaign Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter the Campaign Title" value={formData.title} name='title' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="CampaignDescription">
                            <Form.Label><FontAwesomeIcon icon={faParagraph} /> Campaign Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter the Campaign Description" value={formData.description} name='description' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="CampaignGoalAmount">
                            <Form.Label><FontAwesomeIcon icon={faMoneyBillWave} /> Goal Amount</Form.Label>
                            <Form.Control type="number" placeholder="Enter the Goal Amount" value={formData.goal_amount} name='goal_amount' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="CampaignDeadline">
                            <Form.Label><FontAwesomeIcon icon={faCalendarAlt} /> Deadline</Form.Label>
                            <Form.Control type="date" placeholder="Enter the Deadline" value={formData.deadline} name='deadline' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="CampaignCategory">
                            <Form.Label><FontAwesomeIcon icon={faTag} /> Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter the Category" value={formData.category} name='category' onChange={handleChange} />
                        </Form.Group>
                        <Button className='btn btn-warning' variant="warning" type="submit">
                            <FontAwesomeIcon icon={faEdit} /> Update
                        </Button>
                    </Form>
                </>
            ) : (
                <h1 className='text-danger'>You are not authorized to update this campaign!!!!</h1>
            )}
        </div>
    );
};

export default UpdateCampaign;

