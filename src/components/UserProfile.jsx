import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserProfile() {

    const navigate = useNavigate();
    const auth = localStorage.getItem("user");

    const handleLogout = () => {
        localStorage.clear("user");
        navigate("/login");
    };
    const handleDelete = async (id) => {
        const api = `http://localhost:5000/account/${id}`; 
        const createRequest = {
            method: "Delete",
        };
        let result = await fetch(api, createRequest);
        await result.json();
        if (result) {
            alert("Your account will permanently delete from database!!")
            localStorage.clear("user");
            navigate("/signup");
        };
    };

    return (
        <>
            <div className="user-profile-card">
                <img src='https://cdn-icons-png.flaticon.com/512/3177/3177440.png' alt="User Logo" className="user-profile-card__logo" />
                <h3 className="user-profile-card__name">{JSON.parse(auth).name}</h3>
                <p className="user-profile-card__email">{JSON.parse(auth).email}</p>
                <button className="user-profile-card__logout" onClick={handleLogout}>Logout</button>
                <button className="user-profile-card__logout __delete" onClick={()=>handleDelete(JSON.parse(auth)._id)}>Account delete</button>
            </div>
        </>
    );
}

export default UserProfile