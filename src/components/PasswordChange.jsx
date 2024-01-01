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
        } else {
            setConfirmMsg(true);
        }
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
            } else {
                alert("Please use enter your registered email id for varification!!");
            };

        } catch (error) {
            console.error(error);
        };
    };

    return (
        <>
            <div className="Form-Container">
                <h3>Update Password</h3>
                <input type="email" className='inputField' placeholder='Enter your registered email id' value={email} onChange={(e) => setEmail(e.target.value)} />
                {errorMsg && !email && <span className='validationText'>Enter your registered email id!!</span>}
                {/* {invalidMsg && <span className='conformationText'>This .</span>} */}

                <input type="password" className='inputField' placeholder='Enter new password atleast 6 digit' value={password} onChange={(e) => setPassword(e.target.value)} />
                {errorMsg && !password && <span className='validationText'>Enter new password!!</span>}

                <button type='submit' onClick={handleUpdate}>Update</button>
                {confirmMsg && <span className='conformationText'>Successfully update your password.</span>}
            </div>
        </>
    )
}

export default PasswordChange
