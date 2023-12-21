import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Products() {

    const [products, setProducts] = useState([]); 
    const [searchProduct, setSearchProduct] = useState(""); 
    const [showBtn, setShowBtn] = useState(false); 
    const navigate = useNavigate();

    const userId = JSON.parse(localStorage.getItem("user"))._id; 

    useEffect(() => {
        allProducts()
    },[]);

    const allProducts = async () => {
        const api = `http://localhost:5000/products-of-user/${userId}`;
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

    const handleSearch = async () => {
        console.log(searchProduct)
        const key = searchProduct;
        const api = `http://localhost:5000/search/${key}`;
        const fetchData = await fetch(api);
        const result = await fetchData.json();
        setProducts(result);
        setShowBtn(true);
    }
    const handleBack = () => {
        window.location.reload(true);
    }

    const productsMap = products.map((item, index) => (
        <tr key={item._id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>Rs.{item.price}/-</td>
            <td>{item.brand}</td>
            <td>{item.category}</td>
            <td>
                <button onClick={() => handleDelete(item._id)} className='deleteBtn'>Delete</button>
                <button className='updateBtn'><Link to={`/update/${item._id}`} className='updateLink'>Update</Link></button>
            </td>
        </tr>
    ));

    const productsMapWithMsg = productsMap.length > 0 ? productsMap : <p>No record found!!</p>;

    
    return (
        <>
            <div className="Product-list">
                <h4>Product List</h4>

                <button className='addProductBtn'><Link to="/add" className='addProductLink' >Add Product</Link></button>

                <input type="text" className='searchInput' placeholder='Search Product' value={searchProduct} onChange={(e)=>setSearchProduct(e.target.value)} />
                <button className='searchProductBtn' onClick={handleSearch}>Search</button>
                { showBtn && <button className='backProductBtn' onClick={handleBack}>Get all products</button> }
                
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
                    <tbody>{ productsMapWithMsg }</tbody>
                </table>
            </div>
        </>
    )
}

export default Products