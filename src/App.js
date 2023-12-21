import './App.css';
import './components/style/custom.css';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import { Avatar, Grid } from '@mui/material';
import { margin } from '@mui/system';
import logo from './assets/logo.jpg';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavigationBar from './components/NavigationBar'
import Navigation from './components/Navigation'
import DaftarResep from './components/DaftarResep'
import ResepSaya from './components/ResepSaya'
import DetailResep from './components/DetailResep'
import TambahResep from './components/TambahResep'
import EditResep from './components/EditResep'
import ResepFavorit from './components/ResepFavorit'

function App() {
  // const clickMe = () => {
  //   console.log('Clicked');
  // }
  const clickMe = (parameterNama) => {
    console.log('Clicked by :' + parameterNama);
  }

  return (
    <Router>
      <div className='myBackground'>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='signup' element={<SignUp/>}/>
          <Route path='daftar-resep' element={<DaftarResep/>}/>
          <Route path='daftar-resep/detail-resep/:id' element={<DetailResep/>}/>
          <Route path='resep-saya' element={<ResepSaya/>}/>
          <Route path='resep-saya/detail-resep/:id' element={<DetailResep/>}/>
          <Route path='tambah-resep' element={<TambahResep/>}/>
          <Route path='resep-saya/edit-resep/:id' element={<EditResep/>}/>
          <Route path='resep-favorit' element={<ResepFavorit/>}/>
          <Route path='resep-favorit/edit-resep/:id' element={<EditResep/>}/>
        </Routes>
      </div>
    </Router>
  );
}
// resep-saya/id user
export default App;
