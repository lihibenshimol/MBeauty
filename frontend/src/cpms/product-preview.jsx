import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsBasket } from "react-icons/bs"

export function ProductPreview({ product, onRemoveProduct, onAddToCart }) {

    const isAdmin = useSelector((storeState) => storeState.userModule.user)


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

                <button className="add-to-bag-btn" onClick={() => { onAddToCart(product) }}>
                    <span><BsBasket /></span> הוסף לסל
                </button>

                {isAdmin && <span className="product-btns">
                    <button className="btn" onClick={() => { onRemoveProduct(product._id) }}>x</button>
                </span>}

        </>
    )
}