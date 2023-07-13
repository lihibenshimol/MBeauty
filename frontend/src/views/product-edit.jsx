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
                navigate('/product')
            })
    }

    function onSaveProduct(ev) {
    // ev.preventDefault()
        saveProduct(productToEdit)
            .then((product) => {
                showSuccessMsg('product saved!')
                navigate(`/product/${productId}`)
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save product')
                navigate('/product')
            })
    }


    const EditSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required')
    })


    function handleChange({ target }) {
        let { value, checked, type, name: field } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value
        setProductToEdit((prevProduct) => ({ ...prevProduct, [field]: value }))
    }
    return (
        <section className="product-edit">
            <Formik className="formik"
                initialValues={{
                    name: productToEdit.name,
                    price: productToEdit.price,
                    label: productToEdit.labels,
                    inStock: productToEdit.inStock
                }}
                validationSchema={EditSchema}
                onSubmit={onSaveProduct}
                enableReinitialize
            >

                {({ errors, touched }) => (

                    <Form>
                        <label htmlFor="name">Name: </label>
                        <Field
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter name..."
                            value={productToEdit.name}
                            onChange={handleChange}
                        />
                        {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                        ) : null}

                        <label htmlFor="labels">Labels: </label>
                        <Field
                            type="text"
                            name="labels"
                            id="labels"
                            placeholder="Enter comma seperated labels..."
                            value={productToEdit.labels}
                            onChange={handleChange}
                        />
                        {errors.label && touched.label ? (
                            <div>{errors.label}</div>
                        ) : null}

                        <label htmlFor="price">Price: </label>
                        <Field
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Enter price"
                            value={productToEdit.price}
                            onChange={handleChange}
                        />
                        {errors.price && touched.price ? (
                            <div>{errors.price}</div>
                        ) : null}

                        <label htmlFor="stock">In stock </label>
                        <Field
                            type="checkbox"
                            name="inStock"
                            id="stock"
                            onChange={handleChange}
                        />
                        {errors.inStock && touched.inStock ? (
                            <div>{errors.inStock}</div>
                        ) : null}

                        <div className="actions">
                            <button type="submit" >{productToEdit._id ? 'Save' : 'Add'}</button>
                            <Link to="/product">Cancel</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </section >
    )

    // function onSaveProduct(ev) {
    //     ev.preventDefault()
    //     saveProduct(productToEdit)
    //         .then((product) => {
    //             console.log('product saved', product);
    //             showSuccessMsg('product saved!')
    //             navigate('/product')
    //         })
    //         .catch(err => {
    //             console.log('err', err)
    //             showErrorMsg('Cannot save product')
    //             navigate('/product')
    //         })
    // }


    // return (
    //     <section className="product-edit">
    //         <h2>{productToEdit.id ? 'Edit this product' : 'Add a new product'}</h2>


    //         <form className="flex" onSubmit={onSaveProduct}>
    //             <label htmlFor="name">Name: </label>
    //             <input type="text"
    //                 name="name"
    //                 id="name"
    //                 placeholder="Enter name..."
    //                 value={productToEdit.name}
    //                 onChange={handleChange}
    //             />

    //             <label htmlFor="labels">Labels: </label>
    //             <input type="text"
    //                 name="labels"
    //                 id="labels"
    //                 placeholder="Enter comma seperated labels..."
    //                 value={productToEdit.labels}
    //                 onChange={handleChange}
    //             />

    //             <label htmlFor="price">Price: </label>
    //             <input type="number"
    //                 name="price"
    //                 id="price"
    //                 placeholder="Enter price"
    //                 value={productToEdit.price}
    //                 onChange={handleChange}
    //             />
    //             <label htmlFor="stock">In stock: </label>
    //             <input
    //                 type="checkbox"
    //                 checked={productToEdit.inStock}
    //                 name="inStock"
    //                 id="stock"
    //                 onChange={handleChange}
    //             />

    //             <div>
    //                 <button>{productToEdit._id ? 'Save' : 'Add'}</button>
    //                 <Link to="/product">Cancel</Link>
    //             </div>
    //         </form>
    //     </section>
    // )
}