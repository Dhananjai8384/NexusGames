import { Box, Typography, Grid, Container } from "@mui/material";
import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import games from "../data/games";

export default function Store() {
  const images = [
    "/images/slide1.jpg",
    "/images/slide2.jpg",
    "/images/slide3.jpg",
    "/images/slide4.jpg",
    "/images/slide5.webp",
    "/images/slide6.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Container disableGutters maxWidth={false}>
        <Box
          sx={{
            minHeight: "550px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 1s ease-in-out",
            textAlign: "center",
            color: "#fff",
          }}
        ></Box>
      </Container>
      <Box sx={{ opacity: 1, textAlign: "center", alignItems: "center" }}>
        <Typography variant="h3" color="white">
          Discover Your Next Favorite Game
        </Typography>
        <Typography color=" white">
          Buy, play, and enjoy the best PC games
        </Typography>
      </Box>

      <Box sx={{ px: 4, py: 6, color: "#fff" }}>
        <Container minWidth={false}>
          <Typography variant="h5" gutterBottom>
            Featured Games
          </Typography>
        </Container>

        <Container >
          <Grid container spacing={6}>
            {games.map((game) => (
              <Grid item xs={12} sm={6} md={3} key={game.id}>
                <GameCard game={game} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
