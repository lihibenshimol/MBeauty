// import { Link } from "react-router-dom";
import { ProductPreview } from "./product-preview.jsx";


export function ProductList({ products, onRemoveProduct }) {


    return (
        <section className="product-list main-layout">

            {products.map(product => <div key={product._id} className="product">
                <ProductPreview onRemoveProduct={onRemoveProduct} product={product} />
        
            </div>
            )
            }
        </section>
    )
}