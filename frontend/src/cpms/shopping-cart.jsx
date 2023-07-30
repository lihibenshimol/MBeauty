import { useSelector } from "react-redux";
import { removeFromCart, toggleCartShown } from "../store/product-action";
import { REMOVE_FROM_CART } from "../store/product-reducer";
import { productService } from "../services/product-service"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'


export function ShoppingCart({ cart, dispatch, isCartShown, getCartTotal }) {

    const Navigate = useNavigate()

    function removeFromCart(productId, ev) {
        console.log(`Todo: remove: ${productId} from cart`)
        ev.stopPropagation()
        dispatch({ type: REMOVE_FROM_CART, productId })
    }

    function handleNavButtonClick(event, cmp) {
        event.stopPropagation();
        Navigate(cmp)
    }

    return (
        <>
            <div onClick={(event) => toggleCartShown(event)} className={`black-bg ${isCartShown ? 'open' : ''}`}>

                <div className='shopping-cart'>
                    <button className="close" onClick={toggleCartShown}>X</button>
                    {cart.length === 0 ? (
                        <div className="cart-empty"> .לא נמצאו מוצרים בסל הקניות</div>
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
                        </div>

                    )}

                    <div className="chackout">


                        סכום ביניים:  {getCartTotal()}

                        <button onClick={(event) => handleNavButtonClick(event, 'order-sum')} className="show-cart-btn">מעבר לסל הקניות</button>
                        <button onClick={(event) => handleNavButtonClick(event, 'payment')} className="checkout-btn">תשלום</button>


                    </div>

                </div>
            </div>


        </>
    )

}

