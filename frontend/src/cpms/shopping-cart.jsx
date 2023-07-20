import { useSelector } from "react-redux";
import { removeFromCart, toggleCartShown } from "../store/product-action";
import { REMOVE_FROM_CART } from "../store/product-reducer";
import { productService } from "../services/product-service"
import { useEffect, useState } from "react";


export function ShoppingCart({ cart, dispatch }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productPromises = Object.keys(cart).map((productId) => productService.get(productId));
                const resolvedProducts = await Promise.all(productPromises);
                setProducts(resolvedProducts);
            } catch (error) {
                console.error('Error fetching products: ', error);
            }
        };

        fetchProducts();
    }, [cart]);


    function removeFromCart(productId) {
        console.log(`Todo: remove: ${productId} from cart`)
        dispatch({ type: REMOVE_FROM_CART, productId })
    }

    return (
        <>
            <div className="shopping-cart">
                {products.length === 0 ? (
                    <p>הסל ריק</p>
                ) : (
                    <>
                        <h1 className="cart-title">הסל שלי</h1>
                        <ul>
                            {products.map((product, index) => (
                                <li key={index}>

                                    <button className="remove-prod-btn" onClick={() => removeFromCart(product._id)}>x</button>
                                    <div className="cart-prod-quantity">
                                        {cart[product._id] > 1 ? `X${cart[product._id]}` : ''}
                                    </div>

                                    <div className="cart-prod-img">
                                        <img src={product.img} alt="" />
                                    </div>
                                    <h6>{product.price}₪</h6>

                                    <div className="cart-prod-name">
                                        <h4>{product.name.english} </h4>
                                        <h2>{product.name.hebrew}</h2>
                                    </div>

                                </li>
                            ))}
                        </ul>
                        <button className="close" onClick={toggleCartShown}>X</button>
                    </>
                )}
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