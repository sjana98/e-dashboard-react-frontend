import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear("user");
        navigate("/signup");
    };

    return (
        <>
            <img src="https://img.freepik.com/premium-vector/travel-agency-logo_617280-339.jpg" alt="logo" className='navLogo' />
            {
                auth && <ul className='nav-ul'>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/login" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
                </ul>
            }
            {
                !auth && <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">Sign up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </>
    );
}

export default Navbar