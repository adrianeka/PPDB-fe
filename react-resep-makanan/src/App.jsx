import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Test from './pages/Test'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/test' element={<Test />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
