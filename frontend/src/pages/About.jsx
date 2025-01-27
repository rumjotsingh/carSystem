import { Container, Grid, Box, Typography, Button, Paper } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <Box>
      <Navbar />
      <Container>
        <Box
          sx={{
            textAlign: "center",
            paddingY: 6,
            backgroundColor: "#f4f4f4",
            borderRadius: 2,
            boxShadow: 2,
            marginTop: 4,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to DreamCar
          </Typography>
          <Typography variant="h5" component="p" paragraph>
            Simplifying Cars, Amplifying Trust.
          </Typography>
          <Button variant="contained" color="primary">
            Discover More
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: 6 }}>
          <Paper sx={{ padding: 4, textAlign: "center", flex: 1 }}>
            <Typography variant="h4">100%</Typography>
            <Typography variant="h6">Customer Satisfaction</Typography>
          </Paper>
          <Paper sx={{ padding: 4, textAlign: "center", flex: 1 }}>
            <Typography variant="h4">24/7</Typography>
            <Typography variant="h6">Support Services</Typography>
          </Paper>
          <Paper sx={{ padding: 4, textAlign: "center", flex: 1 }}>
            <Typography variant="h4">1M+</Typography>
            <Typography variant="h6">Cars Delivered</Typography>
          </Paper>
        </Box>
        <Grid container spacing={4} sx={{ marginTop: 6 ,marginBottom:6}}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h5">Our Mission</Typography>
              <Typography>
                Enable customers to make informed and confident decisions regarding car buying, selling, and ownership.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h5">Our Vision</Typography>
              <Typography>
                Aspire to become the most trusted automotive platform by integrating car reviews, comparisons, financing, insurance, and after-sales services.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center", marginTop: 6, marginBottom:6}}>
          <Typography variant="h4">Meet the Panthers</Typography>
          <Grid container spacing={4} sx={{ marginTop: 4 }}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 2, textAlign: "center" }}>
                <img
                  src="https://media.istockphoto.com/id/1413766112/photo/successful-mature-businessman-looking-at-camera-with-confidence.jpg?s=612x612&w=0&k=20&c=NJSugBzNuZqb7DJ8ZgLfYKb3qPr2EJMvKZ21Sj5Sfq4="
                  alt="CEO"
                  style={{ width: "100%", height: "auto", borderRadius: "50%" }}
                />
                <Typography variant="h6" gutterBottom>
                  Alex Panther
                </Typography>
                <Typography variant="body1">CEO & Founder</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 2, textAlign: "center" }}>
                <img
                  src="https://media.istockphoto.com/id/891418990/photo/confident-businessman-posing-in-the-office.jpg?s=612x612&w=0&k=20&c=a3PcRJAN9QTIfOUJj566B_I4xx2LANZFnX90_-Oe7CI="
                  alt="CTO"
                  style={{ width: "100%", height: "auto", borderRadius: "50%" }}
                />
                <Typography variant="h6" gutterBottom>
                  Jane Swift
                </Typography>
                <Typography variant="body1">Chief Technology Officer</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 2, textAlign: "center" }}>
                <img
                  src="https://media.istockphoto.com/id/1210318875/photo/portrait-of-mature-businessman-at-modern-office.jpg?s=612x612&w=0&k=20&c=iT6I5-1WIzRwQ4ioaUQ9ErOm7siE9nD0pbVC6kq0M_g="
                  alt="Lead Designer"
                  style={{ width: "100%", height: "auto", borderRadius: "50%" }}
                />
                <Typography variant="h6" gutterBottom>
                  Sam Claw
                </Typography>
                <Typography variant="body1">Creative Lead</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
