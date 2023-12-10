import React, { useState } from 'react';

function AddProduct() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");

    const handleAddProduct = () => {
        console.log({ name, price, brand, category });
    };
    return (
        <>
            <div className="Container addPtCont">
                <h3>Add Product</h3>
                <input type="text" className='inputField' placeholder='Enter name of product' value={name} onChange={(e)=> setName(e.target.value)}/>
                <input type="Number" className='inputField' placeholder='Enter price of product in rupee' value={price} onChange={(e)=> setPrice(e.target.value)}/>
                <input type="text" className='inputField' placeholder='Enter brand of product' value={brand} onChange={(e)=> setBrand(e.target.value)}/>
                <input type="text" className='inputField' placeholder='Enter category of product' value={category} onChange={(e)=> setCategory(e.target.value)}/>
                <button type='button' className='addBtn' onClick={handleAddProduct}>Add</button>
            </div>
            
        </>
    )
}

export default AddProduct