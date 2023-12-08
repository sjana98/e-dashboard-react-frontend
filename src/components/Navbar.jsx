import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const auth = localStorage.getItem("user");
    
    return (
        <>
            <ul className='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/Update">Update Products</Link></li>
                <li><Link to="/Profile">Profile</Link></li>
                <li>{auth ? <Link to="/Logout">Logout</Link> : <Link to="/SignUp">Sign Up</Link>}</li>
            </ul>
        </>
    );
}

export default Navbar