import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear("user");
        navigate("/login");
    };

    return (
        <>
            <div className="user-profile-card">
                <img src='https://cdn-icons-png.flaticon.com/512/3177/3177440.png' alt="User Logo" className="user-profile-card__logo" />
                <h3 className="user-profile-card__name">{JSON.parse(auth).name}</h3>
                <p className="user-profile-card__email">{JSON.parse(auth).email}</p>
                <button className="user-profile-card__logout" onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
}

export default UserProfile