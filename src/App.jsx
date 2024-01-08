import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Test from './pages/Test'
import Register from './pages/Register';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/test' element={<Test />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
