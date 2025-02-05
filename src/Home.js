import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import CropLibrary from './CropLibrary'; // Import the CropLibrary component
import './Home.css';

function Home() {
  const images = [
    "https://images.pexels.com/photos/575101/pexels-photo-575101.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/265242/pexels-photo-265242.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1382102/pexels-photo-1382102.jpeg?auto=compress&cs=tinysrgb&w=600"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000); // Change the image every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [images.length]);

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">
          <h1>CropCare</h1>
        </div>
        <ul className="nav-links">
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/community">Community</Link></li>
        </ul>
      </nav>
      <Parallax
        bgImage={images[currentImageIndex]}
        bgImageAlt="Agricultural Land"
        strength={300}
      >
        <div className="parallax-content">
          <h2>Plant Tissue Culture Management</h2>
          <p>Identify and manage crop tissue culture with ease and accuracy.</p>
        </div>
      </Parallax>
      {/* Integrate CropLibrary directly here */}
      <section className="crop-library-section">
        <CropLibrary />
      </section>
      <section className="statistics">
        <h2>Key Metrics</h2>
        <div className="stat-card">
          <h3>500+</h3>
          <p>Crops Identified</p>
        </div>
        <div className="stat-card">
          <h3>200+</h3>
          <p>Disease Types</p>
        </div>
        <div className="stat-card">
          <h3>1,000+</h3>
          <p>Farmers Assisted</p>
        </div>
      </section>
      <section className="newsletter">
        <h2>Stay Informed</h2>
        <p>Subscribe to our newsletter for the latest updates and expert tips.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" className="cta-button">Subscribe</button>
        </form>
      </section>
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-card">
          <p>"CropCare has revolutionized the way I manage my crops. The predictions are accurate and insightful!"</p>
          <cite>- Farmer John</cite>
        </div>
        <div className="testimonial-card">
          <p>"The Crop Library is an excellent resource. I've gained valuable knowledge about crop diseases and prevention."</p>
          <cite>- Farmer Jane</cite>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 CropCare. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms-of-service">Terms of Service</Link>
        </div>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
