import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear("user");
        navigate("/SignUp");
    };
    
    return (
        <>
            <ul className='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/Update">Update Products</Link></li>
                <li><Link to="/Profile">Profile</Link></li>
                <li>{auth ? <Link to="/SignUp" onClick={logout}>Logout</Link> : <Link to="/SignUp">Sign Up</Link>}</li>
            </ul>
        </>
    );
}

export default Navbar