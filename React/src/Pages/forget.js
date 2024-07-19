import React, { useState } from 'react';
import { forget } from '../Helpers/auth';
import { useNavigate } from 'react-router-dom';

function Forget() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [emailSent, setEmailSent] = useState(false); // State to track whether email is sent
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault(); 
        try {
            const data = await forget(email);
            if (data.status === "error") {
                setError(data.message);
            } else {
                setEmailSent(true); // Set emailSent to true if email is sent successfully
            }
        } catch (error) {
            console.error("Error: ", error);
            setError('An error occurred while sending the email.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={submit} style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Forgot Password</h2>
                <label style={{ marginBottom: '8px', display: 'block', justifyContent:"center", alignItems:'center' }}>Email</label>
                <input
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '50%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
                /> 
                <div style={{ textAlign: 'center' }}>
                    <button type='submit' style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Send Verification link to your email</button>
                </div>
                {error && <div style={{ marginTop: '10px', color: 'red', textAlign: 'center' }}>{error}</div>}
                {emailSent && <div style={{ marginTop: '10px', color: 'green', textAlign: 'center' }}>Email has been sent successfully!</div>}
            </form>
        </div>
    );
}

export default Forget;
