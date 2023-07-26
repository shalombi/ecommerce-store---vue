import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { productStore } from './product.store.js'
import { reviewStore } from './review.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    productStore,
    reviewStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
