import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { productService } from "../services/product-service.js"
import { showErrorMsg } from "../services/event-bus.service.js"



export function ProductDetails() {
    const [product, setProduct] = useState(null)
    const { productId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadProduct()
    }, [productId])

    function loadProduct() {
        productService.get(productId)
            .then((product) => setProduct(product))
            .catch((err) => {
                console.log('Had issues in product details', err)
                showErrorMsg('Cannot load product')
                navigate('/product')
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
        <section className="product-details">
            <div className="a">
                <img src={product.img} style={{ width: 300 }} />
                <span className="links">
                    <Link to={`/product`}>Go back</Link>
                    <Link to={`/product/edit/${product._id}`}>Edit</Link>
                </span>
            </div>
            <div className="content">
                <span>
                    <h1>{product.name}</h1>
                    <p>Product Price: ${product.price}</p>
                    <p>Imported at: {getImportDate(product.createdAt)}</p>
                    <p>Categories: {product.labels.join(', ')}</p>
                </span>
                <span>
                    <p className={product.inStock ? 'in-stock' : 'out-stock'}>{product.inStock ? 'Available' : 'Out Of Stock'}</p>
                </span>
            </div>


        </section>
    )
}