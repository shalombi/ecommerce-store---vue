<template>
  <section>
    <user-msg />

    <app-header-tailwind />
    <!-- </section>> -->
    <!-- <app-header /> -->
    <router-view />
    <app-footer-tailwind />
  </section>
</template>

<script>

import { store } from './store/store'
// import appHeader from './cmps/app-header.vue'
import userMsg from './cmps/user-msg.vue'
import { userService } from './services/user.service'
import AppHeaderTailwind from './cmps/app-header-tailwind.vue'
import AppFooterTailwind from './cmps/app-footer-tailwind.vue'

export default {

  created() {
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  components: {
    userMsg,
    AppHeaderTailwind,
    AppFooterTailwind
  },
}
</script>