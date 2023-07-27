import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
import chat from './views/chat.vue'
import productApp from './views/product-app.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import productDetails from './views/product-details.vue'
// import adminAppTailwind from './views/admin-app-tailwind.vue'
import productListTailwind from './cmps/admin-app/product-list-tailwind.vue'
import adminAppTailwind from './views/admin-app-tailwind.vue'
import productEdit from './views/admin/product-edit.vue'


// product-list-tailwind
const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/product',
    name: 'product-app',
    component: productApp
  },
  {
    path: '/review',
    name: 'review',
    component: reviewApp
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  },
  {
    path: '/product/:id',
    name: 'product-details',
    component: productDetails
  },

  // {
  //   path: '/admin',
  //   name: 'admin-app',
  //   component: adminAppTailwind
  // },

  {
    path: '/admin',
    component: adminAppTailwind,
    name: 'admin-app',
    children: [
      // { path: '', component: adminAppTailwind }, // ניתן להכניס את About כאן גם, אם רוצים שהוא יופיע כברירת מחדל
      { path: 'product', component: productListTailwind },
      { path: 'product/edit/:id', component: productEdit },
      { path: 'product/edit', component: productEdit },
      { path: '2', component: chat }
    ]
  },


]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

