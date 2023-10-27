import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReviewThunk } from "../../store/reviews";
import "./PostReviewModal.css";
import { Modal, useModal } from "../../context/Modal";

const PostReviewModal = ({ serviceTitle, serviceId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  console.log(serviceId);
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!reviewText || reviewText.length < 25 || reviewText.length > 2000) {
      newErrors.reviewText =
        "Review is required and must be between 25 and 2000 characters";
      setErrors(newErrors);
    }

    if (rating < 1) {
      newErrors.rating = "You must rate this service";
      setErrors(newErrors);
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const review = reviewText;
    const star_rating = rating;
    const review_image =
      "https://upload.wikimedia.org/wikipedia/commons/6/64/The_Puppy.jpg";
    const service_id = serviceId;
    const reviewData = {
      service_id,
      review,
      review_image,
      star_rating,
    };

    const createdReview = await dispatch(createReviewThunk(reviewData));
    console.log(createdReview);
    // if(createdReview){
    //     closeModal()
    // }
    closeModal();
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
            className={star <= rating ? "star-filled" : "star-empty"}
            onClick={() => setRating(star)}
          >
            &#9733;
          </span>
        ))}
        {errors.rating && <span className="error">{errors.rating}</span>}
      </div>
      <button onClick={handleReviewSubmit}>Submit your review</button>
    </div>
  );
};

export default PostReviewModal;
