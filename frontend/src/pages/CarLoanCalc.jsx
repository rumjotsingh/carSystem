import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, MenuItem, Card, CardContent, Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CarLoanCalculator = () => {
  const { id } = useParams(); 
  const [carPrice, setCarPrice] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [years, setYears] = useState(3);
  const [interestRate, setInterestRate] = useState(8);

  useEffect(() => {
    const fetchCarPrice = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/cars/all-cars/${id}`);
        const carData = await response.json();

        setCarPrice(carData.price);
        setLoanAmount(carData.price * 0.8);
      } catch (error) {
        console.error("Error fetching car price:", error);
      }
    };

    fetchCarPrice();
  }, [id]);

  const handleLoanChange = (e) => {
    let value = e.target.value.replace(/,/g, ""); 
    setLoanAmount(value > carPrice ? carPrice : value < 0 ? 0 : value);
  };

  const handleInterestChange = (e) => {
    let value = parseFloat(e.target.value);
    setInterestRate(value < 0 ? 0 : value);
  };

  const calculateEMI = () => {
    let monthlyRate = interestRate / 100 / 12;
    let months = years * 12;
    let emi = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(emi);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", color: "#1976d2" }}>
          Car Loan Calculator 
        </Typography>
      </Box>

      <Card sx={{ maxWidth: 600, margin: "20px auto", padding: 3, boxShadow: 3, borderRadius: "12px" }}>
        <CardContent>
          <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
          Car Price: ₹{new Intl.NumberFormat("en-IN").format(carPrice)}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: 2,
              padding: 2,
              borderRadius: "8px",
              boxShadow: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* Loan Amount Input */}
            <TextField
              label="Loan Amount (in Rupees)"
              type="text"
              value={loanAmount ? new Intl.NumberFormat("en-IN").format(loanAmount) : ""}
              onChange={handleLoanChange}
              fullWidth
            />

            {/* Loan Term Dropdown */}
            <TextField
              select
              label="Loan Term (Years)"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              fullWidth
            >
              {[...Array(10)].map((_, i) => (
                <MenuItem key={i} value={i + 1}>
                  {i + 1} Years
                </MenuItem>
              ))}
            </TextField>

            {/* Interest Rate Input */}
            <TextField
              label="Interest Rate (%)"
              type="number"
              value={interestRate}
              onChange={handleInterestChange}
              fullWidth
            />
          </Box>

          {/* EMI Result */}
          <Box
            sx={{
              textAlign: "center",
              marginTop: 3,
              padding: 2,
              backgroundColor: "#e3f2fd",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
              Estimated EMI:
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
              {calculateEMI()} per month
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Footer />
    </>
  );
};

export default CarLoanCalculator;
