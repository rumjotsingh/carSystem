import { useState, useEffect } from "react";
import { useParams, useNavigate, } from "react-router-dom";
import { Box, Card, CardMedia, CardContent, Typography,Modal, Button, Grid, CircularProgress, Container, Divider, Rating } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import ReviewsForm from "./Review";

function CarsDetailed() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch car details
  const fetchDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/cars/all-cars/${id}`);
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id, refreshTrigger]); // Refresh when `refreshTrigger` changes

  // Handle car deletion
  useEffect(() => {
    if (isDeleted) {
      const deleteCarListing = async () => {
        try {
          await axios.delete(`http://localhost:8080/api/v1/cars/car-listing/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          toast.success("Car listing deleted successfully!", {
            autoClose: 3000,
          });
          setTimeout(() => {
            navigate("/");
          }, 4000);
        } catch (err) {
          toast.error(
            err.response?.status === 403
              ? "You are not the owner of this listing!"
              : "Failed to delete car listing. Please try again."
          );
        } finally {
          setIsDeleted(false);
        }
      };

      deleteCarListing();
    }
  }, [isDeleted, token, id, navigate]);

  const triggerDelete = () => {
    setIsDeleted(true);
  };
  
  // const rtoCharge = (details.price)* 0.1; // 10% RTO
  // const insuranceCharge =details.price* 0.01; // 1% Insurance
  // const totalOnRoadPrice = details.price + rtoCharge + insuranceCharge;

  const handleCarEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  const handleCarLoan = (id) => {
    navigate(`/car-loan/${id}`,{ state: { carPrice: details.price } });
    
  }

  // Handle review deletion
  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to delete a review.");
        return;
      }

      const response = await fetch(`http://localhost:8080/api/v1/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          carId: id,
        }),
      });

      if (response.status === 200) {
        toast.success("Review deleted successfully!", {
          autoClose: 3000,
        });
        setRefreshTrigger(!refreshTrigger); // Trigger refresh
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to delete the review.");
      }
    } catch (error) {
      console.error("Error deleting review:", error.message);
      toast.error("An error occurred while deleting the review.");
    }
  };

  if (!details) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <br />
        <br />
        <br />
        <Card
          sx={{
            boxShadow: 3,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <br />
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
            {details.company}
          </Typography>
          <CardMedia
            component="img"
            height="300"
            image={`http://localhost:8080/${details.image.url.replace(/\\/g, "/")}`}
            alt={`${details.company} car`}
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ padding: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Description:</strong> {details.description}
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Engine:</strong> {details.engine}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Mileage:</strong>{" "}
                  {details.engine === "Electric"
                    ? `${details.mileage} km per charge`
                    : `${details.mileage} kmpl`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Color:</strong> {details.color}
                </Typography>
              </Grid> 
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Price:</strong> {new Intl.NumberFormat("en-IN").format(details.price)}
                </Typography>
              </Grid>
            </Grid>

            <br />
            <Box display="flex" justifyContent="space-around" gap={4} sx={{ mt: 3 }}>
              {token ? (
                <>
                  <Button variant="contained" color="error" size="large" onClick={triggerDelete}>
                    Delete
                  </Button>
                  <Button variant="outlined" color="primary" size="large" onClick={() => handleCarEdit(details._id)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="primary" size="large" onClick={() => handleCarLoan(details._id)}>
                    Car Loan Calculator
                  </Button>
                  <Button variant="contained" size="large" color="primary" onClick={() => setOpenModal(true)} >
                   Calculate On-Road Price
                  </Button>
                  <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            On-Road Price Calculation
          </Typography>
          <Typography variant="body1">Car Price: ₹{details.price}</Typography>
          <Typography variant="body1">RTO (10%): ₹{details.price*0.1}</Typography>
          <Typography variant="body1">Insurance (1%): ₹{details.price*0.01}</Typography>
          <Typography variant="h6" style={{ marginTop: "10px", fontWeight: "bold" }}>
            Total On-Road Price: ₹{details.price+details.price*0.1+details.price*0.01}
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenModal(false)}
            style={{ marginTop: "15px" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
                  

                </>
              ) : (
                <Typography
                  variant="h6"
                  color="textSecondary"
                  align="center"
                  sx={{
                    marginTop: 2,
                    padding: 1,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                    boxShadow: 1,
                  }}
                >
                  Please log in to perform actions.
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <br />
          <ReviewsForm refresh={() => setRefreshTrigger(!refreshTrigger)} />
          <br />
          <Box sx={{ mt: 6, textAlign: "center" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
              Reviews
            </Typography>
            {details.reviews.length === 0 ? (
              <Typography variant="body1" color="text.secondary">
                No reviews available yet.
              </Typography>
            ) : (
              details.reviews.map((review) => (
                <Card key={review._id} sx={{ mb: 3, maxWidth: 600, mx: "auto", p: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {review.author?.name || "Anonymous"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {review.comment}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteReview(review._id)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
export default CarsDetailed;
