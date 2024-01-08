import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import DaftarResepMasakan from "./pages/DaftarResepMasakan";
import "./styles/index.css";

import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  typography: {
    fontFamily: ["Mulish", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/daftar-resep" element={<DaftarResepMasakan />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
