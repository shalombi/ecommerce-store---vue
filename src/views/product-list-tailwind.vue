

<template>
    <!-- {{ 'dcdc' }} -->
    <!-- {{ products }} -->
    <div class="bg-white z-0">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">Products</h2>
  
        <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          <div v-for="product in products" :key="product._id" class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
              <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-cover object-center sm:h-full sm:w-full" />
            </div>
            <div class="flex flex-1 flex-col space-y-2 p-4">
              <h3 class="text-sm font-medium text-gray-900">
                <a :href="product.href">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ product.name }}
                </a>
              </h3>
              <p class="text-sm text-gray-500">{{ product.description }}</p>
              <div class="flex flex-1 flex-col justify-end">
                <p class="text-sm italic text-gray-500">{{ product.options }}</p>
                <p class="text-base font-medium text-gray-900">{{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script >

export default {
    props: {
        products: {
            type: Array,
            required: true,
        },
    },
}


</script>