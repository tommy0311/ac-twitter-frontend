<template>
  <div class="d-flex justify-content-center"> 
    <AdminNav
      :initial-users-list="isUsersList"
    />
    <div class="admin-main-wrapper ml-6">
      <NavpillHeaderMain
        :initial-admin-users="isAdminUsers"
      />
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
      isUsersList: true,
      isAdminUsers: true,
    };
  },
}
</script>