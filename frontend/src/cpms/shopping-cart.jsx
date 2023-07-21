import { useSelector } from "react-redux";
import { removeFromCart, toggleCartShown } from "../store/product-action";
import { REMOVE_FROM_CART } from "../store/product-reducer";
import { productService } from "../services/product-service"
import { useEffect, useState } from "react";


export function ShoppingCart({ cart, dispatch }) {

    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const productPromises = Object.keys(cart).map((productId) => productService.get(productId));
    //             const resolvedProducts = await Promise.all(productPromises);
    //             setProducts(resolvedProducts);
    //         } catch (error) {
    //             console.error('Error fetching products: ', error);
    //         }
    //     };

    //     fetchProducts();
    // }, [cart]);


    function removeFromCart(productId) {
        console.log(`Todo: remove: ${productId} from cart`)
        dispatch({ type: REMOVE_FROM_CART, productId })
    }

    function getCartTotal() {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }


    return (
        <>
            <div className="shopping-cart">
                {cart.length === 0 ? (
                    <p>הסל ריק</p>
                ) : (
                    <div className="cart-products">

                        <h1 className="cart-title">הסל שלי</h1>
                        <ul>
                            {cart.map((item, index) => (
                                <li key={index}>
                                    <button className="remove-prod-btn" onClick={() => removeFromCart(item.product._id)}>
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

                    <button className="show-cart-btn">מעבר לסל הקניות</button>
                    <button className="checkout-btn">תשלום</button>


                </div>
            </div>


        </>
    )

}

// export function ShoppingCart({ cart, dispatch }) {

//     const user = userService.getLoggedinUser()

//     function removeFromCart(carId) {
//         console.log(`Todo: remove: ${carId} from cart`)
//         // TODO: use dispatch
//         dispatch({ type: REMOVE_FROM_CART, carId })
//     }

//     function getCartTotal() {
//         return cart.reduce((acc, car) => acc + car.price, 0)
//     }

//     function onCheckout() {
//         const amount = getCartTotal()
//         checkout(-amount)
//             .then(newScore => {
//                 showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
//             })
//     }

//     const total = getCartTotal()
//     return <section className="cart" >
//         <h5>Your Cart</h5>

//         <ul>
//             {
//                 cart.map((car, idx) => <li key={idx}>
//                     <button onClick={() => { removeFromCart(car._id) }}>x</button>
//                     {car.vendor} | ${car.price}
//                 </li>)
//             }
//         </ul>

//         <p>Total: ${total.toLocaleString()} </p>
//         <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
//     </section>

// }