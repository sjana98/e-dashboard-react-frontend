import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import EmptyProductPage from './components/EmptyProductPage';
import UpdateProducts from './components/UpdateProducts';


function App() {
  return (
    <div className="App">
      <Router>

        <Navbar />

        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Products />}/>
            <Route path='/emptyPage' element={<EmptyProductPage />}/>  {/* This component is for, product page is shows error after the last product deleted. */}
            <Route path='/add' element={<AddProduct />}/>
            <Route path='/update/:id' element={<UpdateProducts />}/>
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
