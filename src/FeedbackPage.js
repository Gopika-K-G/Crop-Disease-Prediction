// src/components/Feedback.js
import React, { useState } from 'react';
import './Feedback.css';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    // Here you can add actual feedback submission logic
  };

  return (
    <div className="feedback-container">
      {submitted ? (
        <div className="thank-you-message">
          <h2>Thank You!</h2>
          <p>Your feedback has been submitted.</p>
        </div>
      ) : (
        <>
          <h2>We Value Your Feedback</h2>
          <div className="rating">
            <h3>Rate Us:</h3>
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star} 
                className={`star ${star <= rating ? 'filled' : ''}`} 
                onClick={() => setRating(star)}
              >
                &#9733;
              </span>
            ))}
          </div>
          <textarea
            className="review-textarea"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button className="submit-btn" onClick={handleSubmit}>
            Submit Feedback
          </button>
        </>
      )}
    </div>
  );
}

export default Feedback;
