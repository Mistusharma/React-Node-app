import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Helpers/auth';
import { Link } from 'react-router-dom';
function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  console.log(formData.email);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [dataError, setDataError] = useState(null);
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
        const a = await loginUser(formData);
        console.log("a: ", a);
        if (a.message === "login successfully") {
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
        <h3>Email</h3>
        <input style={inputStyle} type='email' name='email' placeholder='Email Id' value={formData.email} onChange={handleInputChange} key='email' />
        <h6 style={{ color: "red" }}>{errors.email}</h6>
        <h3>Password</h3>
        <input style={inputStyle} type='text' name='password' placeholder='Password' value={formData.password} onChange={handleInputChange} key='password' />
        <h6 style={{ color: "red" }}>{errors.password}</h6>
        <h5 style={{ color: "red" }}>{dataError}</h5>
        <button style={buttonStyle} type='submit'>Login</button>
        {/* <Link to='/forget'>Forget Password</Link> */}
        <button style={buttonStyle} type='submit' onClick={() => navigate('/forget')}>Forget Password</button>
      </form>
    </div>
  )
}


export default Login;
