import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { SET_ADMIN } from "../store/admin-reducer";
import { logout } from "../store/admin-action";
import { BsBasket } from 'react-icons/bs'
import { TOGGLE_CART_SHOWN } from "../store/product-reducer";
import { toggleCartShown } from "../store/product-action";
import { ShoppingCart } from "./shopping-cart";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai"



export function AppHeader() {

    const admin = useSelector((storeState => storeState.adminModule.admin))
    const isCartShown = useSelector((storeState => storeState.productModule.isCartShown))
    const cart = useSelector((storeState) => storeState.productModule.shoppingCart)
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

    const dispatch = useDispatch()


    useEffect(() => {
        cartBadge()
    }, [cart])

    function onLogout() {
        logout()
            .then(() => {
                console.log('out');
                <Link to={`/`}></Link>
            })
    }

    function getCartTotal() {
        return cart.reduce((acc, product) => acc + product.price, 0)
    }


    function cartBadge() {
        // Calculate the total count of items in the cart
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    return (
        <section className="app-header main-layout full">
            <div className="left-side-nav animate__animated animate__slideInLeft">

                {admin && <div className="admin-name">

                    <div onClick={logout} className="logout-btn"
                    >Logout
                    </div>
                    {admin.fullname} ,היי

                </div>
                }

                <div className="my-cart" onClick={toggleCartShown}>
                    <BsBasket />
                    <div className={`prod-in-cart ${cart.length > 0 ? '' : 'false'}`}> {cartBadge()}</div>
                </div>
                {<ShoppingCart cart={cart} dispatch={dispatch} getCartTotal={getCartTotal} isCartShown={isCartShown} />}

            </div>
            <div className={` animate__animated animate__slideInRight menu ${mobileMenuIsOpen ? 'open' : ''}`}>

                <article className="menu-icon" onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}><AiOutlineMenu /></article>

                <nav>
                    <NavLink to="/">דף הבית</NavLink>
                    <NavLink to="/about">עלינו</NavLink>
                    {/* <NavLink to="/dashboard">Dashboard</NavLink>| */}
                    <NavLink to="/store">חנות</NavLink>
                    <NavLink to="/contact">יצירת קשר</NavLink>
                    {admin && <NavLink to="/admin-page"> עמוד מנהל</NavLink>}
                </nav>



            </div>

        </section>
    )
}