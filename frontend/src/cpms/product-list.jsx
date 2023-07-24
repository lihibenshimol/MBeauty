// import { Link } from "react-router-dom";
import { ProductPreview } from "./product-preview.jsx";


export function ProductList({ products, onRemoveProduct, onAddToCart }) {


    return (
        <section className="product-list main-layout animate__animated animate__slideInUp">

            {products.map(product => <div key={product._id} className="product">
                <ProductPreview onRemoveProduct={onRemoveProduct} product={product} onAddToCart={onAddToCart} />
        
            </div>
            )
            }
        </section>
    )
}