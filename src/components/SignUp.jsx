import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();

  // Sign up page restrict, for signed up user
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/")
    };
  }, []);

  const collectData = async () => {
    // Simple form validation
    if (!name || !email || !password) {
      setErrorMsg(true);
      return false;
    };
    try {
      // api integration part
      const api = "http://localhost:5000/signup";
      const createRequest = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { name, email, password },
      };
      let result = await axios(api, createRequest);
      result = result.data;
      // Store jwt token in browser local storage
      if (result.authToken) {
        localStorage.setItem("user", JSON.stringify(result.resultData));
        localStorage.setItem("token", JSON.stringify(result.authToken));
        navigate("/");
      };
    } catch (error) {
      alert("Already have user with same email id!!!");
      console.error(error);
    };
  };


  return (
    <>
      <div className="Form-Container">
        <h2>Sign Up Now</h2>

        <input className='inputField' type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
        {errorMsg && !name && <span className='validationText'>Enter your name!! </span>}

        <input className='inputField' type="text" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
        {errorMsg && !email && <span className='validationText'>Enter your email!! </span>}

        <div className="password-wrapper">
          {/* Password show & hide handle with toggle text */}
          <input className='inputField' type={(!passwordShow && "password") || (passwordShow && "text")} placeholder='Enter password at least 6 digit' value={password} onChange={(e) => setPassword(e.target.value)} />
          {/* On click state change of passwordShow */}
          <span onClick={() => setPasswordShow((pre) => (!pre))} className='password-show-hide-text'>
            {passwordShow && "Hide"}
            {!passwordShow && "Show"}
          </span>
        </div>
        {errorMsg && !password && <span className='validationText'>Enter password!! </span>}

        <p>Already have an account? <Link to="/login"> Login here</Link></p>
        
        <button type='submit' onClick={collectData}>Sign Up</button>
      </div>
    </>
  )
}

export default SignUp