import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">

<Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<h2>Products listing component</h2>}/>
          <Route path='/add' element={<h2>Added products component</h2>}/>
          <Route path='/update' element={<h2>updated Products component</h2>}/>
          <Route path='/logout' element={<h2>Logout component</h2>}/>
          <Route path='/profile' element={<h2>profile component</h2>}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
