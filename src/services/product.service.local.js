
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

    // if(!products || !products.length){

    // }

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
    vendor: 'מיקסר 12 ערוצים עם MP3 כולל מסך',
    href: '#',
    price: 256,
    description: 'מיקסר 12 ערוצים ,אפקטים ונגן mp3 כולל מסך',
    options: '8 colors',
    imageSrc: 'https://artstudio.co.il/image/cache/data/product/SOUND/Mixers/KT-M1202-2-1000X1000-1000x1000.jpg',
    imageAlt: 'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
}

const prd2 = {
    vendor: 'מיקסר 10 מונו + 2 סטריאו',
    href: '#',
    price: 312,
    description: '10 ערוצי מונו + 2 ערוצי סטריאו',
    options: 'שחור',
    imageSrc: 'https://artstudio.co.il/image/cache/data/product/SOUND/Mixers/T122-FX-1000x1000.jpg',
    imageAlt: 'Front of plain black t-shirt.',
}

const prd3 = {
    vendor: 'גיטרה אקוסטית מוגברת שמאלית',
    href: '#',
    price: 208,
    description: 'ל AG460CEQ  יש את כל המאפיינים שעושים את גיטרות Walden נוחות לנגינה ונפלאות להאזנה. גיטרה יציבה ומאוזנת, בעלת צליל בהיר וחד.',
    options: 'שחור',
    imageSrc: 'https://artstudio.co.il/image/cache/data/product/Musical_instruments/Guitars/Acoustic_guitars/G460-LH-CEQ-1000x1000.jpg',
    imageAlt: 'Front of plain black t-shirt.',
}
const prd4 = {
    vendor: 'אורגן / סינטיסייזר קלידים',
    href: '#',
    price: 168,
    description: 'אורגן 5 אוקטבות KURZWEIL KP200',
    options: 'שחור',
    imageSrc: 'https://artstudio.co.il/image/cache/data/Musical_instruments/Keyboards/KP200-1000x1000.jpg',
    imageAlt: 'Front of plain black t-shirt.',
}

// https://artstudio.co.il/image/cache/data/Musical_instruments/Keyboards/KP200-1000x1000.jpg

// TEST DATA
// ; (async () => {
//     await storageService.post(STORAGE_KEY, { ...prd1})
//     await storageService.post(STORAGE_KEY, { ...prd2})
//     await storageService.post(STORAGE_KEY, { ...prd3})
//     await storageService.post(STORAGE_KEY, { ...prd4})
// })()


