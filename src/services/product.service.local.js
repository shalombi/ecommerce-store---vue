
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


async function query(filterBy = { vendor: '', minPrice: 0, maxPrice: Infinity }) {
    var products = await storageService.query(STORAGE_KEY)

    // if(!products || !products.length){

    // }

    if (filterBy.vendor) {
        const regex = new RegExp(filterBy.vendor, 'i')
        products = products.filter(product => regex.test(product.vendor) || regex.test(product.description))
    }

    // הקוד לא עובד! תייצר לי פילטר שיעשה פילטר לדברים הבאים : 
    // filterBy.categories = ['white']
    // products  = [{...product,categories:['White','Green']}  ]

    // if (filterBy?.categories?.length > 0) {
    //         for (let i = 0; i < filterBy.categories.length; i++) {
    //             const regex = new RegExp(filterBy.categories[i], 'i')
    //             products += products.filter(product => regex.test(product.categories))
    //         }
    //     }


    console.log('products:', products)

    console.log(filterBy)
    // debugger

    if (filterBy.minPrice > 0 || filterBy.maxPrice < Infinity) {
        console.log('[[[')
        products = products.filter(product => (product.price > filterBy.minPrice) && (product.price <= filterBy.maxPrice))
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
    // description: 'מיקסר 12 ערוצים ,אפקטים ונגן mp3 כולל מסך',
    options: '8 colors',
    // imageSrc: 'https://artstudio.co.il/image/cache/data/product/SOUND/Mixers/KT-M1202-2-1000X1000-1000x1000.jpg',
    images: [
        {
            id: 1,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        {
            id: 2,
            name: 'Angled view',
            src: 'https://wtailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
    ],
    colors: [
        { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
        { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
        { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    ],

    //     description: `
    // <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    // `,

    details: [
        {
            name: 'Features',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
        },
        // More sections...
    ],
    imageAlt: 'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',

    categories: ['green']
}

const prd2 = {
    vendor: 'מיקסר 10 מונו + 2 סטריאו',
    href: '#',
    price: 312,
    description: '10 ערוצי מונו + 2 ערוצי סטריאו',
    options: 'שחור',


    // imageSrc: 'https://artstudio.co.il/image/cache/data/product/SOUND/Mixers/T122-FX-1000x1000.jpg',
    images: [
        {
            id: 1,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        {
            id: 2,
            name: 'Angled view',
            src: 'https://wtailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
    ],
    colors: [
        { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
        { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
        { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    ],

    //     description: `
    // <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    // `,

    details: [
        {
            name: 'Features',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
        },
        // More sections...
    ],
    imageAlt: 'Front of plain black t-shirt.',
    categories: ['white']

}

const prd3 = {
    vendor: 'גיטרה אקוסטית מוגברת שמאלית',
    href: '#',
    price: 208,
    description: 'ל AG460CEQ  יש את כל המאפיינים שעושים את גיטרות Walden נוחות לנגינה ונפלאות להאזנה. גיטרה יציבה ומאוזנת, בעלת צליל בהיר וחד.',
    options: 'שחור',
    // imageSrc: 'https://artstudio.co.il/image/cache/data/product/Musical_instruments/Guitars/Acoustic_guitars/G460-LH-CEQ-1000x1000.jpg',
    images: [
        {
            id: 1,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        {
            id: 2,
            name: 'Angled view',
            src: 'https://wtailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
    ],
    colors: [
        { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
        { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
        { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    ],

    //     description: `
    //     <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    //   `,

    details: [
        {
            name: 'Features',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
        },
        // More sections...
    ],
    categories: [],
    imageAlt: 'Front of plain black t-shirt.',
}
const prd4 = {
    vendor: 'אורגן / סינטיסייזר קלידים',
    href: '#',
    price: 168,
    description: 'אורגן 5 אוקטבות KURZWEIL KP200',
    options: 'שחור',
    // imageSrc: 'https://artstudio.co.il/image/cache/data/Musical_instruments/Keyboards/KP200-1000x1000.jpg',

    images: [
        {
            id: 1,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        {
            id: 2,
            name: 'Angled view',
            src: 'https://wtailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
    ],
    categories: [],
    imageAlt: 'Front of plain black t-shirt.',
    colors: [
        { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
        { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
        { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    ],

    //     description: `
    // <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    // `,

    details: [
        {
            name: 'Features',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
        },
        // More sections...
    ],
}


// TEST DATA
// ; (async () => {
//     await storageService.post(STORAGE_KEY, { ...prd1})
//     await storageService.post(STORAGE_KEY, { ...prd2})
//     await storageService.post(STORAGE_KEY, { ...prd3})
//     await storageService.post(STORAGE_KEY, { ...prd4})
// })()


