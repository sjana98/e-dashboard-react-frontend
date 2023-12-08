import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <Router>

        <Navbar />

        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<h2>Products listing component</h2>}/>
            <Route path='/add' element={<h2>Added products component</h2>}/>
            <Route path='/update' element={<h2>updated Products component</h2>}/>
            <Route path='/logout' element={<h2>Logout component</h2>}/>
            <Route path='/profile' element={<h2>profile component</h2>} />
          </Route>

          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Login' element={<Login />} />
        </Routes>

      </Router>

      <Footer />
    </div>
  );
}

export default App;
