
            
<template>
    <section class="product-edit">
        <h1>Product edit</h1>

        <form @submit.prevent="addProduct()" v-if="productToEdit?.vendor">
            <h2>Add product</h2>
            <input type="text" v-model="productToEdit.vendor" />
            <button>Save</button>
        </form>


        <button type="button">
            <router-link
                class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                to="/admin/product">Back..
            </router-link>
        </button>

    </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { productService } from '../../services/product.service.local'
export default {
    name: 'product-edit',

    data() {
        return {
            productToEdit: null
        }
    },
    computed: {
    },
    created() {
        const id = this.$route.params.id
        console.log(id)
        if (id) {
            productService.getById(id)
                .then(p => {
                    this.productToEdit = p
                    console.log(this.productToEdit)
                })
        }
        else {
            this.productToEdit = productService.getEmptyProduct()
        }
    },
    methods: {

        async addProduct() {
            try {
                await this.$store.dispatch({ type: 'addProduct', product: this.productToEdit })
                showSuccessMsg('Product added')
                this.productToEdit = productService.getEmptyProduct()
                this.$router.push('/admin/product')

            } catch (err) {
                console.log(err)
                showErrorMsg('Cannot add product')
            }
        },
    }

}
</script>
