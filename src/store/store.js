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

store.subscribe(function(cmd, state) {
  console.log('**** Store state changed: ****')
  console.log('Command:', cmd.payload)
  console.log('storeState:\n',  state)
  console.log('*******************************')
})
