import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const Client = import.meta.env.VITE_API_KEY; // Google OAuth Client ID
  const navigate = useNavigate();
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const handleLogin = async (data) => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email: data.email,
        password: data.password,
      });
    if (res.data.message) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login successfull", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/");
        }, 4000);
      }
    } catch (err) {
      toast.error("Login not successful", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Login Error:", err);
    }
  };
  const handleGoogleLogin = async (credentialResponse) => {
    const jwt = credentialResponse.credential;
    const payload = JSON.parse(atob(jwt.split(".")[1])); // Decode JWT
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/google-login",
        {
          googleId: payload.sub,
          email: payload.email,
          name: payload.name,
        }
      );
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
      toast.error("Google Login Failed", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Google Login Error:", err);
    }
  };
return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 10,mb:10 ,textAlign: "center" }}>
        <GoogleOAuthProvider clientId={Client}>
          <Box
            sx={{
              p: 4,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: "white",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit(handleLogin)}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                {...register("password", {
                  required: "Password is required",
                  
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
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
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
            <br></br>
            <Typography variant="body1" sx={{ mt: 3 }}>
              OR
            </Typography>
            <br></br>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google Login Failed")}
            />
          </Box>
        </GoogleOAuthProvider>
      </Container>
      <Footer />
    </>
  );
}
export default Login;
