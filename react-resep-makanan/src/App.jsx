import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/Login'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<LoginPage />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
