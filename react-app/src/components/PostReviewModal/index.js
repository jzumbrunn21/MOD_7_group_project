import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk, updateReviewThunk } from "../../store/reviews";
import "./PostReviewModal.css";
import { Modal, useModal } from "../../context/Modal";
import { getReviewsThunk } from "../../store/reviews";

const PostReviewModal = ({ reviewData, serviceId }) => {

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews.reviews));
  const existingReview = reviews.find((review) => review?.service_id === serviceId);
  const [reviewText, setReviewText] = useState("");
  const [reviewImage, setReviewImage] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    if (existingReview) {
      setReviewText(existingReview.review);

      setRating(Number(existingReview.star_rating));

      if (existingReview.review_image) {
        setReviewImage(existingReview.review_image);
      }
    }
  };



  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!reviewText || reviewText.length < 25 || reviewText.length > 2000) {
      newErrors.reviewText =
        "Review is required and must be between 25 and 2000 characters";
    }

    if (rating < 1) {
      newErrors.rating = "You must rate this service";
    }

    if (!reviewImage) {
      newErrors.reviewImage = "Image is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append('service_id', serviceId);
    formData.append('review', reviewText);
    formData.append('star_rating', rating);
    console.log("Review Text:", reviewText);
    console.log("Rating:", rating);
    console.log("Review Image:", reviewImage);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Append the updated image if a new one is selected
    if (reviewImage instanceof File) {
      formData.append('review_image', reviewImage);
    }

    const action = reviews.some((review) => review.service_id === serviceId)
      ? () => updateReviewThunk(existingReview.id, formData)
      : () => createReviewThunk(formData);

    const createdReview = await dispatch(action());

    if (createdReview) {
      closeModal();
    }
  };

  return (
    <div className="post-review-modal">
      <div>
        <h2>Post a Review</h2>
        <h4>How did your job go?</h4>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here"
        />
      </div>
      {errors.reviewText && (
        <span className="review-error">{errors.reviewText}</span>
      )}
      <div className="create-review-url">
        <label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setReviewImage(e.target.files[0])}
          />
        </label>
        {errors.reviewImage && (
          <div className="review-error">{errors.reviewImage}</div>
        )}
      </div>
      <h4>Rating</h4>
      <div className="star-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "star-filled" : "star-empty"}
            onClick={() => setRating(star)}
          >
            &#9733;
          </span>
        ))}
      </div>
      {errors.rating && <span className="review-error">{errors.rating}</span>}
      <button onClick={handleReviewSubmit}>Submit your review</button>
    </div>
  );
};

export default PostReviewModal;
