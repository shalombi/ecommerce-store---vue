
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


const prd1 = {
    //   id: 1,
    //   name: 'Basic Tee 8-Pack',

    vendor: 'Basic Tee 8-Pack',
    href: '#',
    price: '$256',
    description: 'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    options: '8 colors',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
    imageAlt: 'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
}

const prd2 = {
    //   id: 2,
    //   name: 'Basic Tee',

    vendor: 'Basic Tee',
    href: '#',
    price: '$32',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
}


// TEST DATA
// ; (async () => {
//     await storageService.post(STORAGE_KEY, { ...prd1})
//     await storageService.post(STORAGE_KEY, { ...prd2})
// })()


