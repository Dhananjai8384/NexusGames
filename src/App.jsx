import { CssBaseline, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Store from "./pages/Store";
import Library from "./pages/Library"; // ✅ ADD THIS
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "#121212" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/form" element={<Form />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
