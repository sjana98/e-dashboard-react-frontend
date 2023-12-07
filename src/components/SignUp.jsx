import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const uri = "http://localhost:5000/register";

  const collectData = async () => {
    const createRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    };
    const result = await fetch(uri, createRequest);
    if (result) {
      navigate("/");
    };
  };

  return (
    <>
      <div className="signContainer">
        <h2>Sign Up Now</h2>
        <input className='inputField' type="text" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
        <input className='inputField' type="text" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='inputField' type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='button' onClick={collectData}>Sign Up</button>
      </div>
    </>
  )
}

export default SignUp