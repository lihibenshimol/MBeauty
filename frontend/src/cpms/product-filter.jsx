import { useEffect, useRef, useState } from "react"
import Select from "react-select"
import makeAnimated from 'react-select/animated'

import { productService } from "../services/product-service.js"
import { utilService } from "../services/util.service.js"


export function ProductFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(productService.getDefaultFilter())

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleMultiChange(ev) {
        const selectedValue = (Array.isArray(ev) ? ev.map(x => x.value) : []);
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: selectedValue }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter.current(filterByToEdit)
    }


    return <section className="product-filter ">

        <form className="search-bar" onSubmit={onSubmitFilter}>


            <select className="sort-select" onChange={handleChange} name="sortBy" id="sortBy">
                <option >הצג לפי</option>
                <option value="price-low">מחיר: מהנמוך לגבוה</option>
                <option value="price-high">מחיר: מהגבוה לנמוך</option>
            </select>

            <input type="text"
                id="name"
                name="name"
                placeholder="חפשי מוצר..."
                value={filterByToEdit.name}
                onChange={handleChange}
                ref={elInputRef}
            />

        </form>

    </section >
}