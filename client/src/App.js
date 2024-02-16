import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/auth/Register';
import Home from './pages/home/Home';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
