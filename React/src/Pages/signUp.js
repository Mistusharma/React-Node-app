import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../Helpers/auth';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [dataError, setDataError] = useState(null);
    const navigate = useNavigate();
    const formStyle = {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '3px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        width: '50%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '13px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        const newErrors = { ...errors };
        if (formData.name.trim() === '') {
            newErrors.name = 'Please enter your  name.';
            valid = false;
        }

        if (formData.email.trim() === '') {
            newErrors.email = 'Please enter your email address.';
            valid = false;
        }

        if (formData.password.trim() === '') {
            newErrors.password = 'Please enter your password.';
            valid = false;
        }

        setErrors(newErrors);
        if (valid) {
            console.log("Form submitted successfully:", formData);
            try {
                const a = await createUser(formData);
               
                if (a.message === "User created successfully") {
                    localStorage.setItem('token', JSON.stringify(a.newUser));
                    navigate('/home');
                  }
                  else {
                    setDataError("user not exist")
                  }

            } catch (error) {
                console.error("Error creating user:", error);
            }
        }
    };
    return (
        <div style={{ padding: 33 }}>
            {/* <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
                opacity: 0.1, // Adjust opacity if needed
                zIndex: 0
            }}>
                <img src={require('../assets/background.png')} style={{ width: '250px', height: '460px', objectFit: 'cover' }} />
            </div> */}
            <form style={formStyle} onSubmit={handleSubmit}>
                <h3>Name</h3>
                <input style={inputStyle} type='text' name='name' placeholder='name' value={formData.name} onChange={handleInputChange} key='firstName' />
                <h6 style={{ color: "red" }}>{errors.name}</h6>
                <h3>Email</h3>
                <input style={inputStyle} type='email' name='email' placeholder='Email Id' value={formData.email} onChange={handleInputChange} key='email' />
                <h6 style={{ color: "red" }}>{errors.email}</h6>
                <h3>Password</h3>
                <input style={inputStyle} type='password' name='password' placeholder='Password' value={formData.password} onChange={handleInputChange} key='password' />
                <h6 style={{ color: "red" }}>{errors.password}</h6>
                <h5 style={{ color: "red" }}>{dataError}</h5>
                <button style={buttonStyle} type='submit'>Sign Up</button>
                <button style={buttonStyle} type='button' onClick={() => navigate('/login')}>Login</button>
            </form>
        </div>
    );
}

export default SignUp;
