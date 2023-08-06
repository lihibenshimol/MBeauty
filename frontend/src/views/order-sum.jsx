
import React from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { REMOVE_FROM_CART } from '../store/product-reducer'




export function OrderSum() {

    const cart = useSelector((storeState) => storeState.productModule.shoppingCart)
    const Navigate = useNavigate()
    const dispatch = useDispatch()



    function removeFromCart(productId, ev) {
        console.log(`Todo: remove: ${productId} from cart`)
        ev.stopPropagation()
        dispatch({ type: REMOVE_FROM_CART, productId })
    }


    return (
        <>
            <section className='order-sum main-layout'>

                <div className="cart-products">
                    {/* <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <button className="remove-prod-btn" onClick={(event) => removeFromCart(item.product._id, event)}>
                                    הסר מהסל
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
                    </ul> */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th className="cart-prod-quantity">Quantity</th>
                                <th className="cart-prod-img">Image</th>
                                <th className="cart-prod-info">Product Name</th>
                                <th className="cart-prod-price">Price (One)</th>
                                <th className="cart-total-price">Total Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <button className="remove-prod-btn" onClick={(event) => removeFromCart(item.product._id, event)}>
                                            הסר מהסל
                                        </button>
                                    </td>
                                    <td className="cart-prod-quantity">
                                        {item.quantity > 1 ? `X${item.quantity}` : ''}
                                    </td>
                                    <td className="cart-prod-img">
                                        <img src={item.product.img} alt="" />
                                    </td>
                                    <td className="cart-prod-info">
                                        <h4>{item.product.name.english}</h4>
                                        <h2>{item.product.name.hebrew}</h2>
                                    </td>
                                    <td className="cart-prod-price">
                                        <h4>{item.product.price}₪</h4>
                                    </td>
                                    <td className="cart-total-price">
                                        <h4>{item.product.price * item.quantity}₪</h4>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </section>
        </>
    )

}
