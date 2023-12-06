import React,{useState} from 'react';


function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    console.log(name, email, password);
  };
  return (
    <>
      <div className="signContainer">
        <h2>Sign Up Now</h2>
          <input className='inputField' type="text" placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)} />
          <input className='inputField' type="text" placeholder='Enter Your Email' value={email}  onChange={(e)=>setEmail(e.target.value)}/>
          <input className='inputField' type="password" placeholder='Enter Password' value={password}  onChange={(e)=>setPassword(e.target.value)} />
        <button type='button'onClick={handleClick}>Sign Up</button>
      </div>
    </>
  )
}

export default SignUp