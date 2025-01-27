import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
const EditPage = () => {
  const {id}=useParams();
  const navigate=useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    
  };
  const onSubmit = async (data) => {
    if (!file) {
     toast.error("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("carListing", file);
    formData.append("engine", data.engine);
    formData.append("company", data.company);
    formData.append("description", data.description);
    formData.append("color", data.color);
    formData.append("mileage", data.mileage);
    formData.append("price", data.price);
    try {
      setLoading(true);
      const token=localStorage.getItem('token');
    await axios.put(
      `http://localhost:8080/api/v1/cars/car-listing/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        },
  );
      reset();
      toast.success(" Car Update SucessFull",{
        autoClose:3000
      });
      setTimeout(() => {
        navigate('/')
      }, 4000);
      setFile(null);
    } catch (err) {
      toast.error(err.status ?  "You are not the owner of this listing!" : "")
    } finally {
      setLoading(false);
    }}
    return (
    <>
      <Navbar/>
      <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 500,
        margin: "auto",
        padding: 3,
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop:"100px",
        marginBottom:"100px"
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Update Car Listing
      </Typography>
      <TextField
        label="Engine"
        variant="outlined"
        {...register("engine", { required: "Engine is required" })}
        error={!!errors.engine}
        helperText={errors.engine?.message}
      />
      <TextField
        label="Company"
        variant="outlined"
        {...register("company", { required: "Company is required" })}
        error={!!errors.company}
        helperText={errors.company?.message}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={3}
        {...register("description", { required: "Description is required" })}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <TextField
        label="Color"
        variant="outlined"
        {...register("color", { required: "Color is required" })}
        error={!!errors.color}
        helperText={errors.color?.message}
      />
      <TextField
        label="Mileage"
        variant="outlined"
        type="number"
        {...register("mileage", {
          required: "Mileage is required",
          valueAsNumber: true,
        })}
        error={!!errors.mileage}
        helperText={errors.mileage?.message}
      />
      <TextField
        label="Price"
        variant="outlined"
        type="number"
        {...register("price", {
          required: "Price is required",
          valueAsNumber: true,
        })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <Button
        variant="outlined"
        component="label"
        sx={{ textAlign: "left" }}
        fullWidth
      >
        Upload File
        <input
          type="file"
          hidden
          name="carListing"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
      {file && (
        <Typography variant="body2" color="textSecondary">
          Selected file: {file.name}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
    </Box>
      <Footer/>
   </>
  )
}
export default EditPage
