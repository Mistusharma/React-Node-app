import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userProfile } from '../Helpers/auth';

function Profile() {
  const [formData, setFormData] = useState(() => {
    const storedFormData = localStorage.getItem('formData');
    return storedFormData ? JSON.parse(storedFormData) : {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      country: '',
      phoneNumber: '',
    };
  });
  const navigate = useNavigate();

  const formStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    fontSize: '14px',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    transition: 'background-color 0.3s ease',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userProfile(formData);
      console.log("Response:", response);
      if (response) {
        localStorage.setItem('formData', JSON.stringify(formData));
        navigate('/home');
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Profile</h2>
        <input style={inputStyle} type='text' placeholder='Name' name='name' value={formData.name} onChange={handleInputChange} />
        <input style={inputStyle} type='email' placeholder='Email' name='email' value={formData.email} onChange={handleInputChange} />
        <input style={inputStyle} type='text' placeholder='Address' name='address' value={formData.address} onChange={handleInputChange} />
        <input style={inputStyle} type='text' placeholder='City' name='city' value={formData.city} onChange={handleInputChange} />
        <input style={inputStyle} type='text' placeholder='State' name='state' value={formData.state} onChange={handleInputChange} />
        <input style={inputStyle} type='text' placeholder='Country' name='country' value={formData.country} onChange={handleInputChange} />
        <input style={inputStyle} type='text' placeholder='Phone Number' name='phoneNumber' value={formData.phoneNumber} onChange={handleInputChange} />
        <button style={buttonStyle}>Save</button>
      </form>
    </div>
  );
}

export default Profile;
