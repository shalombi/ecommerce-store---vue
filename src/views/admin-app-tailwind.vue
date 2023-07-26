<template>
    <sidebar-admin-tailwind />
    <router-view/>
</template>
  
<script>
import SidebarAdminTailwind from '../cmps/admin-app/sidebar-admin-tailwind.vue';

export default {
    data() {
        return {
        }
    },
    components: {
        SidebarAdminTailwind
    }

}
</script>