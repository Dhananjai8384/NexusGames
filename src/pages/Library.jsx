import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import games from "../data/games";

export default function Library() {
  const user = useSelector((state) => state.auth.user);
  const [libraryGames, setLibraryGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const purchases = JSON.parse(localStorage.getItem("purchases")) || [];

      // Filter only this user's purchases
      const userPurchases = purchases.filter(
        (p) => Number(p.userId) === Number(user.id),
      );

      const matchedGames = userPurchases
        .map((purchase) => {
          const game = games.find(
            (g) => Number(g.id) === Number(purchase.gameId),
          );

          if (!game) return null;

          return {
            ...game,
            installed: purchase.installed,
            purchaseId: purchase.id,
          };
        })
        .filter(Boolean);

      setLibraryGames(matchedGames);
    } catch (error) {
      console.error("Failed to fetch library:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  function handleInstall(game) {
    try {
      const purchases = JSON.parse(localStorage.getItem("purchases")) || [];

      const updatedPurchases = purchases.map((p) =>
        p.id === game.purchaseId ? { ...p, installed: true } : p,
      );

      localStorage.setItem("purchases", JSON.stringify(updatedPurchases));

      setLibraryGames((prev) =>
        prev.map((g) => (g.id === game.id ? { ...g, installed: true } : g)),
      );
    } catch (error) {
      console.error("Install failed:", error);
    }
  }

  function handleLaunch(game) {
    alert(`Launching ${game.title}...`);
  }

  if (!user) {
    return (
      <Box sx={{ p: 6 }}>
        <Typography variant="h5" color="white">
          Please login to view your Library.
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ p: 6 }}>
        <Typography variant="h6">Loading your library...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 4, py: 6, color: "#fff" }}>
      <Typography variant="h4" gutterBottom>
        Your Library
      </Typography>

      {libraryGames.length === 0 ? (
        <Typography>No games purchased yet.</Typography>
      ) : (
        <Grid container spacing={4}>
          {libraryGames.map((game) => (
            <Grid item xs={12} sm={6} md={3} key={game.id}>
              <Card
                sx={{
                  backgroundColor: "#1f1f1f",
                  color: "#fff",
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={game.image}
                  alt={game.title}
                />

                <CardContent>
                  <Typography variant="h6">{game.title}</Typography>

                  {!game.installed ? (
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={() => handleInstall(game)}
                    >
                      Install
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mt: 2 }}
                      onClick={() => handleLaunch(game)}
                    >
                      Launch
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
