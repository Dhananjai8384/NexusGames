import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice"; // adjust path if needed
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  function handleProfileClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    dispatch(logout());
    handleClose();
    navigate("/");
  }

  return (
    <AppBar position="static" sx={{ bgcolor: "#1f1f1f" }}>
      <Toolbar sx={{ px: 3 }}>
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{ cursor: "pointer", flexGrow: 1 }}
          onClick={() => navigate("/")}
        >
          NexusGames
        </Typography>

        {/* Navigation buttons */}
        <Box>
          <Button color="inherit" onClick={() => navigate("/")}>
            Store
          </Button>

          <Button color="inherit" onClick={() => navigate("/library")}>
            Library
          </Button>

          {!isAuthenticated ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/form")}
              sx={{ ml: 2 }}
            >
              Login
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleProfileClick}
              >
                Hi {user.email}
              </Button>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
