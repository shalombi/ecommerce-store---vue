<template>
  <div class="container home">
    <product-list-tailwind :products="products" />
    <!-- todo : admin page to add product -->
    <!-- <hr />
    <form @submit.prevent="addProduct()">
      <h2>Add product</h2>
      <input type="text" v-model="productToAdd.vendor" />
      <button>Save</button>
    </form> -->
  </div>
</template>

<script>

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { productService } from '../services/product.service.local'
import { getActionRemoveProduct, getActionUpdateProduct, getActionAddProductMsg } from '../store/product.store'

import ProductListTailwind from './product-list-tailwind.vue'
export default {
  data() {

    return {
      productToAdd: productService.getEmptyProduct()
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    products() {
      return this.$store.getters.products
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadProducts' })
  },
  methods: {
    async addProduct() {
      try {
        await this.$store.dispatch({ type: 'addProduct', product: this.productToAdd })
        showSuccessMsg('Product added')
        this.productToAdd = productService.getEmptyProduct()
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add product')
      }
    },
    async removeProduct(productId) {
      try {
        await this.$store.dispatch(getActionRemoveProduct(productId))
        showSuccessMsg('Product removed')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove product')
      }
    },
    async updateProduct(product) {
      try {
        product = { ...product }
        product.price = +prompt('New price?', product.price)
        await this.$store.dispatch(getActionUpdateProduct(product))
        showSuccessMsg('Product updated')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update product')
      }
    },
    async addProductMsg(productId) {
      try {
        await this.$store.dispatch(getActionAddProductMsg(productId))
        showSuccessMsg('Product msg added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add product msg')
      }
    },
    printProductToConsole(product) {
      console.log('Product msgs:', product.msgs)
    }
  },
  components: {
    ProductListTailwind
  }


}
</script>
