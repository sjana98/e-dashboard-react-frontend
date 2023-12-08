import React, { useState } from 'react'

function Login() {

    const [userName, setUserName] = useState("");
    const [userpassword, setUserPassword] = useState("");
    const handleLogin = () => {
        console.log(userName, userpassword);
    };

    return (
        <>
            <div className="login">
                <h2>Login Now</h2>
                <input type="text" placeholder='Enter username or email' className='inputField' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                <input type="password" placeholder='Enter password' className='inputField' value={userpassword} onChange={(e)=>setUserPassword(e.target.value)}/>
                <button type='button' onClick={handleLogin}>Login</button>
            </div>
        </>
    )
}

export default Login