import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from '../../store/reviews';
import "./PostReviewModal.css"

const PostReviewModal = ({ serviceTitle }) => {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {}
    if(!reviewText) {
        newErrors.reviewText = 'Description is required';
        setErrors(newErrors)
    }

    if(Object.keys(newErrors).length > 0){
        setErrors(newErrors)
        return;
    }

    const reviewData = {
      reviewText,
      rating,
    };


    await dispatch(createReviewThunk(reviewData));
  };

  return (
    <div className="post-review-modal">
      <h2>Post a Review on {serviceTitle}</h2>
      <p>How did your job go?</p>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here"
      />
      {errors.reviewText && <span className="error">{errors.reviewText}</span>}
      <p>Rating:</p>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'star-filled' : 'star-empty'}
            onClick={() => setRating(star)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <button onClick={handleReviewSubmit}>Submit your review</button>
    </div>
  );
};

export default PostReviewModal;
