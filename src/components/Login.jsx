import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {

    const [email, setUserEmail] = useState("");
    const [password, setUserPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {                             // Login page restriction after login.
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }; 
    });

    const postApi = "http://localhost:5000/login";     // api integration part 
    const handleLogin = async () => {
        const createRequest = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        };
        let result = await fetch(postApi, createRequest);
        result = await result.json();
        const userName = result.name;
        userName ? localStorage.setItem("user", JSON.stringify(result)) : alert("Valid email and password require for login!!");
        if (userName) {
            navigate("/");
        };
    };

    return (
        <>
            <div className="login">
                <h2>Login Now</h2>
                <input type="text" placeholder='Enter email' className='inputField' value={email} onChange={(e)=>setUserEmail(e.target.value)}/>
                <input type="password" placeholder='Enter password' className='inputField' value={password} onChange={(e) => setUserPassword(e.target.value)} />
                <p>Don't have an account? <Link to="/signup"> Sign up here</Link></p>
                <button type='button' onClick={handleLogin}>Login</button>
            </div>
        </>
    )
}

export default Login