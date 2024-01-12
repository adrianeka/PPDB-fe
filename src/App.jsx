import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Test from './pages/Test'
import ResepSaya from './pages/ResepSaya';

import "./styles/index.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles";


function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/test' element={<Test />}/>
          <Route path='/resep-saya' element={<ResepSaya />}/>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
