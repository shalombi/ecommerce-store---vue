<template>
    <div dir="rtl" class="px-4 sm:px-6 lg:px-8 mr-15 w-full">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Users</h1>
                <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title,
                    email and role.</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button type="button"
                    class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
                    user</button>

                <pre>{{ products }}</pre>
            </div>
        </div>
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col"
                                    class="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-0">שם</th>

                                <th scope="col" class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">פרטי
                                    המוצר</th>
                                <th scope="col" class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">סטטוס
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">מלאי</th>

                                <th scope="col" class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">עריכה
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">מחיקה
                                </th>

                                <!-- <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span class="sr-only">Edit</span>
                                </th> -->
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="product in products" :key="product._id">
                                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                    <div class="flex items-center">
                                        <div class="h-11 w-11 flex-shrink-0">
                                            <img class="h-11 w-11 rounded-full" :src="product.imageSrc" alt="" />
                                        </div>
                                        <div class="ml-4">
                                            <div class="font-medium text-gray-900">{{ product.vendor }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <div class="mt-1 text-gray-900">מחיר : {{ product.price }} </div>
                                </td>
                                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <span
                                        class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Active</span>
                                </td>
                                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <div class="mt-1 text-gray-900"> 10 </div>
                                </td>

                                <td
                                    class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <a href="#" class="text-indigo-600 hover:text-indigo-900">עריכה</a>
                                </td>

                                <td
                                    class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <span @click="removeProduct(product._id)" class="text-indigo-600 hover:text-indigo-900">מחיקה</span>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script >
import { getActionRemoveProduct, getActionUpdateProduct, getActionAddProductMsg } from '../../store/product.store'

const people = [
    {
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        department: 'Optimization',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
]
export default {
    data() {
        return {
        }
    },
    created() {
        this.$store.dispatch({ type: 'loadProducts' })
    },
    computed: {
        products() {
            return this.$store.getters.products
        }
    },
    methods: {
        async removeProduct(productId) {
            try {
                await this.$store.dispatch(getActionRemoveProduct(productId))
                showSuccessMsg('Product removed')

            } catch (err) {
                console.log(err)
                showErrorMsg('Cannot remove product')
            }
        },
    }
}
</script>