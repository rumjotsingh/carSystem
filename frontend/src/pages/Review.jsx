import  {  useState } from "react";
import { Box, Typography, TextField, Button, Rating } from "@mui/material";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const ReviewsForm = ({refresh}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  
  const { id } = useParams();

  const handleSubmit = async () => {
    if (rating && review.trim()) {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage or wherever it is stored
        if (!token) {
          toast.error("You must me logged");
          return;
        }
  
        const response = await fetch(`http://localhost:8080/api/v1/reviews/cars/${id}/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            carListingId:id,
            rating,
            comment: review, // Assuming your API expects `description` for the review content
          }),
        });
      
        if (response.status===200) {
        
          toast.success("The review added sucessfully");
          refresh()
           
          setRating(0); // Reset the form
          setReview("");
        } else {
           toast.error("Failed to Submit ");
        }
      } catch (error) {
        console.error("Error:", error.message);
        toast.error("An error occurred while submitting the review.");
      }
    } else {
      toast.error("Please provide a rating and a review description.");
    }
  };
  


  return (
    <Box sx={{ mt: 6, textAlign: "center" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Reviews
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          Please share your experience by leaving a review below:
        </Typography>
        <Rating
          name="review-rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          size="large"
        />
      </Box>
      <TextField
        label="Your Review"
        variant="outlined"
        multiline
        rows={4}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit Review
      </Button>
    </Box>
  );
};
ReviewsForm.propTypes = {
  refresh: PropTypes.func.isRequired,
};


export default ReviewsForm;
