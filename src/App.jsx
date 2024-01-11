import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Test from './pages/Test'
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route path='/user-management/users/signup' element={<Register />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
