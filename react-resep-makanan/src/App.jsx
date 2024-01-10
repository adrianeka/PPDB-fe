import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login'
import DaftarResep from './pages/DaftarRerep';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/user-management/users/signin' element={<Login />}/>
          <Route path='/daftar-resep' element={<DaftarResep />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/user-management/users/signup' element={<Register />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
