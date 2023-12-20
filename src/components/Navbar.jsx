import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

    useNavigate(); // here, this hook is for auto navbar refresh on ui update.
    const auth = localStorage.getItem("user");
    

    return (
        <>
            <img src="https://img.freepik.com/premium-vector/travel-agency-logo_617280-339.jpg" alt="logo" className='navLogo' />
            {
                auth && <ul className='nav-ul'>
                    <li><Link to="/">Products</Link></li>
                    <li>
                        <Link to="/profile">Profile</Link>
                        [{JSON.parse(auth).name}]
                    </li>
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