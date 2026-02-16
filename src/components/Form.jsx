import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(loginStart());

    try {
      const response = await fetch(
        `http://localhost:3001/users?email=${formData.email}`,
      );

      const data = await response.json();

      // User not found
      if (data.length === 0) {
        dispatch(loginFailure("User not found"));
        return;
      }

      const user = data[0];

      // Pass check
      if (user.password === formData.password) {
        dispatch(
          loginSuccess({
            id: user.id,
            email: user.email,
          }),
        );

        navigate("/");
      } else {
        dispatch(loginFailure("Invalid password"));
      }
    } catch (err) {
      dispatch(loginFailure("Server error"));
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login to NEXUSGames
        </Typography>

        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
