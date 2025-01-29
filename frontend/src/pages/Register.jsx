import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
    const Client = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleRegister = async () => {
    try {
      const res = await axios.post("https://carsystem-backend.onrender.com/api/v1/auth/register", form);
      if (res.data.success) {
        toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 4000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration Not Successful", { position: "top-center" });
    }
  };
const handleGoogleLogin = async (credentialResponse) => {
    const jwt = credentialResponse.credential;
    const payload = JSON.parse(atob(jwt.split(".")[1])); // Decode JWT
    try {
      const res = await axios.post("https://carsystem-backend.onrender.com/api/v1/auth/google-login", {
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
      });
      if (res.data.token) {
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 3000,
        });
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          navigate("/");
        }, 4000);
      }
    } catch (err) {
      console.error("Google Login Error:", err);
    }
  };
return (
    <>
      <Navbar />
      <Box
        sx={{
          marginTop: 10,
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
    
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              p: 3,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Register
            </Typography>

            <TextField
              fullWidth
              label="Name"
              type="text"
              variant="outlined"
              margin="normal"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ marginTop: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Divider sx={{ marginY: 2 }}>OR</Divider>
         
          </Box>
        
      </Box>
      <Footer />
    </>
  );
}
export default Register;
