
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { favoriteService } from './favorite.service.local.js'

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


async function query(filterBy = { vendor: '', minPrice: 0, maxPrice: Infinity, valueOption: '' }) {
    var products = await storageService.query(STORAGE_KEY)


    if (filterBy.productType === 'byFavorite') {
        console.log('byFavorite...')
        const favorites = await favoriteService.query() //favorites = [ {_id:1,value'1'} ]
        products = products.filter((product) => {
            return favorites.some((favorite) => product._id === favorite._id)
        })
        console.log('products:', products)
        return products
    }



    // 
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
        if (filterBy.minPrice > 0 && filterBy.minPrice) products = products.filter(product => (product.price > filterBy.minPrice))
        if (filterBy.maxPrice < Infinity && filterBy.maxPrice) products = products.filter(product => (product.price < filterBy.maxPrice))
    }

    if (filterBy.productType && filterBy.productType !== 'all') {
        console.log(filterBy.productType)
        // console.log(filterBy.productType)
        products = products.filter(product => (product.productType === filterBy.productType))
    }
    if (filterBy.productType === 'all') {
        console.log(filterBy.productType)
        // console.log(filterBy.productType)
        products = products.filter(product => (product))
    }

    if (filterBy.valueOption) {


        if (filterBy.valueOption === 'lowToHigh') {
            console.log(filterBy.valueOption)
            products = products.sort(function (a, b) {
                return a.price - b.price;
            })
        }

        else if (filterBy.valueOption === 'highToLow') {
            console.log(filterBy.valueOption)

            products = products.sort(function (a, b) {
                return b.price - a.price;
            })
        }


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
        ...defaultPrd
    }
}


const defaultPrd = {
    vendor: 'Instruction-' + (Date.now() % 1000),
    productType: '',
    href: '#',
    price: utilService.getRandomIntInclusive(1000, 9000),
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

const prd1 = {
    vendor: 'מיקסר 12 ערוצים עם MP3 כולל מסך',
    productType: 'amplification',
    href: '#',
    price: 256,
    isInFavorites: false,
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
    productType: 'amplification',
    href: '#',
    price: 312,
    description: '10 ערוצי מונו + 2 ערוצי סטריאו',
    options: 'שחור',
    isInFavorites: false,



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
    productType: 'guitar',

    href: '#',
    price: 208,
    description: 'ל AG460CEQ  יש את כל המאפיינים שעושים את גיטרות Walden נוחות לנגינה ונפלאות להאזנה. גיטרה יציבה ומאוזנת, בעלת צליל בהיר וחד.',
    options: 'שחור',
    isInFavorites: false,
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
    productType: 'organ',

    href: '#',
    price: 168,
    description: 'אורגן 5 אוקטבות KURZWEIL KP200',
    options: 'שחור',
    isInFavorites: false,
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


