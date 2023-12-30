import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function AddProduct() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [errorMsg, setErrorMsg] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState(false);

    const navigate = useNavigate();


    const userName = JSON.parse(localStorage.getItem("user")).name;
    
    const handleSubmit = async () => {         
        // Simple form validation part
        if (!name || !price || !brand || !category) {       
            setErrorMsg(true);
            return false;
        } else {
            setConfirmMsg(true);
        };

        try {
            // api integration part
            const userId = JSON.parse(localStorage.getItem("user"))._id;   
            const api = "http://localhost:5000/add-product"; 
            const createRequest = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
                data: { name, price, brand, category, userId },
            };
            await axios(api, createRequest);
        } catch (error) {
            console.error(error);
            // Expire auth token handle
            setConfirmMsg(false);
            alert("Authentication time out. Please login again!!");
            localStorage.clear("user");
            navigate("/login");
        };
    };

    return (
        <>
            <form className="Form-Container">
                <h3>Add Product</h3>
                <input type="text" className='inputField' placeholder='Enter name of product' value={name} onChange={(e) => setName(e.target.value)} />
                {errorMsg && !name && <span className='validationText'>Enter name of product!!</span>}

                <input type="Number" className='inputField' placeholder='Enter price of product in rupee' value={price} onChange={(e) => setPrice(e.target.value)} />
                {errorMsg && !price && <span className='validationText'>Enter price of product!!</span>}

                <input type="text" className='inputField' placeholder='Enter brand name of product' value={brand} onChange={(e)=> setBrand(e.target.value)}/>
                {errorMsg && !brand && <span className='validationText'>Enter brand of product!!</span>}

                <input type="text" className='inputField' placeholder='Enter category of product' value={category} onChange={(e)=> setCategory(e.target.value)}/>
                {errorMsg && !category && <span className='validationText'>Enter category of product!!</span>}

                <button type='submit' className='addBtn' onClick={handleSubmit}>Add</button>
                {confirmMsg && <span className='conformationText'> {userName}, successfully add your product.</span>}

            </form>
        </>
    )
}

export default AddProduct