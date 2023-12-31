import { productService } from '../services/product.service.local'

export function getActionRemoveProduct(productId) {
    return {
        type: 'removeProduct',
        productId
    }
}
export function getActionAddProduct(product) {
    return {
        type: 'addProduct',
        product
    }
}
export function getActionUpdateProduct(product) {
    return {
        type: 'updateProduct',
        product
    }
}

export function getActionAddProductMsg(productId) {
    return {
        type: 'addProductMsg',
        productId,
        txt: 'Stam txt'
    }
}

export const productStore = {
    state: {
        products: [],
        filterBy: {
            vendor: '',
            minPrice: 0,
            maxPrice: Infinity,
            productType: '',
            byFavorite:''
        }
    },
    getters: {
        products({ products }) {
            console.log('products from store:', products)
            return products
        },
    },
    mutations: {
        setProducts(state, { products }) {
            state.products = products
        },
        setFilterBy(state, { vendor, minPrice, maxPrice, productType, valueOption,byFavorite }) {
            state.filterBy.vendor = vendor
            state.filterBy.minPrice = minPrice
            state.filterBy.maxPrice = maxPrice
            state.filterBy.productType = productType
            state.filterBy.valueOption = valueOption
            state.filterBy.byFavorite = byFavorite

        },
        addProduct(state, { product }) {
            state.products.push(product)
        },
        updateProduct(state, { product }) {
            const idx = state.products.findIndex(p => p._id === product._id)
            state.products.splice(idx, 1, product)
        },
        removeProduct(state, { productId }) {
            state.products = state.products.filter(product => product._id !== productId)
        },
        addProductMsg(state, { productId, msg }) {
            const product = state.products.find(product => product._id === productId)
            if (!product.msgs) product.msgs = []
            product.msgs.push(msg)
        },
    },
    actions: {
        async addProduct(context, { product }) {
            try {
                 product = await productService.save(product)
                context.commit(getActionAddProduct(product))
                return product
            }
            catch (err) {
                console.log('productStore: Error in addProduct', err)
                throw err
            }
        },
        async updateProduct(context, { product }) {
            try {
                product = await productService.save(product)
                context.commit(getActionUpdateProduct(product))
                return product
            } catch (err) {
                console.log('productStore: Error in updateProduct', err)
                throw err
            }
        },
        async loadProducts(context) {
            try {
                // console.log('context:', context.state.filterBy)
                const { filterBy } = context.state
                const products = await productService.query(filterBy)
                context.commit({ type: 'setProducts', products })
            }
            catch (err) {
                console.log('productStore: Error in loadProducts', err)
                throw err
            }
        },
        async removeProduct(context, { productId }) {
            try {
                await productService.remove(productId)
                context.commit(getActionRemoveProduct(productId))
            } catch (err) {
                console.log('productStore: Error in removeProduct', err)
                throw err
            }
        },
        async addProductMsg(context, { productId, txt }) {
            try {
                const msg = await productService.addProductMsg(productId, txt)
                context.commit({ type: 'addProductMsg', productId, msg })
            } catch (err) {
                console.log('productStore: Error in addProductMsg', err)
                throw err
            }
        },
        async setFilterBy(context, { vendor, minPrice, maxPrice, productType, valueOption ,byFavorite}) {
            try {
                // const msg = await productService.addProductMsg(productId, txt)
                context.commit({ type: 'setFilterBy', vendor, minPrice, maxPrice, productType, valueOption ,byFavorite})
            }
            catch (err) {
                console.log('productStore: Error in setFilterBy', err)
                throw err
            }
        },

    }
}