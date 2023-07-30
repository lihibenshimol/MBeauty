
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