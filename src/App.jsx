import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DaftarResepMasakan from "./pages/DaftarResepMasakan";
import DetailResep from "./pages/DetailResep";
import ResepSaya from "./pages/ResepSaya";
import ResepFavorit from "./pages/ResepFavorit";
import TambahResep from "./pages/TambahResep";
import EditResep from "./pages/EditResep";
import PrivateRoute from "./services/PrivateRoute";

import "./styles/index.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/*" element={<PrivateRoute />}>
            <Route path="tambah-resep" element={<TambahResep />} />
            <Route path="daftar-resep" element={<DaftarResepMasakan />} />
            <Route
              path="daftar-resep/detail-resep/:id"
              element={<DetailResep />}
            />
            <Route path="resep-saya" element={<ResepSaya />} />
            <Route
              path="resep-saya/detail-resep/:id"
              element={<DetailResep />}
            />
            <Route path="resep-saya/edit-resep/:id" element={<EditResep />} />
            <Route path="resep-favorit" element={<ResepFavorit />} />
            <Route
              path="resep-favorit/detail-resep/:id"
              element={<DetailResep />}
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
