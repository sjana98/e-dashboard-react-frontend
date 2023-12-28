import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [email, setUserEmail] = useState("");
    const [password, setUserPassword] = useState("");
    const navigate = useNavigate();

    // Login page restrict, for loged in user
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        };
    }, []);

    const handleLogin = async () => {
        try {
            // api integration part
            const postApi = "http://localhost:5000/login";
            const createRequest = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: { email, password },
            };
            let result = await axios(postApi, createRequest);
            result = result.data;
            // Store jwt token in browser local storage
            if (result.authToken) {
                localStorage.setItem("user", JSON.stringify(result.userDetail));
                localStorage.setItem("token", JSON.stringify(result.authToken));
                navigate("/");
            };
        } catch (error) {
            alert("Valid email and password require for login!!");
            console.error(error);
        };
    };

    return (
        <>
            <div className="Container">
                <h2>Login Now</h2>
                <input type="text" placeholder='Enter email' className='inputField' value={email} onChange={(e) => setUserEmail(e.target.value)} />
                <input type="password" placeholder='Enter password' className='inputField' value={password} onChange={(e) => setUserPassword(e.target.value)} />
                <p>Don't have an account? <Link to="/signup"> Sign up here</Link></p>
                <button type='submit' onClick={handleLogin}>Login</button>
            </div>
        </>
    )
}

export default Login