import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import { productService } from "../services/product-service.js";
import { saveProduct } from "../store/product-action.js";


export function ProductEdit() {
    const { productId } = useParams()
    const [productToEdit, setProductToEdit] = useState(productService.getEmptyProduct())
    const navigate = useNavigate()

    useEffect(() => {
        if (!productId) return
        loadProduct()
    }, [])

    function loadProduct() {
        productService.get(productId)
            .then((product) => setProductToEdit(product))
            .catch((err) => {
                console.log('Had issues in product details', err)
                navigate('/store')
            })
    }

    function onSaveProduct(ev) {
        ev.preventDefault()
        saveProduct(productToEdit)
            .then((product) => {
                showSuccessMsg('product saved!')
                navigate(`/product/${productId}`)
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save product')
                navigate('/store')
            })
    }

    // function handleChange({ target }) {
    //     console.log('productToEdit = ', productToEdit)
    //     let { value, checked, type, name: field } = target
    //     value = type === 'number' ? +value : value
    //     value = type === 'checkbox' ? checked : value
    //     setProductToEdit((prevProduct) => ({ ...prevProduct, [field]: value }))
    // }


    function handleChange({ target }) {
        const { value, checked, type, name: field } = target;
        const updatedValue = type === 'number' ? +value : type === 'checkbox' ? checked : value;

        setProductToEdit((prevProduct) => {
            if (field === 'english' || field === 'hebrew') {
                return {
                    ...prevProduct,
                    name: {
                        ...prevProduct.name,
                        [field]: updatedValue,
                    },
                };
            }

            return {
                ...prevProduct,
                [field]: updatedValue,
            };
        });
    }


    return (
        <section className="product-edit narrow-layout">
            {/* <h2>{productToEdit.id ? 'Edit this product' : 'Add a new product'}</h2> */}


            <form className="flex" onSubmit={onSaveProduct}>
                <label htmlFor="english">שם באנגלית: </label>
                <input type="text"
                    name="english"
                    id="english"
                    placeholder="Enter name..."
                    value={productToEdit.name.english}
                    onChange={handleChange}
                />

                <label htmlFor="hebrew">שם בעברית: </label>
                <input type="text"
                    name="hebrew"
                    id="hebrew"
                    placeholder="Enter name..."
                    value={productToEdit.name.hebrew}
                    onChange={handleChange}
                />

                <label htmlFor="labels">קטגוריות: </label>
                <input type="text"
                    name="labels"
                    id="labels"
                    placeholder="Enter comma seperated labels..."
                    value={productToEdit.labels}
                    onChange={handleChange}
                />

                <label htmlFor="price">מחיר: </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={productToEdit.price}
                    onChange={handleChange}
                />
                <label htmlFor="stock">במלאי: </label>
                <input
                    type="checkbox"
                    checked={productToEdit.inStock}
                    name="inStock"
                    id="stock"
                    onChange={handleChange}
                />

                <div className="actions">
                    <Link to={`/product/${productId}`}>ביטול</Link>
                    <button>{productToEdit._id ? 'שמור' : 'הוסף'}</button>
                </div>
            </form>
        </section>
    )
}