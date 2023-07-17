import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { SET_ADMIN } from "../store/admin-reducer";
import { logout } from "../store/admin-action";
import { BsBasket } from 'react-icons/bs'
import { TOGGLE_CART_SHOWN } from "../store/product-reducer";
import { toggleCartShown } from "../store/product-action";



export function AppHeader() {

    const admin = useSelector((storeState => storeState.adminModule.admin))
    const shoppingCart = useSelector((storeState => storeState.productModule.shoppingCart))
    const isCartShown = useSelector((storeState => storeState.productModule.isCartShown))
    const dispatch = useDispatch()

    function onLogout() {
        logout()
            .then(() => {
                console.log('out');
                <Link to={`/`}></Link>
            })
    }

    return (
        <section className="app-header main-layout full">
            <div className="left-side-nav">

                {admin && <div>

                    <div>
                        {admin.fullname} ,היי
                    </div>
                    <div onClick={logout} className="logout-btn"
                    >התנתק
                    </div>

                </div>
                }

                <div onClick={toggleCartShown}>
                    <BsBasket /> הסל שלי
                </div>

            </div>

            <nav>
                <NavLink to="/">דף הבית</NavLink> |
                <NavLink to="/about">עלינו</NavLink>|
                {/* <NavLink to="/dashboard">Dashboard</NavLink>| */}
                <NavLink to="/store">חנות</NavLink> |
                <NavLink to="/contact">יצירת קשר</NavLink>
                {admin && <NavLink to="/admin-only">| עמוד מנהל</NavLink>}
            </nav>

        </section>
    )
}