import React, { useEffect, useState } from 'react';


function Products() {

    const [products, setProducts] = useState([]);
    const [alert, setalert] = useState(false);


    useEffect(() => {
        allProducts()
    }, []);

    const allProducts = async () => {
        const api = "http://localhost:5000/products";
        let fetchProducts = await fetch(api);
        fetchProducts = await fetchProducts.json();
        if (fetchProducts.length > 0) {
            setProducts(fetchProducts);
        } else {
            setalert(true);             // This line is for, after last product delete this page is shows error.
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

    
    return (
        <>
            <div className="Product-list">
                {alert ? <p>No products to display!!</p> : <h3>Product List</h3>}
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
                    <tbody>
                        {
                            products.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>Rs. {item.price}/-</td>
                                    <td>{item.brand}</td>
                                    <td>{item.category}</td>
                                    {/* <td><button onClick={() => handleDelete(item._id)} className='deleteBtn'>Delete</button></td> */}
                                    <td>{alert ? "Successfully deleted!!" : <button onClick={() => handleDelete(item._id)} className='deleteBtn'>Delete</button>}</td> {/* This line is for, after last product delete this page is not refresh own. */} 
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Products