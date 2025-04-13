import { useState } from "react";
import axios from "axios";
import { Container, Box, Typography, TextField, Button, Grid, Card, CardContent } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function Contact() {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({}); // Store validation errors

  const validateForm = () => {
    let newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!feedback.trim()) {
      newErrors.feedback = "Feedback message cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post("https://carsystem-backend.onrender.com/api/v1/feedbacks/create-feedback", {
        feedback,
        email,
        name,
      });

      if (response.status === 200) {
        toast.success(response.data.message || "Feedback sent successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setFeedback("");
        setEmail("");
        setName("");
        setErrors({});
      } else {
        toast.error(response.data.message || "Failed to send feedback.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Feedback Not Sent. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We&apos;re here to help you with all your automotive needs.
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Get in Touch
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  required
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  margin="normal"
                  required
                  placeholder="Write your message"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  error={!!errors.feedback}
                  helperText={errors.feedback}
                  multiline
                  rows={5}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5 }}>
                  Send Message
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Contact Information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Address
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    123 AutoHood Street, Auto City, India
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Phone
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    +91 12345 67890
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Email
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    support@AutoHood.com
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default Contact;
