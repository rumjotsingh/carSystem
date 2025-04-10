import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Modal,
  Button,
  Grid,
  CircularProgress,
  Container,
  Divider,
  Rating,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculateIcon from '@mui/icons-material/Calculate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import ReviewsForm from "./Review";
const buttonStyles = {
  minWidth: 150,
  flexShrink: 0,
  borderRadius: 2,
  whiteSpace: "nowrap",
  fontWeight: 500,
};


function CarsDetailed() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchDetails = async () => {
    try {
      const response = await fetch(`https://carsystem-backend.onrender.com/api/v1/cars/all-cars/${id}`);
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id, refreshTrigger]);

  useEffect(() => {
    if (isDeleted) {
      const deleteCarListing = async () => {
        try {
          await axios.delete(`https://carsystem-backend.onrender.com/api/v1/cars/car-listing/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          toast.success("Car listing deleted successfully!");
          setTimeout(() => navigate("/"), 4000);
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

  const handleDeleteReview = async (reviewId) => {
    try {
      if (!token) return toast.error("You must be logged in to delete a review.");
      const res = await fetch(`https://carsystem-backend.onrender.com/api/v1/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ carId: id }),
      });

      if (res.status === 200) {
        toast.success("Review deleted successfully!");
        setRefreshTrigger(!refreshTrigger);
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to delete the review.");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("An error occurred while deleting the review.");
    }
  };

  const handleCarEdit = () => navigate(`/edit/${id}`);
  const handleBuy = async() => {
    try {
      
      const res = await axios.post('https://carsystem-backend.onrender.com/api/v1/stripe/payment',{
        id:id
      } );
      window.location.href = res.data.url; // Stripe's hosted checkout
    } catch (err) {
      console.error('Error creating checkout session:', err);
    }
  }
  
  const handleCarLoan = () => navigate(`/car-loan/${id}`, { state: { carPrice: details.price } });

  if (!details) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 2, mb: 4 }}>
        <br />
        
        <Card sx={{ minHeight: { lg: 700, sm: 400, md: 500 },boxShadow: 3, borderRadius: 4, overflow: "hidden" }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mt={2}>
            {details.company}
          </Typography>
          <CardMedia
            component="img"
            sx={{
              height: { lg: 400, sm: 300, md: 350 },
              width: "100%",
              objectFit: "cover",
              
            }}
            image={details.image?.url}
            alt={`${details.company} car`}
            
          />
          <CardContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Description:</strong> {details.description}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Engine:</strong> {details.engine}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Mileage:</strong>{" "}
                  {details.engine === "Electric"
                    ? `${details.mileage} km per charge`
                    : `${details.mileage} kmpl`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Color:</strong> {details.color}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Price:</strong> ₹{new Intl.NumberFormat("en-IN").format(details.price)}</Typography>
              </Grid>
            </Grid>

            {/* Button Stack */}
            <Box sx={{  mt: 4 }}>
              {token ? (
                <>
                 <Box
      sx={{
        overflowX: { xs: "auto", md: "visible" },
        width: "100%",
        py: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={1.3}
        sx={{
          width: "max-content",
          minWidth: "100%",
          justifyContent: { xs: "flex-start", md: "center" },
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          sx={buttonStyles}
          onClick={handleCarEdit}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartCheckoutIcon />}
          sx={buttonStyles}
          onClick={handleBuy}
        >
          Buy
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          sx={buttonStyles}
          onClick={() => setIsDeleted(true)}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AttachMoneyIcon />}
          sx={buttonStyles}
          onClick={handleCarLoan}
        >
          Car Loan
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<CalculateIcon />}
          sx={buttonStyles}
          onClick={() => setOpenModal(true)}
        >
          On-Road Price
        </Button>
      </Stack>
    </Box>
                  
                
     

                  {/* On-Road Price Modal */}
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
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        On-Road Price Calculation
                      </Typography>
                      <Typography>Car Price: ₹{details.price.toLocaleString("en-IN")}</Typography>
                      <Typography>RTO (10%): ₹{(details.price * 0.1).toLocaleString("en-IN")}</Typography>
                      <Typography>Insurance (1%): ₹{(details.price * 0.01).toLocaleString("en-IN")}</Typography>
                      <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                        Total: ₹{(details.price * 1.11).toLocaleString("en-IN")}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 2 }}
                        onClick={() => setOpenModal(false)}
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
                    mt: 2,
                    p: 1,
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

        {/* Reviews Section */}
        <Box sx={{ mt: 6 }}>
          <ReviewsForm refresh={() => setRefreshTrigger(!refreshTrigger)} />
          <Typography variant="h5" fontWeight="bold" textAlign="center" mt={4} mb={2}>
            Reviews
          </Typography>
          {details.reviews.length === 0 ? (
            <Typography textAlign="center" color="text.secondary">
              No reviews available yet.
            </Typography>
          ) : (
            details.reviews.map((review) => (
              <Card key={review._id} sx={{ mb: 3, maxWidth: 600, mx: "auto", p: 2, borderRadius: 2 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography fontWeight="bold">{review.author?.name || "Anonymous"}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="body2" mt={1}>{review.comment}</Typography>
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
      </Container>
      <Footer />
    </>
  );
}

export default CarsDetailed;
