import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {

    useNavigate(); // here, this hook is for auto navbar refresh on ui update.
    const auth = localStorage.getItem("user");
    

    return (
        <>
            <img src="https://img.freepik.com/premium-vector/travel-agency-logo_617280-339.jpg" alt="logo" className='navLogo' />
            {
                auth && <ul className='nav-ul'>
                    <li><NavLink to="/" >Products</NavLink></li>
                    <li><NavLink to="/profile" >Profile</NavLink></li>
                    <li className='userName'>[ {JSON.parse(auth).name} ]</li>
                </ul>
            }
            {
                !auth && <ul className='nav-ul nav-right'>
                    <li><NavLink to="/signup">Sign up</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                </ul>
            }
        </>
    );
}

export default Navbar