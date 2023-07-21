const fs = require('fs');
var products = require('../data/product.json')

console.log('products = ', products.length)

module.exports = {
    query,
    get,
    remove,
    save
}

function query(filterBy) {
    let filteredProducts = products
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i');
        filteredProducts = filteredProducts.filter(product => {
            const englishMatch = regex.test(product.name.english);
            const hebrewMatch = regex.test(product.name.hebrew);
            return englishMatch || hebrewMatch;
        });
    }
    // if (filterBy.name) {
    //     const regex = new RegExp(filterBy.name, 'i')
    //     filteredProducts = filteredProducts.filter(product => regex.test(product.name.english))
    // }

    // if (filterBy.name) {
    //     const regex = new RegExp(filterBy.name, 'i')
    //     filteredProducts = filteredProducts.filter(product => regex.test(product.name.hebrew))
    // }

    if (filterBy.inStock) {
        const isInStock = (filterBy.inStock === 'true') ? true : false
        filteredProducts = filteredProducts.filter(product => product.inStock === isInStock)
    }

    if (filterBy.labels) {
        filteredProducts = filteredProducts.filter(product => {
            return product.labels.some(label => filterBy.labels.includes(label))
        })
    }

    if (filterBy.sortBy === 'name') {
        filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (filterBy.sortBy === 'price-low') {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price)
    }

    if (filterBy.sortBy === 'price-high') {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price)
    }

    // if (filterBy.sortBy === 'created') {
    //     filteredProducts = filteredProducts.sort((a, b) => a.createdAt - b.createdAt)
    // }

    return Promise.resolve(filteredProducts)
}

function get(productId) {
    const product = products.find(product => product._id === productId)
    if (!product) return Promise.reject(' not found')
    return Promise.resolve(product)
}

function remove(productId) {
    const idx = products.findIndex(product => product._id === productId)
    if (idx === -1) return Promise.reject('No Such Product')
    const product = products[idx]
    // if (product.owner._id !== loggedinUser._id) return Promise.reject('Not your Product')
    products.splice(idx, 1)
    return _writeProductsToFile()
}


function save(product) {
    if (product._id) {
        const productToUpdate = products.find(currProduct => currProduct._id === product._id)
        if (!productToUpdate) return Promise.reject('No such Product')
        // if (productToUpdate.owner._id !== loggedinUser._id) return Promise.reject('Not your Product')

        productToUpdate.name = product.name
        productToUpdate.price = product.price
        productToUpdate.inStock = product.inStock
        productToUpdate.labels = product.labels
    } else {
        product._id = _makeId()
        product.createdAt = Date.now()
        const labels = product.labels.split(',')
        product.labels = labels
        // product.owner = loggedinUser
        products.unshift(product)
    }
    return _writeProductsToFile().then(() => product)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


function _writeProductsToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(products, null, 2)
        fs.writeFile('data/product.json', data, (err) => {
            if (err) return rej(err)
            // console.log("File written successfully\n");
            res()
        });
    })
}