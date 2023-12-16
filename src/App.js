import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Products from './components/Products';


function App() {
  return (
    <div className="App">
      <Router>

        <Navbar />

        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Products />}/>
            <Route path='/add' element={<AddProduct />}/>
            <Route path='/update' element={<h2>updated Products component</h2>}/>
            <Route path='/logout' element={<h2>Logout component</h2>}/>
            <Route path='/profile' element={<h2>profile component</h2>} />
          </Route>

          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>

      </Router>

      <Footer />
    </div>
  );
}

export default App;
