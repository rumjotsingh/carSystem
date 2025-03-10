import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Card, CardMedia, CardContent, Typography, CardActionArea, CircularProgress, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function Homepage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAllCars = async () => {
    try {
      const response = await axios.get("https://carsystem-backend.onrender.com/api/v1/cars/all-cars");
      setCars(response.data.cars);
    } catch (error) {
      console.error("Error fetching car data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCarClick = (id) => {
    navigate(`/cars/${id}`);
  };

  useEffect(() => {
    getAllCars();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
        <Container>
          <Grid container spacing={4}>
            {cars.map((car) => (
              <Grid item xs={12} sm={6} md={4} key={car._id}>
                <Card
                  onClick={() => handleCarClick(car._id)}
                  sx={{
                    cursor: "pointer",
                    boxShadow: 3,
                    borderRadius: 4,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardActionArea>
                       <CardMedia
  component="img"
  height="200"
  image={car.image?.url} // ✅ Use Cloudinary URL directly
  alt={`${car.company} car`}
  sx={{ objectFit: "cover" }}
/>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        {car.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {car.description}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Engine:</strong> {car.engine}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Mileage:</strong>{" "}
                        {car.engine === "Electric"
                          ? `${car.mileage} km per charge`
                          : `${car.mileage} kmpl`}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Color:</strong> {car.color}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        <strong>Price:</strong> ₹{car.price.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer (Stays at Bottom) */}
      <Box component="footer" sx={{ mt: "auto" }}>
        <Footer />
      </Box>
    </Box>
  );
}

export default Homepage;
