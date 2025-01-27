import { Container, Box, Typography, TextField, Button, Grid, Card, CardContent } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Contact() {
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
              <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  required
                  placeholder="Enter your name"
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  required
                  placeholder="Enter your email"
                  type="email"
                />
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  margin="normal"
                  required
                  placeholder="Write your message"
                  multiline
                  rows={5}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2, py: 1.5 }}
                >
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
                    123 CarDekho Street, Auto City, India
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
                    support@cardekho.com
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
