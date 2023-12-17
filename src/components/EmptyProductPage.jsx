import React from 'react'

function EmptyProductPage() {
    return (
        <>
            <div className="emptyProduct">    {/* This component is for, product page is shows error after the last product deleted. */}
                <span>No products to display!!</span>
            </div>
        </>
    )
}

export default EmptyProductPage