<!-- <router-link to="/">
  <span role="img" aria-label="logo">🙏</span>
</router-link>
<router-link to="/product">Products</router-link> -->
<template>
  <div class="bg-white">
    <header class="relative bg-white">
      <nav aria-label="Top" class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="border-b border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0">
          <div class="flex h-16 items-center justify-between">
            <!-- Logo -->
            <div class="flex flex-1">
              <router-link to='/'>
                <span class="sr-only">Your Company</span>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
              </router-link>
            </div>

            <!-- Flyout menus -->
            <PopoverGroup class="absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch">
              <div
                class="flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0">
                <Popover v-for="(category, categoryIdx) in navigation.categories" :key="categoryIdx" class="flex"
                  v-slot="{ open }">
                  <div class="relative flex">
                    <PopoverButton
                      :class="[open ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:text-gray-800', 'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out']">
                      {{ category.name }}</PopoverButton>
                  </div>

                  <transition enter-active-class="transition ease-out duration-200  z-10" enter-from-class="opacity-0"
                    enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <PopoverPanel class="absolute inset-x-0 top-full text-gray-500 sm:text-sm">
                      <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                      <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                      <div class="relative bg-white z-10">
                        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                          <div
                            class="grid grid-cols-1 items-start gap-x-6 gap-y-10 pb-12 pt-10 md:grid-cols-2 lg:gap-x-8">
                            <div class="grid grid-cols-1 gap-x-6 gap-y-10 lg:gap-x-8">
                              <div>
                                <p id="clothing-heading" class="font-medium text-gray-900">Clothing</p>
                                <div class="mt-4 border-t border-gray-200 pt-6 sm:grid sm:grid-cols-2 sm:gap-x-6">
                                  <ul role="list" aria-labelledby="clothing-heading" class="space-y-6 sm:space-y-4">
                                    <li v-for="item in category.clothing[0]" :key="item.name" class="flex">
                                      <a :href="item.href" class="hover:text-gray-800">{{ item.name }}</a>
                                    </li>
                                  </ul>
                                  <ul role="list" aria-label="More clothing" class="mt-6 space-y-6 sm:mt-0 sm:space-y-4">
                                    <li v-for="item in category.clothing[1]" :key="item.name" class="flex">
                                      <a :href="item.href" class="hover:text-gray-800">{{ item.name }}</a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:gap-x-8">
                              <div>
                                <p id="accessories-heading" class="font-medium text-gray-900">Accessories</p>
                                <ul role="list" aria-labelledby="accessories-heading"
                                  class="mt-4 space-y-6 border-t border-gray-200 pt-6 sm:space-y-4">
                                  <li v-for="item in category.accessories" :key="item.name" class="flex">
                                    <a :href="item.href" class="hover:text-gray-800">{{ item.name }}</a>
                                  </li>
                                </ul>
                              </div>
                              <div>
                                <p id="categories-heading" class="font-medium text-gray-900">Categories</p>
                                <ul role="list" aria-labelledby="categories-heading"
                                  class="mt-4 space-y-6 border-t border-gray-200 pt-6 sm:space-y-4">
                                  <li v-for="item in category.categories" :key="item.name" class="flex">
                                    <a :href="item.href" class="hover:text-gray-800">{{ item.name }}</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>

                <router-link v-for="item in navigation.other" :key="item.name" :to="item.href"
                  class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ item.name
                  }}</router-link>
              </div>
            </PopoverGroup>

            <div class="flex flex-1 items-center justify-end">
              <!-- Search -->
              <router-link to="/admin" class="p-2 text-gray-400 hover:text-gray-500">
                <!-- <span class="sr-only">Search</span> -->
                <!-- <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" /> -->
                <span
                  class="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100 border border-solid border-gray-200">
                  <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>


              </router-link>


              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-8">
                <a href="#" class="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true" />
                  <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                  <span class="sr-only">items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <promo-section-shop/>
  </div>
</template>

<script setup>
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'
import PromoSectionShop from './promo-section-shop.vue';
//<promo-section-shop/>
const navigation = {
  categories: [
    {
      name: 'Women',
      clothing: [
        [
          { name: 'Tops', href: '#' },
          { name: 'Dresses', href: '#' },
          { name: 'Pants', href: '#' },
          { name: 'Denim', href: '#' },
          { name: 'Sweaters', href: '#' },
          { name: 'T-Shirts', href: '#' },
        ],
        [
          { name: 'Jackets', href: '#' },
          { name: 'Activewear', href: '#' },
          { name: 'Shorts', href: '#' },
          { name: 'Swimwear', href: '#' },
          { name: 'Browse All', href: '#' },
        ],
      ],
      accessories: [
        { name: 'Shoes', href: '#' },
        { name: 'Jewelry', href: '#' },
        { name: 'Handbags', href: '#' },
        { name: 'Socks', href: '#' },
        { name: 'Hats', href: '#' },
        { name: 'Browse All', href: '#' },
      ],
      categories: [
        { name: 'New Arrivals', href: '#' },
        { name: 'Sale', href: '#' },
        { name: 'Basic Tees', href: '#' },
        { name: 'Artwork Tees', href: '#' },
      ],
    },
    {
      name: 'Men',
      clothing: [
        [
          { name: 'Dress Shirts', href: '#' },
          { name: 'Pants', href: '#' },
          { name: 'Jackets', href: '#' },
          { name: 'T-Shirts', href: '#' },
          { name: 'Jeans', href: '#' },
          { name: 'Hoodies', href: '#' },
        ],
        [
          { name: 'Vests', href: '#' },
          { name: 'Kilts', href: '#' },
          { name: 'Outdoors', href: '#' },
          { name: 'Capes', href: '#' },
          { name: 'Browse All', href: '#' },
        ],
      ],
      accessories: [
        { name: 'Watches', href: '#' },
        { name: 'Boots', href: '#' },
        { name: 'Fanny Packs', href: '#' },
        { name: 'Sunglasses', href: '#' },
        { name: 'Browse All', href: '#' },
      ],
      categories: [
        { name: 'Just Added', href: '#' },
        { name: 'Clearance', href: '#' },
        { name: 'Graphic Tees', href: '#' },
      ],
    },
  ],
  other: [
    { name: 'Products', href: '/product' },
    { name: 'Login', href: '/login' },
    // { name: 'Stores', href: '#' },
  ],
}

</script>
<script>
export default {
  components: {
    PromoSectionShop
  }
}
</script>
<!-- <router-link to="/login">Login / Signup</router-link> -->
<!--  -->

<!-- <router-link to="/product">Products</router-link> -->