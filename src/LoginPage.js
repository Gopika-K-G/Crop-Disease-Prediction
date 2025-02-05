import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import './Login.css'; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('User:', user);
      navigate('/home'); // Redirect to home page
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-heading">Welcome to Plant Tissue Culture</h1>
        <p className="login-description">Sign in with Google to get to know about your plant tissue culture.</p>
        <button className="login-button" onClick={handleGoogleLogin}>
          Login with Google
        </button>
        {/*<img
          src="http://ts1.mm.bing.net/th?id=OIP.mH41xEUUSE6rInMby6uhjgHaE8&pid=15.1" // Replace with your image URL
          alt="Crop"
          className="login-image"
        />*/}
      </div>
    </div>
  );
};

export default Login;