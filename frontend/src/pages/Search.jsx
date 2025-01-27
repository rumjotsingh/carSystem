import  { useState } from "react";
import { Box, TextField, Button, useMediaQuery, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      toast.warning("It Cannot Empty");
      return;
    }
    navigate(`/results`, { state: { searchTerm } });
  };
return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 1 : 3,
        justifyContent:"space-evenly",
        width: isMobile ? "70%" : "100%",
        borderRadius: 1,
        padding: isMobile ? 1 : 2,
      
      }}
    >
      <TextField
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for cars..."
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            borderRadius: "5px",
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size={isMobile ? "medium" : "large"}
        startIcon={<SearchIcon />}
        sx={{
          gap:"1",
          fontSize: "0.8rem",
          textTransform: "capitalize",
          borderRadius: "5px",
        }}
      >
        Search
      </Button>
    </Box>
  </Box>
  );
};
export default Search;
