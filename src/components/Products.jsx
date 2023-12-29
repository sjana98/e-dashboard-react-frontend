import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Products() {

    const [products, setProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState("");
    const [showBtn, setShowBtn] = useState(false);
    const [TableFormProducts, setTableFormProducts] = useState(false);
    const [CardFormProducts, setCardFormProducts] = useState(false);

    const navigate = useNavigate();
    // Get personalize products of user
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    useEffect(() => {
        allProducts();
        setCardFormProducts(true);
    }, []);
    // Get all products on screen
    const allProducts = async () => {
        try {
            const api = `http://localhost:5000/products-of-user/${userId}`;
            const authToken = {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            };
            let fetchProducts = await axios(api, authToken);
            fetchProducts = fetchProducts.data;
            if (fetchProducts.length > 0) {
                setProducts(fetchProducts);
            } else {
                navigate("/emptyPage");    // This line is for, page is shows error after the last product deleted.
            };
        } catch (error) {
            console.error(error);
            // Expire auth token handle
            alert("Authentication time out. Please login again!!");
            localStorage.clear("user");
            navigate("/login");   
        };
    };

    // Delete product 
    const handleDelete = async (id) => {
        try {
            const api = `http://localhost:5000/products/${id}`;
            const createRequest = {
                method: "Delete",
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            };
            let result = await axios(api, createRequest);
            if (result) {
                allProducts();
            };
        } catch (error) {
            console.error(error);
        };
    };

    // Search product
    const handleSearch = async () => {
        const key = searchProduct;
        try {
            const api = `http://localhost:5000/search/${key}`;
            const authToken = {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            };
            const fetchData = await axios(api, authToken);
            const result = fetchData.data;
            setProducts(result);
            setShowBtn(true);
        } catch (error) {
            console.error(error);
        };
    };
    // Handle page refresh button after search 
    const handleBack = () => {
        window.location.reload(true);
    };

    // Maping of all Got products
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

    // Table to Card format switching handle
    const handleTableForm = () => {
        setTableFormProducts(true);
        setCardFormProducts(false);
    };
    const handleCardForm = () => {
        setCardFormProducts(true);
        setTableFormProducts(false);
    };


    return (
        <>
            <div className="Product-list">
                <h4>Product List</h4>
                
                {/* Abb product button  */}
                <button className='addProductBtn'><Link to="/add" className='addProductLink' >Add Product</Link></button>
                {/* Products search area */}
                <input type="text" className='searchInput' placeholder='Search Product' value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} />
                <button className='searchProductBtn' onClick={handleSearch}>Search</button>
                {showBtn && <button className='backProductBtn' onClick={handleBack}>Get all products</button>}
                {/* Table to Card format switch button */}
                <div>
                    {CardFormProducts && <button className='uiFormBtn' onClick={handleTableForm}>Change to table form</button>}
                    {TableFormProducts && <button className='uiFormBtn' onClick={handleCardForm}>Change to card form</button>}
                </div>

                {/* Products in table format */}
                {TableFormProducts &&
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
                        <tbody>{productsMapWithMsg}</tbody>
                    </table>
                }
            </div>

            {/* Products in card format */}
            {CardFormProducts &&
                products.map((item, index) => (
                    <>
                        <div className="product-card">
                            <img src='https://cdn-icons-png.flaticon.com/512/1440/1440523.png' alt="User Logo" className="user-profile-card__logo" />

                            <div className="product-info" key={item._id}>
                                <p> <span>Sl. no :</span> {index + 1}</p>
                                <p> <span>Name :</span> {item.name}</p>
                                <p> <span>Price :</span> {item.price}</p>
                                <p> <span>Brand :</span> {item.brand}</p>
                                <p> <span>Category :</span> {item.category}</p>
                            </div>
                            <div className="product-actions" key={item._id}>
                                <button className='updateBtn'><Link to={`/update/${item._id}`} className='updateLink'>Update</Link></button>
                                <button onClick={() => handleDelete(item._id)} className='deleteBtn'>Delete</button>
                            </div>
                        </div>
                    </>
                ))
            }
        </>
    )
}

export default Products