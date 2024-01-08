import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Test from './pages/Test'
import DaftarResepSaya from './pages/DaftarResepSaya';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/test' element={<Test />}/>
          <Route path='/resep-saya' element={<DaftarResepSaya />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
