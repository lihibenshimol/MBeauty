import { useSelector } from "react-redux";
import { removeFromCart, toggleCartShown } from "../store/product-action";
import { REMOVE_FROM_CART } from "../store/product-reducer";
import { productService } from "../services/product-service"
import { useEffect, useState } from "react";


export function ShoppingCart({ cart, dispatch, isCartShown }) {


    function removeFromCart(productId, ev) {
        console.log(`Todo: remove: ${productId} from cart`)
        ev.stopPropagation()
        dispatch({ type: REMOVE_FROM_CART, productId })
    }

    function getCartTotal() {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }

    function handleNavButtonClick(event) {
        event.stopPropagation();


    }

    return (
        <>
            <div onClick={(event) => toggleCartShown(event)} className={`black-bg ${isCartShown ? 'open' : ''}`}>

                <div className='shopping-cart'>
                    {cart.length === 0 ? (
                        <p>הסל ריק</p>
                    ) : (
                        <div className="cart-products">

                            <h1 className="cart-title">הסל שלי</h1>
                            <ul>
                                {cart.map((item, index) => (
                                    <li key={index}>
                                        <button className="remove-prod-btn" onClick={(event) => removeFromCart(item.product._id, event)}>
                                            x
                                        </button>
                                        <div className="cart-prod-quantity">
                                            {item.quantity > 1 ? `X${item.quantity}` : ''}
                                        </div>
                                        <div className="cart-prod-info">
                                            <h4>{item.product.name.english}</h4>
                                            <h2>{item.product.name.hebrew}</h2>
                                            <h4>{item.product.price}₪</h4>
                                        </div>
                                        <div className="cart-prod-img">
                                            <img src={item.product.img} alt="" />
                                        </div>
                                    </li>))}
                            </ul>
                            <button className="close" onClick={toggleCartShown}>X</button>
                        </div>

                    )}

                    <div className="chackout">


                        סכום ביניים:  {getCartTotal()}₪

                        <button onClick={handleNavButtonClick} className="show-cart-btn">מעבר לסל הקניות</button>
                        <button onClick={handleNavButtonClick} className="checkout-btn">תשלום</button>


                    </div>

                </div>
            </div>


        </>
    )

}

