import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
<<<<<<< HEAD
import { SET_ADMIN } from "../store/user-reducer";
import { logout } from "../store/user-action";
=======
import { SET_ADMIN } from "../store/admin-reducer";
import { logout } from "../store/admin-action";
>>>>>>> 77aaa366d4ce08215273186d154411b409b97fe1
import { BsBasket } from 'react-icons/bs'
import { TOGGLE_CART_SHOWN } from "../store/product-reducer";
import { toggleCartShown } from "../store/product-action";
import { ShoppingCart } from "./shopping-cart";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai"
import { useMediaQuery } from '@react-hook/media-query';


export function AppHeader() {

<<<<<<< HEAD
    const user = useSelector((storeState => storeState.userModule.user))
=======
    const admin = useSelector((storeState => storeState.adminModule.admin))
>>>>>>> 77aaa366d4ce08215273186d154411b409b97fe1
    const isCartShown = useSelector((storeState => storeState.productModule.isCartShown))
    const cart = useSelector((storeState) => storeState.productModule.shoppingCart)
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
    const isMobile = useMediaQuery('(max-width: 1100px)')

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
        const total = cart.reduce((accumulator, item) => accumulator + item.product.price * item.quantity, 0);
        return total.toLocaleString('he-IL', { style: 'currency', currency: 'ILS' });
    }

    function cartBadge() {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    return (
        <section className="app-header main-layout full">
            <div className="left-side-nav animate__animated animate__slideInLeft">
<<<<<<< HEAD

                {user && <div className="user-name">

                    <div onClick={logout} className="logout-btn">
                        Logout
                    </div>
                    {user.fullname} ,היי

=======

                {admin && <div className="admin-name">

                    <div onClick={logout} className="logout-btn">
                        Logout
                    </div>
                    {admin.fullname} ,היי

>>>>>>> 77aaa366d4ce08215273186d154411b409b97fe1
                </div>
                }

                <div className="my-cart" onClick={toggleCartShown}>
                    <span className="basket-icon">
                        <BsBasket />
                    </span>
                    <span className="basket-total">
                        {getCartTotal()}
                    </span>
                    <div className={`prod-in-cart ${cart.length > 0 ? '' : 'false'}`}> {cartBadge()}</div>
                </div>
                {<ShoppingCart cart={cart} dispatch={dispatch} getCartTotal={getCartTotal} isCartShown={isCartShown} />}
<<<<<<< HEAD
            </div>
            <div className={` animate__animated animate__slideInRight menu ${mobileMenuIsOpen ? 'open' : ''}`}>

                <article className="menu-icon" onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}><AiOutlineMenu /></article>

                <nav onClick={() => (isMobile ? setMobileMenuIsOpen(!mobileMenuIsOpen) : null)}>
                    {/* <nav onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}> */}
                    {/* <nav> */}
                    <NavLink to="/">דף הבית</NavLink>
                    <NavLink to="/about">עלינו</NavLink>
                    <NavLink to="/treatment">הטיפולים בקליניקה</NavLink>
                    {/* <NavLink to="/dashboard">Dashboard</NavLink>| */}
                    <NavLink to="/store">חנות</NavLink>
                    <NavLink to="/contact">יצירת קשר</NavLink>
                    {user && <NavLink to="/user-page"> עמוד מנהל</NavLink>}
                </nav>



            </div>
=======

            </div>
            <div className={` animate__animated animate__slideInRight menu ${mobileMenuIsOpen ? 'open' : ''}`}>

                <article className="menu-icon" onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}><AiOutlineMenu /></article>

                <nav onClick={() => (isMobile ? setMobileMenuIsOpen(!mobileMenuIsOpen) : null)}>
                {/* <nav onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}> */}
                    {/* <nav> */}
                    <NavLink to="/">דף הבית</NavLink>
                    <NavLink to="/about">עלינו</NavLink>
                    <NavLink to="/treatment">הטיפולים בקליניקה</NavLink>
                    {/* <NavLink to="/dashboard">Dashboard</NavLink>| */}
                    <NavLink to="/store">חנות</NavLink>
                    <NavLink to="/contact">יצירת קשר</NavLink>
                    {admin && <NavLink to="/admin-page"> עמוד מנהל</NavLink>}
                </nav>



            </div>
>>>>>>> 77aaa366d4ce08215273186d154411b409b97fe1

        </section>
    )
}