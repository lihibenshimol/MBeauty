
import { storageService } from './async-storage.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const TOYS_KEY = 'productDB'
const BASE_URL = 'product/'

_createProducts()
export const productService = {
    query,
    get,
    save,
    remove,
    getEmptyProduct,
    getDefaultFilter
}

function query(filterBy = getDefaultFilter()) {
    const queryParams = `?name=${filterBy.name}&inStock=${filterBy.inStock}&labels=${filterBy.labels}&sortBy=${filterBy.sortBy}`

    return httpService.get(BASE_URL + queryParams)
}

function get(productId) {
    return httpService.get(BASE_URL + productId)
}

function remove(productId) {
    return httpService.delete(BASE_URL + productId)
}

function save(product) {
    if (product._id) {
        return httpService.put(BASE_URL, product)
    } else {
        // product.owner = userService.getLoggedinUser()
        return httpService.post(BASE_URL, product)
    }
}

function getDefaultFilter() {
    return { name: '', inStock: '', labels: '', sortBy: '' }
}

function getEmptyProduct() {
    return {
        name: {
            english:"",
            hebrew:""
        },
        price: 0,
        labels: [],
        inStock: true,
    }

}

function _createProducts() {

    let products = utilService.loadFromStorage(TOYS_KEY)

    if (!products || !products.length) {
        products = [
            {
                "_id": "t102",
                "name": "Remote Control product",
                "price": 35,
                "labels": ["product", "remote Control", "product"],
                "createdAt": 1630031801011,
                "inStock": true,
                "img": "https://m.media-amazon.com/images/I/61beNMz9m2L._SX522_.jpg"
            },
            {
                "_id": "t103",
                "name": "Plush Bear",
                "price": 20,
                "labels": ["bear", "plush", "animal", "product"],
                "createdAt": 1632031801011,
                "inStock": false,
                "img": 'https://m.media-amazon.com/images/I/A19hGHNgxIL._AC_UL320_.jpg'
            },

            {
                "_id": "t104",
                "name": "Lego Set",
                "price": 50,
                "labels": ["lego", "building", "product"],
                "createdAt": 1634031801011,
                "inStock": true,
                "img": 'https://m.media-amazon.com/images/I/91SXHJRqWqL._AC_UL320_.jpg'
            },

            {
                "_id": "t105",
                "name": "Barbie Doll",
                "price": 25,
                "labels": ["doll", "barbie", "product"],
                "createdAt": 1636031801011,
                "inStock": false,
                "img": 'https://m.media-amazon.com/images/I/71I73zqSTUL._AC_UL320_.jpg'
            },

            {
                "_id": "t106",
                "name": "Puzzle",
                "price": 15,
                "labels": ["puzzle", "brain", "product"],
                "createdAt": 1638031801011,
                "inStock": true,
                "img": 'https://m.media-amazon.com/images/I/71dwQd5GFxL._AC_UL320_.jpg'
            },

            {
                "_id": "t107",
                "name": "Play Doh Set",
                "price": 10,
                "labels": ["play Doh", "modeling", "product"],
                "createdAt": 1640031801011,
                "inStock": false,
                "img": 'https://m.media-amazon.com/images/I/61BIImbsDjL._AC_UL320_.jpg'
            },

            {
                "_id": "t108",
                "name": "Product Train Set",
                "price": 40,
                "labels": ["train", "product", "transportation"],
                "createdAt": 1642031801011,
                "inStock": true,
                "img": 'https://m.media-amazon.com/images/I/71solFXN5kL._AC_UL320_.jpg'
            },

            {
                "_id": "t109",
                "name": "Stuffed Animal",
                "price": 15,
                "labels": ["animal", "stuffed", "product"],
                "createdAt": 1644021801011,
                "inStock": false,
                "img": 'https://m.media-amazon.com/images/I/91nulAqc2GL._AC_UL320_.jpg'
            },

            {
                "_id": "t110",
                "name": "Action Figure",
                "price": 20,
                "labels": ["action", "figure", "product"],
                "createdAt": 1646031801011,
                "inStock": true,
                "img": 'https://m.media-amazon.com/images/I/71-Y39zGezL._AC_UL320_.jpg'
            },

            {
                "_id": "t111",
                "name": "Board Game",
                "price": 30,
                "labels": ["board", "game", "product"],
                "createdAt": 1648031801011,
                "inStock": false,
                "img": 'https://m.media-amazon.com/images/I/71JkOEG+29L._AC_UL320_.jpg'
            }
        ]
    }

    utilService.saveToStorage(TOYS_KEY, products)

}