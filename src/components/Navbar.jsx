import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  function handleLogin() {
    navigate("/Form");
  }

  function handleHome() {
    navigate("/");
  }
  function handleLibrary() {
    if (user) {
      navigate("/library"); // user logged in
    } else {
      navigate("/Form"); // redirect to login
    }
  }

  return (
    <AppBar position="static" sx={{ bgcolor: "#1f1f1f" }}>
      {/* <Container> */}
        <Toolbar disableGutters sx={{ px: 3 }}>
          <Typography
            variant="h6"
            onClick={handleHome}
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            NEXUSGames
          </Typography>

          <Button color="inherit">Store</Button>
          <Button color="inherit" onClick={handleLibrary}>
            Library
          </Button>

          {user ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                fontWeight: "bold",
              }}
            >
              Hi, {user.email}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}
