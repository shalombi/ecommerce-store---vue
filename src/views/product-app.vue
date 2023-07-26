<template>
  <div class="container home">
    <product-list-tailwind :products="products" />

  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { productService } from '../services/product.service.local'
import {getActionAddProductMsg } from '../store/product.store'

import ProductListTailwind from './product-list-tailwind.vue'
export default {
  data() {

    return {
      // productToAdd: productService.getEmptyProduct()
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
