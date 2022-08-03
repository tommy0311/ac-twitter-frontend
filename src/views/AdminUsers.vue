<template>
  <div class="d-flex justify-content-center"> 
    <AdminNav />
    <div class="admin-main-wrapper ml-6">
      <NavpillHeaderMain />
      <AdminUserCard />
    </div>
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav.vue';
import NavpillHeaderMain from '../components/NavpillHeaderMain.vue';
import AdminUserCard from '../components/AdminUserCard.vue';

export default {
  name: 'AdminUsers',
  components: {
    AdminNav,
    NavpillHeaderMain,
    AdminUserCard,
  },
  data() {
    return {
      
    };
  },
}
</script>