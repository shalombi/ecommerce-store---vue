<template>
  <div class="container home">
    <product-filter :products="products" />
  </div>
</template>

<script>
// <product-list-tailwind :products="products" />

import productFilter from '../cmps/product-filter.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { productService } from '../services/product.service.local'
import { getActionAddProductMsg } from '../store/product.store'


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
    // ProductListTailwind,
    productFilter
  }


}
</script>
