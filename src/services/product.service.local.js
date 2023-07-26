
import { storageService } from './async-storage.service.js'
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
    var products = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        products = products.filter(product => regex.test(product.vendor) || regex.test(product.description))
    }
    if (filterBy.price) {
        products = products.filter(product => product.price <= filterBy.price)
    }
    return products
}

function getById(productId) {
    return storageService.get(STORAGE_KEY, productId)
}

async function remove(productId) {
    await storageService.remove(STORAGE_KEY, productId)
}

async function save(product) {
    var savedProduct
    if (product._id) {
        savedProduct = await storageService.put(STORAGE_KEY, product)
    } else {
        // Later, owner is set by the backend
        product.owner = userService.getLoggedinUser()
        savedProduct = await storageService.post(STORAGE_KEY, product)
    }
    return savedProduct
}

async function addProductMsg(productId, txt) {
    // Later, this is all done by the backend
    const product = await getById(productId)
    if (!product.msgs) product.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    product.msgs.push(msg)
    await storageService.put(STORAGE_KEY, product)

    return msg
}

function getEmptyProduct() {
    return {
        vendor: 'Instruction-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        
    }
}


// TEST DATA
// ; (async () => {
//     await storageService.post(STORAGE_KEY, { vendor: 'Subali Karov 1', price: 180 })
//     await storageService.post(STORAGE_KEY, { vendor: 'Subali Rahok 2', price: 240 })
// })()