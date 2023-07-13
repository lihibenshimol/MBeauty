import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function ProductPreview({ product, onRemoveProduct }) {

    const isAdmin = useSelector((storeState) => storeState.adminModule.admin)


    return (
        <>
            <div>
                <h1>{product.name.english}</h1>
                <h5>{product.name.hebrew}</h5>
            </div>

            <div className="img-container">
                <Link to={`/product/${product._id}`}><img src={product.img} alt="" /></Link>
            </div>
            <p className="price">{product.price}₪</p>
            <span className="product-btns">

                <button className="btn" onClick={() => { onRemoveProduct(product._id) }}>x</button>
            </span>
        </>
    )
}