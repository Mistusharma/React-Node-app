import React, { useState } from 'react';
import { reset } from '../Helpers/auth';
import { useNavigate } from 'react-router-dom';

function Reset() {
    const [formData, setFormData] = useState({
        password: '',
        email: '',
        otp: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const data = await reset(formData);
            if (data.message === "success") {
                setMessage('Password is successfully reset');
                setTimeout(() => {
                    setMessage('');
                    setError('')
                    setFormData({ password: '', email: '', otp: '' }); // Reset form fields
                    navigate('/login');
                }, 1000);
            }
            else {
                setError("Invalid credentials");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={submit} style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Forgot Password</h2>
                <label style={{ marginBottom: '8px', display: 'block' }}>Email</label>
                <input
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
                />

                <label style={{ marginBottom: '8px', display: 'block' }}>New Password</label>
                <input
                    type='password' // Change type to password for password input
                    name='password'
                    placeholder='Enter your password'
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <div style={{ textAlign: 'center' }}>
                    <button type='submit' style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Reset Password</button> {/* Changed button text to 'Reset Password' */}
                </div>
                {message && <div style={{ marginTop: '10px', color: 'green', textAlign: 'center' }}>{message}</div>}
                {error && <div style={{ marginTop: '10px', color: 'red', textAlign: 'center' }}>{error}</div>}
            </form>
        </div>
    );
}

export default Reset;
