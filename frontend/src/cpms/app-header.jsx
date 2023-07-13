import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { SET_ADMIN } from "../store/admin-reducer";
import { logout } from "../store/admin-action";



export function AppHeader() {

    const admin = useSelector((storeState => storeState.adminModule.admin))
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
            {admin && <div>

                <div>
                    {admin.fullname} ,היי
                </div>
                <div onClick={logout} className="logout-btn"
                >התנתק
                </div>

            </div>
            }

            <nav>
                <NavLink to="/">דף הבית</NavLink> |
                <NavLink to="/about">עלינו</NavLink>|
                {/* <NavLink to="/dashboard">Dashboard</NavLink>| */}
                <NavLink to="/store">חנות</NavLink> |
                <NavLink to="/contact">יצירת קשר</NavLink>
                {admin &&  <NavLink to="/admin-only">| עמוד מנהל</NavLink>}
            </nav>

        </section>
    )
}