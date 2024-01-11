import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route path='/user-management/users/signup' element={<Register />}/>
          <Route path='/user-management/users/signin' element={<Login />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
