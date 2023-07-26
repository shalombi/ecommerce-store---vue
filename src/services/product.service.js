
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'product'

export const productService = {
    query,
    getById,
    save,
    remove,
    getEmptyProduct,
    addProductMsg
}
window.cs = productService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)

    // var products = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     products = products.filter(product => regex.test(product.vendor) || regex.test(product.description))
    // }
    // if (filterBy.price) {
    //     products = products.filter(product => product.price <= filterBy.price)
    // }
    // return products

}
function getById(productId) {
    // return storageService.get(STORAGE_KEY, productId)
    return httpService.get(`product/${productId}`)
}

async function remove(productId) {
    // await storageService.remove(STORAGE_KEY, productId)
    return httpService.delete(`product/${productId}`)
}
async function save(product) {
    var savedProduct
    if (product._id) {
        // savedProduct = await storageService.put(STORAGE_KEY, product)
        savedProduct = await httpService.put(`product/${product._id}`, product)

    } else {
        // Later, owner is set by the backend
        product.owner = userService.getLoggedinUser()
        // savedProduct = await storageService.post(STORAGE_KEY, product)
        savedProduct = await httpService.post('product', product)
    }
    return savedProduct
}

async function addProductMsg(productId, txt) {
    const savedMsg = await httpService.post(`product/${productId}/msg`, { txt })
    return savedMsg
}


function getEmptyProduct() {
    return {
        vendor: 'Instruction-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





