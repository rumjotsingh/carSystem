import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "../pages/Search";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For the responsive menu
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
   useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }
  }, []);
  const handleLogout = () => {
    if (localStorage.getItem("token") !== null) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      toast.success("Logout successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login", { replace: true });
    }
  };
const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
const handleMenuClose = () => {
    setAnchorEl(null);
  };
 return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        color: "black",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
          }}
        >
          {isMobile ? (
            <span role="img" aria-label="car">
              &#128663;
            </span>
          ) : (
            <>
              <span role="img" aria-label="car">
                &#128663;
              </span>{" "}
              DreamCar
            </>
          )}
        </Typography>
        <div>
        <Search/>
        </div>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button component={NavLink} to="/" color="inherit">
            Home
          </Button>
          {!isAuthenticated ? (
            <>
              <Button component={NavLink} to="/login" color="inherit">
                Login
              </Button>
              <Button component={NavLink} to="/register" color="inherit">
                Register
              </Button>
            </>
          ) : (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          )}
          <Button component={NavLink} to="/add-car" color="inherit">
            Add Your Dream Car
          </Button>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            keepMounted
          >
            <MenuItem component={NavLink} to="/" onClick={handleMenuClose}>
              Home
            </MenuItem>
            {!isAuthenticated ? (
              <>
                <MenuItem
                  component={NavLink}
                  to="/login"
                  onClick={handleMenuClose}
                >
                  Login
                </MenuItem>
                <MenuItem
                  component={NavLink}
                  to="/register"
                  onClick={handleMenuClose}
                >
                  Register
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleMenuClose();
                }}
              >
                Logout
              </MenuItem>
            )}
            <MenuItem
              component={NavLink}
              to="/add-car"
              onClick={handleMenuClose}
            >
              Add Your Dream Car
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
