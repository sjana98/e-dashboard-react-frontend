import React from 'react'
import { Link } from 'react-router-dom'

function EmptyProductPage() {
    return (
        <>
            <div className="emptyProduct">    {/* This component is for, product page is shows error after the last product deleted. */}
                <span>No products to display. You should add products!!</span>
                <button className='addProductBtn'><Link to="/add" className='addProductLink' >Add Product</Link></button>
            </div>
        </>
    )
}

export default EmptyProductPage