import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [email, setUserEmail] = useState("");
    const [password, setUserPassword] = useState("");
    const [passwordShow, setPasswordShow] = useState(false);
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
            // Store jwt token and user details in browser local storage
            if (result.authToken) {
                localStorage.setItem("user", JSON.stringify(result.userDetail));
                localStorage.setItem("token", JSON.stringify(result.authToken));
                navigate("/");
            };
        } catch (error) {
            alert("Registered email and password require for login!!");
            console.error(error);
        };
    };

    return (
        <>
            <div className="Form-Container">
                <h2>Login Now</h2>

                <input type="text" placeholder='Enter email' className='inputField' value={email} onChange={(e) => setUserEmail(e.target.value)} />

                {/* Password show & hide handle with toggle text */}
                <input type={(!passwordShow && "password") || (passwordShow && "text")} placeholder='Enter password' className='inputField' value={password} onChange={(e) => setUserPassword(e.target.value)} />
                {/* On click state change of passwordShow */}
                <span onClick={()=>setPasswordShow((pre)=>(!pre))} className='password-show-hide-text login-page-show-hide-text'>
                    {passwordShow && "Hide"} 
                    {!passwordShow && "Show"}
                </span>

                <p>Don't have an account? <Link to="/signup"> Sign up here</Link></p>

                <p> <Link to="/password_update"> Forgot password?</Link></p>

                <button type='submit' onClick={handleLogin}>Login</button>
            </div>
        </>
    )
}

export default Login