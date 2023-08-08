import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { productService } from "../services/product-service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { useSelector } from "react-redux"
import { BsBasket } from "react-icons/bs"
import { addToCart } from "../store/product-action.js"



export function ProductDetails() {
    const user = useSelector((storeState => storeState.userModule.user))
    const [product, setProduct] = useState(null)
    const { productId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadProduct()
    }, [productId])

    function loadProduct() {
        console.log('user = ', user)
        productService.get(productId)
            .then((product) => setProduct(product))
            .catch((err) => {
                console.log('Had issues in product details', err)
                showErrorMsg('Cannot load product')
                navigate('/store')
            })
    }

    function getImportDate(timestamp) {
        const date = new Date(timestamp)
        const day = date.getDay()
        const month = date.getMonth()
        const year = date.getFullYear()
        return (`${day + 1}/${month + 1}/${year}`)
    }


    return (product &&
        <section className="product-details ">

            <div className="info">

                <div className="a">
                    <img src={product.img} style={{ width: 300 }} />
                    <span className="links">
                        <Link to={`/store`}>  חזרה לחנות </Link>
                        {user && <Link to={`/product/edit/${product._id}`}>  | עריכת פרטי מוצר </Link>}
                    </span>
                </div>
                <div className="content">
                    <span>
                        <h1>{product.name.english}</h1>
                        <h2>{product.name.hebrew}</h2>
                        <p>{product.desc}</p>
                        <p>מחיר: {product.price}₪</p>
                        <p>קטגוריות: {product.labels.join(', ')}</p>
                    </span>
                    <span>
                        <p className={product.inStock ? 'in-stock' : 'out-stock'}>{product.inStock ? '' : 'לא במלאי'}</p>
                    </span>
                </div>

                <div className="cta-btns">

                    <button className="add-to-bag-btn" onClick={() => { addToCart(product) }}>
                        <span><BsBasket /></span> הוסף לסל
                    </button>

                </div>

            </div>

        </section>
    )
}