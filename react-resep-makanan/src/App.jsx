import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/Login'
import DaftarResep from './pages/DaftarRerep';
import Landing from './pages/Landing';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/user-management/users/signin' element={<LoginPage />}/>
          <Route path='/daftar-resep' element={<DaftarResep />}/>
          <Route exact path='/' element={<Landing />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
