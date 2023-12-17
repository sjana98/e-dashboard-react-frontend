import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Products() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        allProducts()
    });

    const allProducts = async () => {
        const api = "http://localhost:5000/products";
        let fetchProducts = await fetch(api);
        fetchProducts = await fetchProducts.json();
        if (fetchProducts.length > 0) {
            setProducts(fetchProducts);
        } else {
            navigate("/emptyPage");             // This line is for, page is shows error after the last product deleted.
        };
    };

    const handleDelete = async (id) => {
        const api = `http://localhost:5000/products/${id}`;
        const createRequest = {
            method: "Delete",
        };
        let result = await fetch(api, createRequest);
        await result.json();
        if (result) {
            allProducts();
        }
    };

    const productsMap = products.map((item, index) => (
        <tr key={item._id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>Rs.{item.price}/-</td>
            <td>{item.brand}</td>
            <td>{item.category}</td>
            <td><button onClick={() => handleDelete(item._id)} className='deleteBtn'>Delete</button></td>
        </tr>
    ))

    
    return (
        <>
            <div className="Product-list">
                <h4>Product List</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Sl. no</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>{ productsMap }</tbody>
                </table>
            </div>
        </>
    )
}

export default Products