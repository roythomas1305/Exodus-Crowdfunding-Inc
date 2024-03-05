import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import CollapsibleExample from './components/Layout/Nav';
import Carousels from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import CampaignList from './components/Campaign/CampaignList';
import CampaignDetails from './components/Campaign/CampaignDetails';
import About from './components/Layout/About';
import Info from './components/Layout/Info';
import Contact from './components/Layout/Contact';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CampaignForm from './components/Campaign/CampaignForm';
import Donations from './components/Campaign/Donations';
import DonationForm from './components/Campaign/DonationForm';
import UpdateCampaign from './components/Campaign/UpdateCampaign';
import { UserContext } from './components/Auth/UserContext';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import UserList from './components/AdminPanel/UserList';
import UserDetails from './components/AdminPanel/UserDetails';
import UserForm from './components/AdminPanel/UserForm';
import UpdateUser from './components/AdminPanel/UpdateUser';

function App() {
  const [user, setUser] = useState(null);

  // This useEffect runs once when the App component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Empty dependency array means this useEffect will only run once

  return (
    <div className='App'>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <CollapsibleExample />
          <Routes>
            <Route path='/' element={<Carousels />}></Route>
            <Route path='/campaignlist' element={<CampaignList />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/campaigndetails/:id' element={<CampaignDetails />} />
            <Route path="/campaignlist/campaignform" element={<CampaignForm />} />
            <Route path='/donations' element={<Donations />} />
            <Route path='/donationform/:campaignId' element={<DonationForm />} />
            <Route path="/updatecampaign/:id" element={<UpdateCampaign />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/userdetails/:id" element={<UserDetails />} />
            <Route path="/userlist/userform" element={<UserForm />} />
            <Route path="/updateuser/:id" element={<UpdateUser />} />
          </Routes>
          <Info />
          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;



