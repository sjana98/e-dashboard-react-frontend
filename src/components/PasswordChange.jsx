import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function PasswordChange() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShow, setPasswordShow] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const navigate = useNavigate();

    // Update the fogot password 
    const handleUpdate = async () => {
        // Simple form validation part
        if (!email || !password) {
            setErrorMsg(true);
            return false;
        };
        try {

            // api integration
            const api = `http://localhost:5000/password-change/${email}`;
            const createRequest = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                data: { email, password },
            };
            let fetchData = await axios(api, createRequest);
            fetchData = fetchData.data;
            if (fetchData) {
                alert("Successfully updated your password.");
                navigate("/login");
            };

        } catch (error) {
            alert("Varification error!!");
            console.error(error);
        };
    };

    return (
        <>
            <div className="Form-Container">
                <h4 className='title'>Password Update</h4>

                <span className='labelText'>Enter registered email id for varification:</span>
                <input type="email" className='inputField' placeholder='Enter email id ' value={email} onChange={(e) => setEmail(e.target.value)} />
                {errorMsg && !email && <span className='validationText'>Enter your registered email id!!</span>}

                {/* Password show & hide handle with toggle text */}
                <span className='labelText'>Enter new password:</span>
                <input type={(!passwordShow && "password") || (passwordShow && "text")} className='inputField' placeholder= 'Password atleast 6 digit' value={password} onChange={(e) => setPassword(e.target.value)} />
                {errorMsg && !password && <span className='validationText'>Enter new password!!</span>}
                {/* On click state change of passwordShow */}
                <span onClick={()=>setPasswordShow((pre)=>(!pre))} className='password-show-hide-text updatePassword-page-show-hide-text'>
                    {passwordShow && "Hide"} 
                    {!passwordShow && "Show"}
                </span>

                <button type='submit' onClick={handleUpdate}>Update</button>
                
            </div>
        </>
    )
}

export default PasswordChange
