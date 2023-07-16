import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { ProductList } from "../cpms/product-list.jsx"
import { addToCart, loadProducts, removeProduct } from "../store/product-action.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { productService } from "../services/product-service.js";
import { ProductFilter } from "../cpms/product-filter.jsx";


export function ProductIndex() {
    const products = useSelector((storeState) => storeState.productModule.products)
    const [filterByToEdit, setFilterByToEdit] = useState(productService.getDefaultFilter())
    const elInputRef = useRef(null)


    useEffect(() => {
        onLoadProducts()
    }, [])

    function onLoadProducts(filterBy) {
        loadProducts(filterBy)
            .then(() => {
                // showSuccessMsg('Cars loaded')
            })
            .catch(err => {
                // showErrorMsg('Cannot load cars')
                console.log('err = ', err)
            })
    }

    function onRemoveProduct(productId) {
        removeProduct(productId)
            .then(() => {
                showSuccessMsg('product removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove product')
            })
    }


    function onSetFilter(filterBy) {
        onLoadProducts(filterBy)
    }

    function onAddToCart(product) {
        console.log(`Adding ${product.name.hebrew} to Cart`)
        addToCart(product)
        showSuccessMsg('Added to Cart')
    }


    return (


        <section className="product-index">
            <ProductFilter onSetFilter={onSetFilter} />

            <ProductList products={products} onRemoveProduct={onRemoveProduct} onAddToCart={onAddToCart} />

        </section>
    )
}