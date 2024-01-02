import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function PasswordChange() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState(false);
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
                setConfirmMsg(true);
                alert("Successfully update your password");
                navigate("/login");
            };

        } catch (error) {
            alert("Please enter your registered email id for varification!!");
            console.error(error);
        };
    };

    return (
        <>
            <div className="Form-Container">
                <h4>Password Update</h4>
                <input type="email" className='inputField' placeholder='Enter registered email id for varification' value={email} onChange={(e) => setEmail(e.target.value)} />
                {errorMsg && !email && <span className='validationText'>Enter your registered email id!!</span>}

                <input type="password" className='inputField' placeholder='Enter new password atleast 6 digit' value={password} onChange={(e) => setPassword(e.target.value)} />
                {errorMsg && !password && <span className='validationText'>Enter new password!!</span>}

                <button type='submit' onClick={handleUpdate}>Update</button>
                
                {confirmMsg && <span className='conformationText'>Successfully update your password.</span>}
            </div>
        </>
    )
}

export default PasswordChange
