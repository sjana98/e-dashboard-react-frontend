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
            <img src="https://media.istockphoto.com/id/1037461070/vector/e-digital-e-mail-at-sign-vector-logo-of-letter-e-icon-for-computer-technology-and-internet.jpg?s=612x612&w=0&k=20&c=pe2qXPdTkXAO5zxkHZL2HMV0vdNxKhmzec2Phc4FGeA="
                alt="logo" className='navLogo' />
            {
                auth ? <ul className='nav-ul'>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Products</Link></li>
                    <li><Link to="/update">Update Products</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/login" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
                </ul>
                    : <ul className='nav-ul nav-right'>
                        <li><Link to="/signup">Sign up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
            }
        </>
    );
}

export default Navbar