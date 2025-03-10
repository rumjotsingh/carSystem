import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Results = () => {
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || ""; 
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://carsystem-backend.onrender.com/api/v1/cars/search?query=${encodeURIComponent(
            searchTerm
          )}`
        );
        const data = await response.json();
        if (data.length > 0) {
          setResults(data);
        } else {
          toast.warning("No results found. Try a different search term!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [searchTerm]);

  const handleCarClick = (id) => {
    navigate(`/cars/${id}`);
  };

  return (
    <>
      <Navbar />

      {/* Main Container with full height */}
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column", 
          minHeight: "100vh" 
        }}
      >
        {/* Main Content (Expands to push the footer down) */}
        <Box sx={{ flexGrow: 1, p: 4 }}>
          <Typography variant="h4" textAlign="center" mb={4}>
            Search Results for {searchTerm}
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : results.length > 0 ? (
            <Grid container spacing={4}>
              {results.map((car, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      boxShadow: 3,
                      borderRadius: 2,
                      overflow: "hidden",
                      height: "100%",
                      cursor: "pointer"
                    }}
                    onClick={() => handleCarClick(car._id)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={car.image?.url} // ✅ Use Cloudinary URL directly
                      alt={`${car.company} car`}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" mb={1}>
                        {car.company}
                      </Typography>
                      <Typography variant="body2" mb={1}>
                        <strong>Description:</strong> {car.description}
                      </Typography>
                      <Typography variant="body2" mb={1}>
                        <strong>Engine:</strong> {car.engine}
                      </Typography>
                      <Typography variant="body2" mb={1}>
                        <strong>Mileage:</strong>{" "}
                        {car.engine === "Electric"
                          ? `${car.mileage} km per charge`
                          : `${car.mileage} kmpl`}
                      </Typography>
                      <Typography variant="body2" mb={1}>
                        <strong>Color:</strong> {car.color}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Price:</strong> ₹{car.price.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box textAlign="center" mt={4}>
              <Typography variant="h6">No results found.</Typography>
            </Box>
          )}
        </Box>

        {/* Footer (Always at the bottom) */}
        <Footer />
      </Box>
    </>
  );
};

export default Results;
