import { useEffect, useRef, useState } from "react"
import Select from "react-select"
import makeAnimated from 'react-select/animated'

import { productService } from "../services/product-service.js"
import { utilService } from "../services/util.service.js"


export function ProductFilter({ onSetFilter}) {
    const [filterByToEdit, setFilterByToEdit] = useState(productService.getDefaultFilter())

    const animatedComponents = makeAnimated();
    const options = [
        { value: 'product', label: 'Product' },
        { value: 'bear', label: 'Bears' },
        { value: 'animal', label: 'Animals' },
        { value: 'doll', label: 'Dolls' },
        { value: 'lego', label: 'Lego' },
        { value: 'puzzle', label: 'Puzzle' },
        { value: 'action', label: 'Action figures' },
        { value: 'adult', label: 'Adults' },
        { value: 'vehicles', label: 'Vehicles' },
        { value: 'board', label: 'Board games' },
        { value: 'thinking', label: 'Thinking games' }
    ]


    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({target}) {
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
        <form onSubmit={onSubmitFilter}>
            <input type="text"
                id="name"
                name="name"
                placeholder="By Name"
                value={filterByToEdit.name}
                onChange={handleChange}
                ref={elInputRef}
            />

            <select className="filter-stock-select" onChange={handleChange} name="inStock" id="inStock">
                <option value="">All</option>
                <option value="true">In stock</option>
                <option value="false">Out of stock</option>
            </select>


            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                onChange={handleMultiChange}
            />

            <select className="sort-select" onChange={handleChange} name="sortBy" id="sortBy">
                <option value="price">Price</option>
                <option value="name">Name</option>
                <option value="created">Import date</option>
            </select>
        </form>

    </section>
}