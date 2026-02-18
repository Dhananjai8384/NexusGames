import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  CardMedia,
} from "@mui/material";
import games from "../data/games";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GameCard({ game }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  function handleBuy() {
    if (!isAuthenticated) {
      navigate("/form");
    } else {
      console.log("Proceed to purchase:", game.title);
    }
  }

  return (
    <Card
      sx={{ bgcolor: "#1e1e1e", color: "#fff", height: "100%", width: "100%" }}
    >
      {/* Image or Placeholder */}
      <CardMedia
        component="img"
        height="180"
        image={game.image}
        alt={game.title}
        
      />

      <CardContent>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          {game.title}
          <br />
          {game.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button variant="contained" fullWidth onClick={handleBuy}>
          Buy Now
        </Button>
      </CardActions>
    </Card>
  );
}
