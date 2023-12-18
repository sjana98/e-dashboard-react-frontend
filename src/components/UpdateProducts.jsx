import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function UpdateProducts() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");

    const [errorMsg, setErrorMsg] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState(false);


    const params = useParams()

    const userName = JSON.parse(localStorage.getItem("user")).name;

    useEffect(() => {
        getProductDetail()
    });
    const getProductDetail = async () => {
        const api = `http://localhost:5000/products/${params.id}`;
        const fetchProduct = await fetch(api);
        const result = await fetchProduct.json();
        setName(result.name);
        setPrice(result.price);
        setBrand(result.brand);
        setCategory(result.category);
    };

    const handleUpdate = async () => {
        if (!name || !price || !brand || !category) {       // Simple form validation part
            setErrorMsg(true);
            return false;
        } else {
            setConfirmMsg(true);
        };
    };


    return (
        <>
            <form className="Container addPtCont">
                <h3>Update Product</h3>
                <input type="text" className='inputField' placeholder='Enter name of product' value={name} onChange={(e) => setName(e.target.value)} />
                {errorMsg && !name && <span className='validationText'>Enter updated name of product!!</span>}

                <input type="Number" className='inputField' placeholder='Enter price of product in rupee' value={price} onChange={(e) => setPrice(e.target.value)} />
                {errorMsg && !price && <span className='validationText'>Enter updated price of product!!</span>}

                <input type="text" className='inputField' placeholder='Enter brand name of product' value={brand} onChange={(e) => setBrand(e.target.value)} />
                {errorMsg && !brand && <span className='validationText'>Enter brand of product!!</span>}

                <input type="text" className='inputField' placeholder='Enter category of product' value={category} onChange={(e) => setCategory(e.target.value)} />
                {errorMsg && !category && <span className='validationText'>Enter category of product!!</span>}

                <button type='submit' className='addBtn' onClick={handleUpdate}>Update</button>
                {confirmMsg && <span className='conformationText'> {userName}, successfully update your product.</span>}
            </form>
        </>
    )
}

export default UpdateProducts