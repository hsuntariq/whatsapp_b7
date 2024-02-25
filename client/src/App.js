import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/auth/Register';
import Home from './pages/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import './globals.css'
import Main from './pages/home/messagePanel/Main';
function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/message-panel/:id' element={<Main />} />
          <Route path='*' element="No Page exists" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
