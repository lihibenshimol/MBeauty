import { useEffect } from "react"
import { useSelector } from "react-redux"
import { ProductList } from "../cpms/product-list.jsx"
import { loadProducts, removeProduct } from "../store/product-action.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";


export function ProductIndex() {
    const products = useSelector((storeState) => storeState.productModule.products)

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


    return (
        <section className="product-index">

            <div className="serach-bar">
                <input type="text" placeholder="חפשי מוצר..." />
            </div>

            <ProductList products={products} onRemoveProduct={onRemoveProduct} />
            {/* <SideBar onSetFilter={onSetFilter} /> */}

        </section>
    )
}