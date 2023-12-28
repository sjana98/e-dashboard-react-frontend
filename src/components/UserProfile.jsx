import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {

    const navigate = useNavigate();
    const auth = localStorage.getItem("user");
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    const handleLogout = () => {
        localStorage.clear("user");
        navigate("/login");
    };

    const handleDelete = async (id) => {
        const confirmation = window.confirm("Are you sure you want to delete your account and all data? This action cannot be undone.");
        if (confirmation) {
            try {
                // delete account of loged in user.
                const api = `http://localhost:5000/account/${id}`;
                const createRequest = {
                    method: "Delete",
                    headers: {
                        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                    },
                };
                let result = await axios(api, createRequest);
                result = result.data;
                // delete products with account delete of loged in user.
                if (result) {
                    const api2 = `http://localhost:5000/products-of-user/${userId}`;
                    const createRequest2 = {
                        method: "Delete",
                        headers: {
                            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                        },
                    };
                    await axios(api2, createRequest2);

                    localStorage.clear("user");
                    navigate("/signup");
                };
            } catch (error) {
                console.error(error);
            };
        };
    };

    return (
        <>
            <div className="user-profile-card">
                <img src='https://cdn-icons-png.flaticon.com/512/3177/3177440.png' alt="User Logo" className="user-profile-card__logo" />
                <h3 className="user-profile-card__name">{JSON.parse(auth).name}</h3>
                <p className="user-profile-card__email">{JSON.parse(auth).email}</p>
                <button className="user-profile-card__logout" onClick={handleLogout}>Logout</button>
                <button className="user-profile-card__logout __delete" onClick={() => handleDelete(JSON.parse(auth)._id)}>Account delete</button>
            </div>
        </>
    );
}

export default UserProfile