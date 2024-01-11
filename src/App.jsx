import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import DaftarResepMasakan from "./pages/DaftarResepMasakan";

import "./styles/index.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles";
import DetailResep from "./pages/DetailResep";
import ResepSaya from "./pages/ResepSaya";
import ResepFavorit from "./pages/ResepFavorit";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/daftar-resep" element={<DaftarResepMasakan />} />
          <Route
            path="/daftar-resep/detail-resep/:id"
            element={<DetailResep />}
          />
          <Route path="/resep-saya" element={<ResepSaya />} />
          <Route
            path="/resep-saya/detail-resep/:id"
            element={<DetailResep />}
          />
          <Route path="/resep-favorit" element={<ResepFavorit />} />
          <Route
            path="/resep-favorit/detail-resep/:id"
            element={<DetailResep />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
