import React, { useEffect, useState } from 'react';

function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        allProducts()
    }, []);

    const allProducts = async () => {
        const api = "http://localhost:5000/products";
        let fetchProducts = await fetch(api);
        fetchProducts = await fetchProducts.json();
        setProducts(fetchProducts);
    }
    return (
        <>
            <div className="Product-list">
                <h3>Product List</h3>
                <ul>
                    <li className='listTitle'>Sl. no</li>
                    <li className='listTitle'>Name</li>
                    <li className='listTitle'>Price</li>
                    <li className='listTitle'>Brand</li>
                    <li className='listTitle'>Category</li>
                </ul>
                {
                    products.map((item, index) => (
                        <ul>
                            <li>{index+1}</li>
                            <li>{item.name}</li>
                            <li>Rs. {item.price}/-</li>
                            <li>{item.brand}</li>
                            <li>{item.category}</li>
                        </ul>
                        
                    ))
                }
            </div>
        </>
    )
}

export default Products