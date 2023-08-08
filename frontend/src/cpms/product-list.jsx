
import React, { useState } from 'react';
import { ProductPreview } from './product-preview.jsx';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

export function ProductList({ products, onRemoveProduct, onAddToCart }) {
<<<<<<< HEAD
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
=======
>>>>>>> 77aaa366d4ce08215273186d154411b409b97fe1

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const pageNumbers = Math.ceil(products.length / productsPerPage);

    const nextPage = () => {
        if (currentPage < pageNumbers) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
<<<<<<< HEAD
        <>
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
               < AiOutlineLeft />
                </button>
                <div>{currentPage}</div>
                <button onClick={nextPage} disabled={currentPage === pageNumbers}>
                    <AiOutlineRight />
                </button>
=======
        <section className="product-list main-layout animate__animated animate__slideInUp">

            {products.map(product => <div key={product._id} className="product">
                <ProductPreview onRemoveProduct={onRemoveProduct} product={product} onAddToCart={onAddToCart} />
        
>>>>>>> 77aaa366d4ce08215273186d154411b409b97fe1
            </div>
            <section className="product-list main-layout animate__animated animate__slideInUp">

                {currentProducts.map(product => (
                    <div key={product._id} className="product">
                        <ProductPreview
                            onRemoveProduct={onRemoveProduct}
                            product={product}
                            onAddToCart={onAddToCart}
                        />
                    </div>
                ))}
            </section>
        </>
    );
}
