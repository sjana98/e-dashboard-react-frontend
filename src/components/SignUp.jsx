import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {              // Sign up page restriction after sign up of same user
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/")
    };
  },[]);
  
  const collectData = async () => {  
    if (!name || !email || !password) {  // Simple form validation part.
      setErrorMsg(true);
      return false;
    } else {
      setConfirmMsg(true);
    };

    const api = "http://localhost:5000/signup";    // api integration part
    const createRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    };
    let result = await fetch(api, createRequest);
    result = await result.json();

    localStorage.setItem("user", JSON.stringify(result));

    if (result) {
      navigate("/");
    };
  };

  return (
    <>
      <div className="Container">
        <h2>Sign Up Now</h2>
        <input className='inputField' type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
        {errorMsg && !name && <span className='validationText'>Enter your name!! </span>}

        <input className='inputField' type="text" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
        {errorMsg && !email && <span className='validationText'>Enter your email!! </span>}

        <input className='inputField' type="password" placeholder='Enter password at least 6 digit' value={password} onChange={(e) => setPassword(e.target.value)} />
        {errorMsg && !password && <span className='validationText'>Enter password!! </span>}

        <p>Already have an account? <Link to="/login"> Login here</Link></p>
        <button type='submit' onClick={collectData}>Sign Up</button>
        {confirmMsg && <span className='conformationText'> Successfully register.</span>}

      </div>
    </>
  )
}

export default SignUp