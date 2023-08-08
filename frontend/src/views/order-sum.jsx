
<<<<<<< HEAD
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { REMOVE_FROM_CART } from '../store/product-reducer'
import { RxCross1 } from 'react-icons/rx'
=======
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { REMOVE_FROM_CART } from '../store/product-reducer'
>>>>>>> 77aaa366d4ce08215273186d154411b409b97fe1




export function OrderSum() {

    const cart = useSelector((storeState) => storeState.productModule.shoppingCart)
    const Navigate = useNavigate()
    const dispatch = useDispatch()
<<<<<<< HEAD
    const [selectedShipping, setSelectedShipping] = useState('homeDelivery');
    const shippingOptions = {
        homeDelivery: { name: 'משלוח עד הבית', price: 29.90 },
        selfPickup: { name: 'איסוף עצמי', price: 0.00 },
    };
    const selectedShippingOption = shippingOptions[selectedShipping];

    const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const total = subtotal + selectedShippingOption.price;

    const getCartTotal = (amount) => {
        return amount.toLocaleString('he-IL', { style: 'currency', currency: 'ILS' });
    };


    const handleShippingOptionChange = (option) => {
        setSelectedShipping(option);
    };

    return (
        <>
            <section className='order-sum main-layout'>
                <div className="cart-products">
                    <ul className="cart-list">
                        {cart.map((item, index) => (
                            <li key={index} className="cart-item">

                                <span className="img-info-container">

                                    <div className="cart-prod-img">
                                        <img src={item.product.img} alt="" />
                                    </div>
                                    <div className="cart-prod-info">
                                        <h2>{item.product.name.hebrew}</h2>
                                        <h4>{item.product.name.english}</h4>
                                    </div>
                                </span>
                                <span>
                                    <div className="cart-total-price">
                                        <h4>{item.product.price * item.quantity}₪</h4>
                                    </div>
                                    <div className="cart-prod-quantity">
                                        {item.quantity > 1 ? `X${item.quantity}` : 'X1'}
                                    </div>
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className="summery">
                        <h3>סכום ביניים: {getCartTotal(subtotal)}</h3>

                        <div className="shipping-options">
                            <h3>אפשרויות משלוח:</h3>
                            {Object.keys(shippingOptions).map((option) => (
                                <label key={option} className="shipping-option">
                                    <input
                                        type="radio"
                                        name="shippingOption"
                                        value={option}
                                        checked={selectedShipping === option}
                                        onChange={() => handleShippingOptionChange(option)}
                                    />
                                    {shippingOptions[option].name} - {shippingOptions[option].price.toFixed(2)}₪
                                </label>
                            ))}
                        </div>

                        <h2>סכום לתשלום: {getCartTotal(total)}</h2>
                    </div>
                </div>


            </section>
        </>
    )

}
=======



    function removeFromCart(productId, ev) {
        console.log(`Todo: remove: ${productId} from cart`)
        ev.stopPropagation()
        dispatch({ type: REMOVE_FROM_CART, productId })
    }


    return (
        <>

            <h1>I'm the order summery</h1>

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



        </>
    )
}
>>>>>>> 77aaa366d4ce08215273186d154411b409b97fe1
