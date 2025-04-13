import { Link } from "react-router-dom";
import { Box, Typography, Divider, Grid, IconButton, Container } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1c1c1e", 
        color: "#f5f5f5", 
        textAlign: "center",
      }}
    >
      <Container maxWidth="sm">
        <Grid container spacing={1} justifyContent="center">
       
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              AutoHood &copy; {new Date().getFullYear()}
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: "italic", mt: 1 }}>
              Turning your dream car into a reality
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                mx: "auto",
                width: "80%",
              }}
            />
          </Grid>
            <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 2, 
                mt: 2,
              }}
            >
              <Link
                to="/about"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                About
              </Link>
              <Link
                to="/contact"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Contact
              </Link>
              <Link
                to="/policy"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Privacy Policy
              </Link>
            </Box>
          </Grid>
            <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1.5,
                mt: 2,
              }}
            >
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#4267B2" }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#1DA1F2" }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#E1306C" }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#0077b5" }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
