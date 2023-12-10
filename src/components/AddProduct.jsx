import React, { useState } from 'react';

function AddProduct() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");

    const userName = JSON.parse(localStorage.getItem("user")).name;
    
    const handleAddProduct = async () => {                // api integration part
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        
        const api = "http://localhost:5000/add-product"; 
        const createRequest = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, price, brand, category, userId }),
        };
        let result = await fetch(api, createRequest);
        result = await result.json();

        if (result.name && result.price && result.brand && result.category) {
            alert(`${userName}, successfully add your product.`);
        } else {
            alert(`${userName}, please fill the all are requirement inputs!!`);
        };
    };

    return (
        <>
            <div className="Container addPtCont">
                <h3>Add Product</h3>
                <input type="text" className='inputField' placeholder='Enter name of product' value={name} onChange={(e)=> setName(e.target.value)}/>
                <input type="Number" className='inputField' placeholder='Enter price of product in rupee' value={price} onChange={(e)=> setPrice(e.target.value)}/>
                <input type="text" className='inputField' placeholder='Enter brand name of product' value={brand} onChange={(e)=> setBrand(e.target.value)}/>
                <input type="text" className='inputField' placeholder='Enter category of product' value={category} onChange={(e)=> setCategory(e.target.value)}/>
                <button type='button' className='addBtn' onClick={handleAddProduct}>Add</button>
            </div>
        </>
    )
}

export default AddProduct